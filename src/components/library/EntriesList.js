import React from "react";
import ShortEntryView from "./ShortEntryView";
// import classes from "./EntriesList.module.css";
import { useSelector } from "react-redux";
import { selectLibraryById } from "../../store/templateLibraries-slice";
import { addNewEntryLink } from "../../store/editedEntry-slice";
import LibraryHeader from "./LibraryHeader";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLibDataByLibraryId } from "../../store/librariesData-slice";
import { v4 as uuidv4 } from "uuid";
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import Header from "./Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EntriesList = ({
  libUUID,
  mode,
  parentColumnUUID,
  clickEntryLinkHandler,
}) => {
  const lacation = useLocation();
  if (mode !== "linking") libUUID = lacation?.state?.libUUID;
  console.log("libUUID", libUUID);
  const dispatch = useDispatch();
  // return <div>{state}</div>;
  /*
  const getColumnsValueByColumnName = (columns, descriptionColumn) => {
    let descriptionValue;

    columns.forEach((column) => {
      if (
        String(column.columnName).toUpperCase() ===
        String(descriptionColumn?.name).toUpperCase()
      )
        if (descriptionColumn.type === "libEntry") {
          descriptionValue = column?.entryLinks
            ?.map((link) => link.uniqueName)
            ?.join(", ");
        } else descriptionValue = column.value;
    });

    return { descriptionValue };
  };

  const calcEntries = (rows, descriptionColumn) => {
    const entries = [];

    rows.forEach((row) => {
      const { descriptionValue } = getColumnsValueByColumnName(
        row.columns,
        descriptionColumn
      );

      entries.push({
        title: row.uniqueName,
        description: descriptionValue,
        rowUUID: row.rowUUID,
        libUUID,
      });
    });

    return entries;
  };
*/
  const libData = useSelector((state) => getLibDataByLibraryId(state, libUUID));
  const library = {
    name: libData?.name,
  };
  /*
  const { columns } = useSelector((state) => selectLibraryById(state, libUUID));

  // const titleColumn = columns.find((column) => column.usage === "title")?.name;
  const descriptionColumn = columns.find(
    (column) => column.usage === "description"
  );

  const libraryTemplate = useSelector((state) =>
    state.librariesTemplate?.find((lib) => lib.libUUID === libUUID)
  );
  const library = {
    name: libraryTemplate?.name,
  };
  */
  /*
  let entriesList = calcEntries(rows, descriptionColumn);

  useEffect(() => {
    entriesList = calcEntries(rows, descriptionColumn);
  }, [rows, descriptionColumn]);
*/

  const libTemplate = useSelector((state) => selectLibraryById(state, libUUID));
  const clickBoxHandler = (entry) => {
    if (mode === "linking") {
      console.log("entry", entry);
      const columnParentName = libTemplate.columns.find(
        (col) => col.columnUUID === parentColumnUUID
      )?.sqlFieldName;
      const link = {
        ...entry,
        parentColumnUUID,
        newUUID: uuidv4(),
        libUUID,
        sqlTableName: libTemplate.sqlTableName,
        columnParentName,
      };
      dispatch(addNewEntryLink(link));
      clickEntryLinkHandler();
    }
  };
  const CustomBox = ({ entry, children, clickHandler }) => {
    return <div onClick={() => clickHandler(entry)}>{children}</div>;
  };
  console.log("libData", libData);

  return (
    <>
      {mode !== "linking" && <LibraryHeader library={library} mode={mode} />}
      {mode === "linking" && (
        <Header mode="empty">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="goBack"
            sx={{ mr: 2 }}
            onClick={clickEntryLinkHandler}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {library.name}
          </Typography>
        </Header>
      )}
      <List
        sx={{ width: "100%", bgcolor: "primary" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ backgroundColor: "primary.light" }}
          >
            Entries List Items:
          </ListSubheader>
        }
      >
        {!libData?.rows.length > 0 && (
          <ListItemButton>
            <ListItemText primary="No entry yet" />
          </ListItemButton>
        )}

        {libData?.rows.map((entry) => (
          <>
            <CustomBox
              key={entry.rowUUID}
              entry={entry}
              clickHandler={clickBoxHandler}
            >
              <ShortEntryView
                entry={entry}
                libUUID={libData.libUUID}
                mode={mode}
              />
            </CustomBox>
            <Divider />
          </>
        ))}
      </List>
    </>
  );
};

export default EntriesList;
