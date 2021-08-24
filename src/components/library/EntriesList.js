import React, { Fragment } from "react";
import ShortEntryView from "./ShortEntryView";
import classes from "./EntriesList.module.css";
import { useSelector } from "react-redux";
import { selectRowsByLibraryId } from "../../store/librariesRecords-slice";
import { selectLibraryById } from "../../store/templateLibraries-slice";
import LibraryHeader from "./LibraryHeader";

const EntriesList = ({ match }) => {
  const { libraryId } = match.params;

  const setEntries = (rows, titleColumn, descriptionColumn) => {
    const entries = [];
    let prevRowId = 0;
    let titleValue = "";
    let descriptionValue = "";
    let firstColumnInNewRow = true;
    let init = true;
    let libraryId = 0;
    rows.sort().forEach((row) => {
      if (row.rowId !== prevRowId && !init) {
        entries.push({
          title: titleValue,
          description: descriptionValue,
          id: prevRowId,
          libraryId: row.libId,
        });
        titleValue = "";
        descriptionValue = "";
        firstColumnInNewRow = true;
        libraryId = row.libId;
      }

      if (row.rowId === prevRowId || firstColumnInNewRow) {
        if (row.columnName === titleColumn) titleValue = row.value;
        if (row.columnName === descriptionColumn) descriptionValue = row.value;
        firstColumnInNewRow = false;
      } else {
        firstColumnInNewRow = true;
      }

      prevRowId = row.rowId;
      init = false;
    });

    entries.push({
      title: titleValue,
      description: descriptionValue,
      id: prevRowId,
      libraryId,
    });
    return entries;
  };

  const rows = useSelector((state) =>
    selectRowsByLibraryId(state, Number(libraryId))
  );
  const { columns } = useSelector((state) =>
    selectLibraryById(state, Number(libraryId))
  );

  const titleColumn = columns.find((column) => column.usage === "title")?.name;
  const descriptionColumn = columns.find(
    (column) => column.usage === "description"
  )?.name;

  const libraryTemplate = useSelector((state) =>
    state.librariesTemplate?.find((lib) => lib.id === Number(libraryId))
  );
  const library = {
    name: libraryTemplate?.name,
  };
  const entriesList = setEntries(rows, titleColumn, descriptionColumn);

  return (
    <Fragment>
      <LibraryHeader library={library} />
      <ul className={classes.list}>
        {entriesList.map((entry) => (
          <li key={entry.id} className={classes.entry}>
            <ShortEntryView entry={entry} />
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default EntriesList;
