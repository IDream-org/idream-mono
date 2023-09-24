"use client";

import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";

type ThemeContextType = {
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  mode: "light",
  setMode: () => {},
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode = "light", setMode] = React.useState<"light" | "dark">("light");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  const prviderValues = React.useMemo(
    () => ({ mode, setMode }),
    [mode, setMode]
  );

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeContext.Provider value={prviderValues}>
          {children}
        </ThemeContext.Provider>
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
