import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { UserStackProps } from "./UserStackProps";
import { Grid } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  maxWidth: 400,
}));

const UserStack: React.FC<UserStackProps> = ({ image, message, component }) => {
  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
      <Item
        sx={{
          my: 1,
          mx: "auto",
          p: 2,
        }}
      >
        <Stack
          spacing={2}
          width={"100%"}
          direction="row"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Grid
            display={"flex"}
            alignItems="center"
            flexDirection={"row"}
            width={"100%"}
          >
            <Avatar src={image} />
            <Typography pl={2} noWrap>
              {message}
            </Typography>
          </Grid>
          {component}
        </Stack>
      </Item>
    </Box>
  );
};
export default UserStack;
