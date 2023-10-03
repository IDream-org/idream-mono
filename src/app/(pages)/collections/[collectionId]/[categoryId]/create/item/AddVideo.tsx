import React from "react";
import { CategoryItems } from "@prisma/client";
import { useMediaQuery, useTheme } from "@mui/material";
import "./AddVideo.css";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ReactPlayer from "react-player";

interface AddVideoProps {
  data: Partial<CategoryItems>;
  setData: React.Dispatch<React.SetStateAction<Partial<CategoryItems>>>;
}

const AddVideo: React.FC<AddVideoProps> = ({ data, setData }) => {
  const theme = useTheme();
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Grid container justifyContent={"center"}>
      <Grid
        item
        xs={12}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
      >
        <Grid
          item
          xs={lgSize ? 12 : 5}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <TextField
            type="text"
            label="Add youtube link"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                video: e.target.value,
              }))
            }
          />
        </Grid>
      </Grid>

      <Grid
        item
        pt={10}
        xs={lgSize ? 12 : 6}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
      >
        <ReactPlayer
          className="react-player"
          controls={true}
          width={"100%"}
          style={{ borderRadius: "20px" }}
          url={data.video ? data.video : "t"}
        />
      </Grid>
    </Grid>
  );
};

export default AddVideo;
