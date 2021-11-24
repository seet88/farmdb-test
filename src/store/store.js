import { configureStore } from "@reduxjs/toolkit";
import editedEntrySlice from "./editedEntry-slice";
import librariesDataSlice from "./librariesData-slice";
import librariesRecordsSlice from "./librariesRecords-slice";
import librariesTemplateSlice from "./templateLibraries-slice";
import configurationSlice from "./configuration-slice";

const store = configureStore({
  reducer: {
    librariesTemplate: librariesTemplateSlice,
    librariesRecords: librariesRecordsSlice,
    editedEntry: editedEntrySlice,
    librariesData: librariesDataSlice,
    configuration: configurationSlice,
  },
});

export default store;
