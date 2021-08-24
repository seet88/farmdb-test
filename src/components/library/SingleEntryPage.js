import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectRowById } from "../../store/librariesRecords-slice";
import { selectLibraryById } from "../../store/templateLibraries-slice";
import CFloat from "../fieldTypes/CFloat";
import CString from "../fieldTypes/CString";
import EntryHeader from "./EntryHeader";
import classes from "./SingleEntryPage.module.css";

const setComponentByType = (type, value) => {
  switch (type) {
    case "string":
      return <CString value={value}></CString>;
    case "float":
      return <CFloat value={value}></CFloat>;
    default:
      return <div>----</div>;
  }
};

const getValueForColumn = (row, columnName) =>
  row?.find((row) => row.columnName === columnName)?.value;

const setField = (row, column) => {
  const value = getValueForColumn(row, column.name);
  return setComponentByType(column.type, value);
};

const SingleEntryPage = ({ match }) => {
  const { libraryId, entryId } = match.params;

  const { columns } = useSelector((state) =>
    selectLibraryById(state, Number(libraryId))
  );
  const row = useSelector((state) => selectRowById(state, Number(entryId)));
  const entry = {};
  return (
    <Fragment>
      <EntryHeader entry={entry} />
      <ul className={classes.list}>
        {columns.map((column) => {
          return (
            <li key={column.order} className={classes.field}>
              <p className={classes.columnName}>{column.name}</p>
              {setField(row, column)}
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default SingleEntryPage;
