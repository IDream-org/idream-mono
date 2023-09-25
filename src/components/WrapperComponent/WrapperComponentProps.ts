import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export interface WrapperComponentProps {
  loading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  component: React.ReactNode;
  loaderStyles?: SxProps<Theme>;
}
