import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const librariesTemplateSlice = createSlice({
  name: "librariesTemplate",
  initialState,
  reducers: {
    updateAllLibraries(state, action) {
      action.payload?.map((lib) => state.push(lib));
    },
    addNewLibraryTemplate(state, action) {
      const libUUID = action.payload.libUUID;

      let templateLibIdx = state.findIndex((lib) => lib.libUUID === libUUID);
      if (templateLibIdx >= 0) {
        state[templateLibIdx] = action.payload;
      } else {
        state.push(action.payload);
      }
    },
    deleteLibraryTemplate(state, action) {
      const { libUUID } = action.payload;
      let libIndex = state.findIndex((lib) => lib.libUUID === libUUID);
      state.splice(libIndex, 1);
    },
  },
});

export const {
  updateAllLibraries,
  addNewLibraryTemplate,
  deleteLibraryTemplate,
} = librariesTemplateSlice.actions;

export default librariesTemplateSlice.reducer;

export const selectAllLibraries = (state) => state.librariesTemplate;
export const selectLibraryById = (state, uuid) =>
  state.librariesTemplate?.find((lib) => lib.libUUID === uuid);
export const selectLibrariesInfo = (state) => {
  return state.librariesTemplate.map((lib) => {
    return {
      libUUID: lib.libUUID,
      name: lib.name,
      sqlTableName: lib.sqlTableName,
    };
  });
};
