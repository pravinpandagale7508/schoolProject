import { configureStore } from '@reduxjs/toolkit';

import snackbarSlice from '../reducers/snackbarSlicer';
import adminSlice from '../reducers/admin-reducers/AdminSlicer';
export default configureStore({
  reducer: {
    snackbar: snackbarSlice,
        admin: adminSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});
