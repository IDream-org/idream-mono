import React, { useState } from "react";
import { CategoryItems } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMediaQuery, useTheme } from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import InputAdornment from "@mui/material/InputAdornment";

import BasicRating from "@/components/BasicRating/BasicRating";

interface AddRatingProps {
  data: Partial<CategoryItems>;
  setData: React.Dispatch<React.SetStateAction<Partial<CategoryItems>>>;
}

const AddRating: React.FC<AddRatingProps> = ({ data, setData }) => {
  const { data: session } = useSession();
  const theme = useTheme();
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));
  const [comment, setComment] = useState("");

  const handleAddComment = () => {
    if (!comment) return;
    setData((prev) => ({
      ...prev,
      comments: [
        ...prev.comments!,
        {
          id: "",
          createdAt: new Date(),
          comment,
          author: `${session?.user.firstName} ${session?.user.lastName}`,
          userId: session?.user.id ?? "",
        },
      ],
    }));
    setComment("");
  };

  return (
    <Grid container display={"flex"} flexDirection={"column"}>
      <Grid
        item
        xs={lgSize ? 12 : 5}
        pb={2}
        margin={"auto"}
        width={"100%"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <Grid item xs={6}>
          <Typography>Quality</Typography>
        </Grid>
        <Grid item xs={6}>
          <BasicRating
            justifyContent={lgSize ? "end" : "unset"}
            size="large"
            showLabel={!lgSize}
            value={data.rating?.quality ?? 0}
            disabled={false}
            width={"unset"}
            handleChange={(e, newValue) => {
              setData({
                ...data,
                rating: { ...data.rating!, quality: newValue ?? 0 },
              });
            }}
            sx={{ fontSize: "2rem" }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs={lgSize ? 12 : 5}
        pb={2}
        margin={"auto"}
        width={"100%"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <Grid item xs={6}>
          <Typography>Expectations</Typography>
        </Grid>
        <Grid item xs={6}>
          <BasicRating
            justifyContent={lgSize ? "end" : "unset"}
            size="large"
            showLabel={!lgSize}
            value={data.rating?.expectations ?? 0}
            disabled={false}
            width={"unset"}
            handleChange={(e, newValue) =>
              setData({
                ...data,
                rating: { ...data.rating!, expectations: newValue ?? 0 },
              })
            }
            sx={{ fontSize: "2rem" }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs={lgSize ? 12 : 5}
        pb={2}
        margin={"auto"}
        width={"100%"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <Grid item xs={6}>
          <Typography>Performance</Typography>
        </Grid>
        <Grid item xs={6}>
          <BasicRating
            justifyContent={lgSize ? "end" : "unset"}
            size="large"
            showLabel={!lgSize}
            value={data.rating?.performance ?? 0}
            disabled={false}
            width={"unset"}
            handleChange={(e, newValue) =>
              setData({
                ...data,
                rating: { ...data.rating!, performance: newValue ?? 0 },
              })
            }
            sx={{ fontSize: "2rem" }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs={lgSize ? 12 : 5}
        pb={2}
        margin={"auto"}
        width={"100%"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <Grid item xs={6}>
          <Typography>Recommendation</Typography>
        </Grid>
        <Grid item xs={6}>
          <BasicRating
            justifyContent={lgSize ? "end" : "unset"}
            size="large"
            showLabel={!lgSize}
            value={data.rating?.recommendation ?? 0}
            disabled={false}
            width={"unset"}
            handleChange={(e, newValue) =>
              setData({
                ...data,
                rating: { ...data.rating!, recommendation: newValue ?? 0 },
              })
            }
            sx={{ fontSize: "2rem" }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs={lgSize ? 12 : 5}
        pb={2}
        margin={"auto"}
        width={"100%"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <Grid item xs={6}>
          <Typography>Overall</Typography>
        </Grid>
        <Grid item xs={6}>
          <BasicRating
            justifyContent={lgSize ? "end" : "unset"}
            size="large"
            showLabel={!lgSize}
            value={data.rating?.overall ?? 0}
            disabled={false}
            width={"unset"}
            handleChange={(e, newValue) =>
              setData({
                ...data,
                rating: { ...data.rating!, overall: newValue ?? 0 },
              })
            }
            sx={{ fontSize: "2rem" }}
          />
        </Grid>
      </Grid>
      <Grid pt={10} item xs={lgSize ? 12 : 5} margin={"auto"} width={"100%"}>
        <Grid display={"flex"} alignItems={"center"} pb={10}>
          <ListItemAvatar>
            <Avatar alt="Profile Picture" src={session?.user.avatar} />
          </ListItemAvatar>

          <TextField
            label="Add a comment..."
            fullWidth
            value={comment}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddComment();
              }
            }}
            onChange={(e) => setComment(e.target.value)}
            InputProps={{
              sx: { borderRadius: "30px" },
              endAdornment: (
                <InputAdornment
                  sx={{ cursor: "pointer" }}
                  onClick={handleAddComment}
                  position="start"
                >
                  <SendIcon fontSize="large" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {data.comments?.map((comment, index) => (
          <ListItem key={index} button>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={session?.user.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={comment.author}
              secondary={comment.comment}
            />
            <DeleteIcon
              onClick={() => {
                const filteredComments = data.comments?.filter(
                  (filteredComment) =>
                    filteredComment.comment !== comment.comment
                );
                setData((prev) => ({
                  ...prev,
                  comments: filteredComments,
                }));
              }}
            />
          </ListItem>
        ))}
      </Grid>
    </Grid>
  );
};

export default AddRating;
