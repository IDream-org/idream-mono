"use client";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./services/apiSlice";
import drawerSlice from "./features/drawerSlice";
import snackbarSlice from "./features/snackbarSlice";

const middlewares = [apiSlice.middleware];

if (process.env.NODE_ENV !== "production") {
  middlewares.push(logger);
}

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewares),
  reducer: {
    drawer: drawerSlice,
    snackbar: snackbarSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
