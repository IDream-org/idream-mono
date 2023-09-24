"use client";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./services/apiSlice";
import drawerSlice from "./features/drawerSlice";
import snackbarSlice from "./features/snackbarSlice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, apiSlice.middleware),
  reducer: {
    drawer: drawerSlice,
    snackbar: snackbarSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
