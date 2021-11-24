import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectLibraryById } from "../../store/templateLibraries-slice";
import {
  updateEntryValues,
  selectAllFields,
  clearState,
} from "../../store/editedEntry-slice";
import CFloat from "../fieldTypes/CFloat";
import CInt from "../fieldTypes/CInt";
import CString from "../fieldTypes/CString";
import CImage from "../fieldTypes/CImage";
import CDate from "../fieldTypes/CDate";
import CDateTime from "../fieldTypes/CDateTime";
import CBarcode from "../fieldTypes/CBarcode";
import CAudio from "../fieldTypes/CAudio";
import CCheckbox from "../fieldTypes/CCheckbox";
import CDropDownList from "../fieldTypes/CDropDownList";
import LinkToEntry from "../fieldTypes/LinkToEntry";
import EntryViewHeader from "./EntryViewHeader";
import { useLocation } from "react-router-dom";
import EntryEditHeader from "./EntryEditHeader";
import { useDispatch } from "react-redux";
import {
  getRowDataById,
  updateLibraryRecord,
  addNewLibraryRecord,
} from "../../store/librariesData-slice";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import {
  UPDATE_LIBRARY_ROWS_PG,
  ADD_LIBRARY_ROWS_PG,
} from "../../API/graphQLTypes";
import CScript from "../fieldTypes/CScript";
import { selectConfiguration } from "../../store/configuration-slice";
import { Alert, Divider, Grid, Snackbar } from "@mui/material";

const setComponentByType = (column, field, mode, options) => {
  switch (column.type) {
    case "string":
      return <CString mode={mode} field={field}></CString>;
    case "float":
      return <CFloat mode={mode} field={field}></CFloat>;
    case "int":
      return <CInt mode={mode} field={field}></CInt>;
    case "image":
      return <CImage value={field.value} mode={mode} field={field}></CImage>;
    case "date":
      return <CDate mode={mode} field={field}></CDate>;
    case "dateTime":
      return <CDateTime mode={mode} field={field}></CDateTime>;
    case "barcode":
      return (
        <CBarcode value={field.value} mode={mode} field={field}></CBarcode>
      );
    case "audio":
      return <CAudio value={field.value} mode={mode} field={field}></CAudio>;
    case "checkbox":
      return <CCheckbox mode={mode} field={field}></CCheckbox>;
    case "dropDownList":
      return (
        <CDropDownList
          mode={mode}
          field={field}
          options={options}
        ></CDropDownList>
      );
    case "libEntry":
      // console.log("insetComponentByType - column: ", column);
      return (
        <LinkToEntry
          mode={mode}
          field={field}
          columnTemplate={column}
        ></LinkToEntry>
      );
    case "script":
      return (
        <CScript mode={mode} field={field} columnTemplate={column}></CScript>
      );
    default:
      return <div>----</div>;
  }
};

const SingleEntryPage = () => {
  const location = useLocation();
  let libUUID = location.state?.libUUID;
  let rowUUID = location.state?.rowUUID;
  if (!libUUID) {
    const entryViewConfigJson = localStorage.getItem("entryViewConfig");
    libUUID = JSON.parse(entryViewConfigJson).libUUID;
    rowUUID = JSON.parse(entryViewConfigJson).rowUUID;
  }
  const dispatch = useDispatch();
  const storageType = useSelector((state) =>
    selectConfiguration(state)
  )?.storageType;
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  // const librariesData = useSelector((state) => selectAllDataLibrary(state));
  const [updateEntryInPG] = useMutation(UPDATE_LIBRARY_ROWS_PG);
  const [addEntryInPG] = useMutation(ADD_LIBRARY_ROWS_PG);

  const [mode, setMode] = useState(
    location?.state?.mode === "addNewEntry" ? "addNewEntry" : "view"
  );
  const { columns: columnsTemplates, sqlTableName } =
    useSelector((state) => selectLibraryById(state, libUUID)) || {};
  const row = useSelector((state) =>
    getRowDataById(state, { rowUUID, libUUID })
  );

  const entry = { title: row?.fe_title, libUUID, rowUUID, mode };

  const fieldsInit = columnsTemplates?.map((columnTemplate) => {
    let options = [];
    let fieldValue = row ? row[columnTemplate.sqlFieldName] : null;
    if (columnTemplate?.type === "libEntry") {
      options = columnTemplate?.options[0]?.dictionaryLibraryName;
      fieldValue = row ? fieldValue : {};
    } else if (columnTemplate?.type === "dropDownList")
      options = columnTemplate?.options;
    return {
      type: columnTemplate?.type,
      name: columnTemplate?.name,
      order: columnTemplate?.order,
      columnTemplate: columnTemplate,
      options,
      field: {
        value: fieldValue,
        columnUUID: columnTemplate?.columnUUID,
        columnName: columnTemplate?.name,
        entryLinks: row ? row[columnTemplate.sqlFieldName]?.entrylinks : [],
      },
    };
  });
  useEffect(() => {
    // console.log("before updateEntryValues in Init");
    dispatch(updateEntryValues(fieldsInit));
    return () => {
      console.log("clear state after dismount component");
      dispatch(clearState());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // if (mode === "edit") {
    // console.log("before updateEntryValues");

    localStorage.setItem(
      "entryViewConfig",
      JSON.stringify({ rowUUID, libUUID, mode })
    );
    dispatch(updateEntryValues(fieldsInit));
    // }
    // eslint-disable-next-line
  }, [rowUUID, libUUID, columnsTemplates]);

  const cancelHandler = () => {
    // console.log("fieldsInit", fieldsInit);
    dispatch(updateEntryValues(fieldsInit));
  };
  const saveHandler = () => {
    console.log("clicked save button");
    const savedRowUUID = mode === "addNewEntry" ? uuidv4() : rowUUID;
    const editedEntry = {
      editedFields: fields,
      libUUID,
      rowUUID: savedRowUUID,
    };

    if (mode === "addNewEntry") {
      console.log("addNewEntryToDB");
      sendInsertedDataToDatabase(fields, savedRowUUID);
      dispatch(addNewLibraryRecord(editedEntry));
    } else {
      console.log("updateEntryInDB");
      sendUpdatedDataToDatabase(fields);
      dispatch(updateLibraryRecord(editedEntry));
    }
  };

  const prepareDataForSendToPG = (updatedEntry, savedRowUUID) => {
    console.log("updated/inserted Entry: ", savedRowUUID, updatedEntry);
    const getValue = (field) => {
      if (!field?.hasOwnProperty("value")) return null;
      if (field?.value?.hasOwnProperty("value")) return field?.value?.value;
      return field?.value;
    };
    const columns = updatedEntry.map((col) => {
      const entryLinks = col.field?.entryLinks?.map((link) => {
        return {
          columnParentName: link.columnParentName
            ? link.columnParentName
            : col.columnTemplate.sqlFieldName,
          libUUID: link.libUUID,
          rowUUID: link.rowUUID,
          tableName: link.tableName,
          uuid: col.field.value.value,
          tableParentName: sqlTableName,
          rowParentUUID: savedRowUUID ? savedRowUUID : rowUUID,
        };
      });
      return {
        sqlFieldName: col?.columnTemplate?.sqlFieldName,
        value: getValue(col?.field),
        type: col?.columnTemplate?.type,
        entryLinks,
      };
    });
    // console.log("columns in mutation", columns);
    const rows = [
      {
        rowUUID: savedRowUUID ? savedRowUUID : rowUUID,
        rowJSON: JSON.stringify(columns),
      },
    ];

    const libData = { sqlTableName: sqlTableName, libUUID, rows };

    return libData;
  };

  const sendInsertedDataToDatabase = (updatedEntry, savedRowUUID) => {
    try {
      const libData = prepareDataForSendToPG(updatedEntry, savedRowUUID);
      console.log("libData if Mutation addEntryInPG", libData);
      if (storageType === "outerDatabase")
        addEntryInPG({ variables: { libraryData: libData } });
    } catch (error) {
      console.log("error occurred while adding entry to db: " + error);
    }
  };

  const sendUpdatedDataToDatabase = (insertedEntry) => {
    try {
      const libData = prepareDataForSendToPG(insertedEntry);
      console.log("libData if Mutation update", libData);

      if (storageType === "outerDatabase")
        updateEntryInPG({ variables: { libraryData: libData } });
    } catch (error) {
      console.log("error occurred while updating entry: " + error);
    }
  };

  console.log("before selectAllFields");
  const fields = useSelector((state) => selectAllFields(state));

  console.log("fields", fields);
  console.log("mode", mode);

  const snackbarCloseHandle = (event, reason) => {
    if (reason === "clickaway") return;
    setIsSnackbarOpen(false);
  };

  // useEffect(() => {}, [fields]);
  const isEditMode = mode === "edit" || mode === "addNewEntry" ? true : false;
  return (
    <Fragment>
      {mode === "view" && <EntryViewHeader entry={entry} setMode={setMode} />}
      {isEditMode && (
        <EntryEditHeader
          entry={entry}
          setMode={setMode}
          actionButtonHandler={{
            cancelHandler,
            saveHandler,
            setIsSnackbarOpen,
          }}
        />
      )}
      <Grid container spacing={1}>
        {fields?.map((field) => {
          return (
            <Grid item xs={12} sx={{ m: 1 }} key={field?.field?.columnUUID}>
              {setComponentByType(
                field.columnTemplate,
                field.field,
                mode,
                field.options
              )}
              <Divider />
            </Grid>
          );
        })}
      </Grid>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={5000}
        onClose={snackbarCloseHandle}
      >
        <Alert
          onClose={snackbarCloseHandle}
          severity="success"
          sx={{ width: "100%" }}
        >
          Entry saved successfully!
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default SingleEntryPage;
