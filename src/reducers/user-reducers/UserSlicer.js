import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
        user: {
            firstName: ""
        }
      },
      languages: [],
      currentLanguage: "",
      selectedPackage: null,
      packages:[]
  },
  reducers: {	
    getSession: (state, { payload }) => {
          state.userInfo = payload;
      },
      setLanguages: (state, { payload }) => {
          state.languages = payload;
      },

      setPackages: (state, { payload }) => {
          state.packages = payload;
      },

      selectPackage: (state, { payload }) => {
          state.selectedPackage = payload;
      },
      onLanguageChange: (state, { payload }) => {
          state.currentLanguage = payload;
      },
  },
});
// Action creators are generated for each case reducer function
export const { getSession, setLanguages, onLanguageChange, setPackages, selectPackage } =
  userSlice.actions;

export default userSlice.reducer;
