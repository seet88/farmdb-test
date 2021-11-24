import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const librariesDataSlice = createSlice({
  name: "librariesDataSlice",
  initialState,
  reducers: {
    updateAllLibrariesDataFromStorage(state, action) {
      action.payload?.forEach((lib) => {
        state.push(lib);
      });
    },
    updateAllLibrariesData(state, action) {
      action.payload?.forEach((lib) => {
        const rowsData = [];
        lib.rows.forEach((row) => {
          const columnsFromJSON = JSON.parse(row.rowJSON);
          rowsData.push({
            rowUUID: row.rowUUID,
            fe_title: row.fe_title,
            fe_description: row.fe_description,
            ...columnsFromJSON,
          });
        });

        const libTemp = {
          name: lib.name,
          libUUID: lib.libUUID,
          rows: rowsData,
        };

        state.push(libTemp);
      });
      // action.payload.map((lib) => state.push(lib));
    },
    addNewLibraryData(state, action) {
      const { libUUID, name } = action.payload;

      const lib = {
        name: name,
        libUUID: libUUID,
        rows: [],
      };
      state.push(lib);
    },
    updateLibraryRecord(state, action) {
      const { libUUID, rowUUID, editedFields } = action.payload;
      console.log("editedFields", editedFields);
      const libIndex = state.findIndex((lib) => lib.libUUID === libUUID);
      console.log("libIndex", libIndex);
      const rowIndex = state[libIndex].rows.findIndex(
        (row) => row.rowUUID === rowUUID
      );
      console.log("updateStart:", rowIndex);
      editedFields.forEach((col) => {
        const sqlFieldName = col.columnTemplate.sqlFieldName;
        if (sqlFieldName) {
          if (col.columnTemplate.type === "libEntry") {
            // console.log(
            //   "state[libIndex].rows[rowIndex][sqlFieldName]",
            //   state[libIndex].rows[rowIndex][sqlFieldName],
            //   sqlFieldName
            // );
            state[libIndex].rows[rowIndex][sqlFieldName].value =
              col.field?.value?.value;
            state[libIndex].rows[rowIndex][sqlFieldName].entrylinks =
              col.field?.entryLinks;
          } else state[libIndex].rows[rowIndex][sqlFieldName] = col.field.value;
        }
      });
      console.log("UpdateEnds:", state[libIndex].rows[rowIndex]);
    },
    addNewLibraryRecord(state, action) {
      const { libUUID, rowUUID, editedFields, name } = action.payload;
      console.log("editedFields", editedFields);
      let libIndex = state.findIndex((lib) => lib.libUUID === libUUID);
      if (libIndex < 0) {
        state.push({
          name: name,
          libUUID: libUUID,
          rows: [],
        });
        libIndex = state.findIndex((lib) => lib.libUUID === libUUID);
        console.log("No library found while adding new record");
      }

      console.log("libIndex", libIndex);
      const newRow = {};
      const titleColumnsValues = [];
      const descriptionColumnsValues = [];
      editedFields.forEach((col) => {
        const sqlFieldName = col.columnTemplate.sqlFieldName;
        if (sqlFieldName) {
          newRow[sqlFieldName] = {};

          if (col.columnTemplate.type === "libEntry") {
            newRow[sqlFieldName].value = col.field?.value?.value;
            newRow[sqlFieldName].entrylinks = col.field?.entryLinks;

            if (col.columnTemplate.usage === "title")
              col.field.entryLinks.forEach((link) =>
                titleColumnsValues.push(link.rowTitle)
              );
            if (col.columnTemplate.usage === "description")
              col.field.entryLinks.forEach((link) =>
                descriptionColumnsValues.push(link.rowTitle)
              );
          } else {
            newRow[sqlFieldName] = col.field.value;
            if (col.columnTemplate.usage === "title")
              titleColumnsValues.push(col.field.value);
            if (col.columnTemplate.usage === "description")
              descriptionColumnsValues.push(col.field.value);
          }
        }
      });
      newRow.rowUUID = rowUUID;
      newRow.fe_title = titleColumnsValues.join(" ");
      newRow.fe_description = descriptionColumnsValues.join(" ");
      state[libIndex].rows.push(newRow);
    },

    deleteLibraryData(state, action) {
      const { libUUID } = action.payload;
      let libIndex = state.findIndex((lib) => lib.libUUID === libUUID);
      if (libIndex > -1) state.splice(libIndex, 1);
    },

    deleteRowData(state, action) {
      const { libUUID, rowUUID } = action.payload;
      console.log("libUUID, rowUUID ", libUUID, rowUUID);
      let libIndex = state.findIndex((lib) => lib.libUUID === libUUID);
      if (libIndex > -1) {
        console.log("libIndex ", libIndex);
        let rowIndex = state[libIndex].rows.findIndex(
          (row) => row.rowUUID === rowUUID
        );
        if (rowIndex > -1) state[libIndex].rows.splice(rowIndex, 1);
      }
    },
  },
});

export const {
  updateAllLibrariesData,
  addNewLibraryData,
  updateLibraryRecord,
  addNewLibraryRecord,
  updateAllLibrariesDataFromStorage,
  deleteLibraryData,
  deleteRowData,
} = librariesDataSlice.actions;

export default librariesDataSlice.reducer;

export const selectAllDataLibrary = (state) => state?.librariesData;

export const getLibDataByLibraryId = (state, libUUID) => {
  return state.librariesData?.find((lib) => lib.libUUID === libUUID);
};

export const getRowDataById = (state, { rowUUID, libUUID }) => {
  if (!rowUUID || !libUUID) return null;
  return state.librariesData
    ?.find((lib) => lib.libUUID === libUUID)
    ?.rows.find((row) => row.rowUUID === rowUUID);
};

export const getRowsDataByIds = (state, { libUUID, listRowsUUID }) => {
  const lib = state.librariesData.find((lib) => lib.libUUID === libUUID);
  return lib?.rows.filter((row) => listRowsUUID.includes(row.rowUUID));
};
