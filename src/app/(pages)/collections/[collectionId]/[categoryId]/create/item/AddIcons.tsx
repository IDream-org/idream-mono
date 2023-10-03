import * as React from "react";
import { CategoryItems } from "@prisma/client";
import { useMediaQuery, useTheme } from "@mui/material";

import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import IconsList from "@/components/IconsList/IconsList";
import FormControlLabel from "@mui/material/FormControlLabel";

interface AddIconsProps {
  data: Partial<CategoryItems>;
  setData: React.Dispatch<React.SetStateAction<Partial<CategoryItems>>>;
}

const AddIcons: React.FC<AddIconsProps> = ({ data, setData }) => {
  const theme = useTheme();
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Grid
      item
      xs={12}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
    >
      <Grid
        item
        xs={lgSize ? 12 : 8}
        pt={4}
        pb={4}
        pr={2}
        pl={2}
        sx={{
          backgroundColor: "#F3F6F9",
          border: "1px solid #E5EAF2",
          borderRadius: "12px",
        }}
        display={"flex"}
        flexDirection={lgSize ? "column" : "row"}
        justifyContent={"center"}
      >
        <Grid
          item
          xs={lgSize ? 12 : 4}
          sx={{ display: lgSize ? "none" : "unset" }}
        >
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Filter</FormLabel>
            <RadioGroup defaultValue="all" name="radio-buttons-group">
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel
                value="shapes"
                control={<Radio />}
                label="Shapes"
              />
              <FormControlLabel
                value="arrow"
                control={<Radio />}
                label="Arrows"
              />
              <FormControlLabel
                value="media"
                control={<Radio />}
                label="Social Media"
              />
              <FormControlLabel
                value="streaming"
                control={<Radio />}
                label="Streaming Platform"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={lgSize ? 12 : 8}>
          <TextField
            fullWidth
            inputProps={{ style: { height: "10px" } }}
            sx={{ paddingBottom: 4 }}
          />
          <IconsList data={data} setData={setData} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddIcons;
