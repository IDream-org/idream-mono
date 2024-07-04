import React from "react";
import Grid from "@mui/material/Grid";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = ({}) => {
  return (
    <Grid
      xs={12}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      Settings
    </Grid>
  );
};

export default Settings;
