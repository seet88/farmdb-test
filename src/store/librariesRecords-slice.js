import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    libId: 1,
    libName: "Pola",
    sheetKey: "032nvkdsnakj",
    rowId: 1629761892,
    columnId: 3232,
    columnName: "Nazwa",
    value: "Gorka",
  },
  {
    libId: 1,
    libName: "Pola",
    sheetKey: "032nvkdsnakj",
    rowId: 1629761892,
    columnId: 3233,
    columnName: "Obszar",
    value: "2,4",
  },
  {
    libId: 1,
    libName: "Pola",
    sheetKey: "032nvkdsnakj",
    rowId: 1629761893,
    columnId: 3232,
    columnName: "Nazwa",
    value: "Pecakowo",
  },
  {
    libId: 1,
    libName: "Pola",
    sheetKey: "032nvkdsnakj",
    rowId: 1629761893,
    columnId: 3233,
    columnName: "Obszar",
    value: "6,8",
  },
  {
    libId: 2,
    libName: "Uprawy",
    sheetKey: "dsfds2fd",
    rowId: 1629761211,
    columnId: 3111,
    columnName: "Nazwa",
    value: "QQ",
  },
];

export const librariesRecords = createSlice({
  name: "librariesRecords",
  initialState,
  reducers: {},
});

export default librariesRecords.reducer;

export const selectRowById = (state, rowId) =>
  state.librariesRecords?.filter((row) => row.rowId === rowId);
