import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conf: {
    storageType: "localStorage",
  },
};

export const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    updateConfiguration(state, action) {
      state.conf = action.payload;
    },
  },
});

export const { updateConfiguration } = configurationSlice.actions;

export default configurationSlice.reducer;

export const selectConfiguration = (state) => state.configuration.conf;
