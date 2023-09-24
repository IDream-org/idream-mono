import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackbarSeverity } from "../../models/SnackbarSeverity";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  severity: SnackbarSeverity.Success,
};

const snackbarSlice = createSlice({
  name: "Snackbar",
  initialState,
  reducers: {
    successSnackbar(state, action: PayloadAction<{ message: string }>) {
      (state.open = true), (state.message = action.payload.message);
      state.severity = SnackbarSeverity.Success;
    },
    errorSnackbar(state, action: PayloadAction<{ message: string }>) {
      (state.open = true), (state.message = action.payload.message);
      state.severity = SnackbarSeverity.Error;
    },
    closeSnackbar(state) {
      (state.open = false), (state.message = "");
      state.severity = SnackbarSeverity.Success;
    },
  },
});

export const { successSnackbar, errorSnackbar, closeSnackbar } =
  snackbarSlice.actions;
export default snackbarSlice.reducer;
