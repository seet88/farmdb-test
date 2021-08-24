import { configureStore } from "@reduxjs/toolkit";
import librariesRecords from "./librariesRecords-slice";
import librariesTemplate from "./templateLibraries-slice";

export default configureStore({
  reducer: {
    librariesTemplate,
    librariesRecords,
  },
});
