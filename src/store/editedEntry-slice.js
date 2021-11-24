import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

export const editedEntrySlice = createSlice({
  name: "editedEntry",
  initialState,
  reducers: {
    clearState(state, action) {
      state.items = [];
    },

    updateFieldValue(state, action) {
      const { columnUUID, value: valueIn, type, checked } = action.payload;
      const fieldIndex = state.items.findIndex(
        (field) => field.field.columnUUID === columnUUID
      );
      let value = valueIn;
      // if (type === "date" || type === "datetime-local")
      //   // value = Date.parse(value);
      //   value = value;
      // else
      if (type === "checkbox") value = checked ? "1" : "0";
      if (fieldIndex >= 0) {
        state.items[fieldIndex].field.value = String(value);
      }
    },
    updateEntryValues(state, action) {
      state.items = action.payload;
    },
    addNewEntryLink(state, action) {
      const {
        parentColumnUUID,
        rowUUID,
        fe_title,
        newUUID,
        libUUID,
        sqlTableName,
        columnParentName,
      } = action.payload;
      const link = {
        rowUUID,
        columnUUID: parentColumnUUID,
        rowTitle: fe_title,
        libUUID,
        tableName: sqlTableName,
        columnParentName,
      };
      console.log("linkENtry: ", link, "newUUID:", newUUID);
      const fieldIndex = state.items.findIndex((field) => {
        return field.field.columnUUID === parentColumnUUID;
      });
      if (fieldIndex >= 0) {
        if (state.items[fieldIndex].field?.entryLinks?.length > 0) {
          console.log("fieldIndex", fieldIndex, "newUUID", newUUID);
          if (!state.items[fieldIndex]?.field?.value?.value)
            state.items[fieldIndex].field.value.value = newUUID;
          state.items[fieldIndex].field?.entryLinks?.push(link);
        } else {
          console.log("newUUID", newUUID);
          const entryLinks = [];
          entryLinks.push(link);
          // if (!state.items[fieldIndex]?.field?.value?.value)
          state.items[fieldIndex].field.value.value = newUUID;
          state.items[fieldIndex].field.entryLinks = entryLinks;
        }
      }
    },

    deleteEntryLink(state, action) {
      const { columnUUID, entryIndex } = action.payload;

      const fieldIndex = state.items.findIndex((field) => {
        return field.field.columnUUID === columnUUID;
      });
      if (fieldIndex >= 0 && entryIndex >= 0)
        state.items[fieldIndex].field?.entryLinks?.splice(entryIndex, 1);
    },
  },
});

export const {
  updateFieldValue,
  updateEntryValues,
  addNewEntryLink,
  deleteEntryLink,
  clearState,
} = editedEntrySlice.actions;

export default editedEntrySlice.reducer;

export const selectAllFields = (state) => state.editedEntry?.items;

export const selectFieldByName = (state, fieldName) =>
  state.editedEntry?.items.find(
    (field) => field.name.toLowerCase() === fieldName.toLowerCase()
  );
