import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DrawerState {
  open: boolean;
}

const initialState: DrawerState = {
  open: false,
};

const drawerSlice = createSlice({
  name: "Drawer",
  initialState,
  reducers: {
    openDrawer(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
  },
});

export const { openDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
