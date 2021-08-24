import React from "react";
import { useSelector } from "react-redux";
import { selectRowById } from "../../store/librariesRecords-slice";
import { selectLibraryById } from "../../store/templateLibraries-slice";
import CFloat from "../fieldTypes/CFloat";
import CString from "../fieldTypes/CString";

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
  console.log("match: ", match);
  const { libraryId, entryId } = match.params;
  console.log("libraryId: ", libraryId);

  const { columns } = useSelector((state) =>
    selectLibraryById(state, Number(libraryId))
  );
  const row = useSelector((state) => selectRowById(state, Number(entryId)));
  console.log("row", row);
  const value = "frugo";
  console.log("columns: ", columns);

  return (
    <div>
      {columns.map((column) => {
        return (
          <div key={column.order}>
            <p>{column.name}</p>
            {setField(row, column)}
          </div>
        );
      })}
    </div>
  );
};

export default SingleEntryPage;
