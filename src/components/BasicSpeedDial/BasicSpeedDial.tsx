import * as React from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import { BasicSpeedDialProps } from "./BasicSpeedDialProps";

const BasicSpeedDial: React.FC<BasicSpeedDialProps> = ({ actions }) => {
  const theme = useTheme();
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Grid
      sx={{
        position: "fixed",
        bottom: lgSize ? 10 : 32,
        right: lgSize ? 10 : 88,
      }}
    >
      <SpeedDial ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon />}>
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Grid>
  );
};

export default BasicSpeedDial;
