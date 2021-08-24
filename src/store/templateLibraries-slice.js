import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Pola",
    columns: [
      {
        name: "Nazwa",
        type: "string",
        order: 1,
        description: "Some text",
        defaultValue: "",
        usage: "title",
      },
      {
        name: "Obszar",
        type: "float",
        order: 2,
        description: "Some text",
        defaultValue: "",
        usage: "description",
      },
    ],
  },
  {
    id: 2,
    name: "Uprawy",
    columns: [
      {
        name: "Nazwa",
        type: "string",
        order: 1,
        description: "Some text",
        defaultValue: "",
        usage: "title",
      },
      {
        name: "Opis",
        type: "float",
        order: 2,
        description: "Some text",
        defaultValue: "",
        usage: "",
      },
    ],
  },
];

export const librariesTemplate = createSlice({
  name: "librariesTemplate",
  initialState,
  reducers: {
    updateAllLibraries(state, action) {
      state.librariesTemplate = action.payload.librariesTemplate;
    },
  },
});

export default librariesTemplate.reducer;

export const selectLibraryById = (state, id) =>
  state.librariesTemplate?.find((lib) => lib.id === id);
