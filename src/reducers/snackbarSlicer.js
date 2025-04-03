import { createSlice } from '@reduxjs/toolkit';

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    snackbar: false,
  },
  reducers: {
    snackbarToggle: (state, { payload }) => {
      state.snackbar = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { snackbarToggle } = snackbarSlice.actions;

export default snackbarSlice.reducer;
