import React from "react";
import "react-dropzone/examples/theme.css";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { CategoryItems } from "@prisma/client";
import { useMediaQuery, useTheme } from "@mui/material";

interface AddDetailsProps {
  data: Partial<CategoryItems>;
  setData: React.Dispatch<React.SetStateAction<Partial<CategoryItems>>>;
}

const AddDetails: React.FC<AddDetailsProps> = ({ data, setData }) => {
  const theme = useTheme();
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <>
      <Grid
        pb={5}
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={lgSize ? "column" : "row"}
      >
        <Grid item xs={lgSize ? 12 : 5}>
          <TextField
            type="text"
            value={data.title}
            label="Title"
            fullWidth
            variant="standard"
            required
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </Grid>
        <Grid item xs={lgSize ? 12 : 5}>
          <TextField
            type="text"
            value={data.subtitle}
            label="Subtitle"
            fullWidth
            variant="standard"
            required
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid pb={5} item xs={12}>
        <TextField
          type="text"
          value={data.description}
          label="Description"
          fullWidth
          variant="filled"
          multiline
          rows={4}
          required
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </Grid>
    </>
  );
};

export default AddDetails;
