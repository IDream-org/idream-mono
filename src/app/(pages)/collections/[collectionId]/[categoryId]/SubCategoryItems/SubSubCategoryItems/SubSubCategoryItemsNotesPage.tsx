"use client";

import React, { useState } from "react";
import Link from "@mui/material/Link";
import { useParams, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/app/redux/hooks";

import SendIcon from "@mui/icons-material/Send";

import { useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import InputAdornment from "@mui/material/InputAdornment";

import { useGetUsersQuery } from "@/app/redux/services/usersApiSlice";
import {
  errorSnackbar,
  successSnackbar,
} from "@/app/redux/features/snackbarSlice";
import {
  useAddSubSubCategoryNoteMutation,
  useGetSubSubCategoryQuery,
} from "@/app/redux/services/subsubcategoryApiSlice";

function isValidHttpUrl(string: string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

const SubSubCategoryItemsNotesPage = () => {
  const { data: session } = useSession();
  const theme = useTheme();
  const params = useParams();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const mdSize = useMediaQuery(theme.breakpoints.down("md"));
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));
  const collectionId = String(params.collectionId);
  const subsubcategoryId = searchParams.get("subsubcategoryId");

  const { data } = useGetUsersQuery({});

  const largeGrid = lgSize ? 12 : 10;
  const largeGridSize = lgSize ? 10 : 8;
  const gridSize = mdSize ? 12 : largeGridSize;
  const flexDirection = lgSize ? "column" : "row";

  const { data: item } = useGetSubSubCategoryQuery({
    collectionId,
    subsubcategoryId: subsubcategoryId || "",
  });
  const [addSubSubCategoryItemNote] = useAddSubSubCategoryNoteMutation();

  const [comment, setComment] = useState("");

  const handleAddNote = async () => {
    if (!comment || !item || !subsubcategoryId) return;

    try {
      await addSubSubCategoryItemNote({
        collectionId,
        subsubcategoryId,
        comment,
      }).unwrap();
      dispatch(successSnackbar({ message: "Message added successfully" }));
      setComment("");
    } catch (error) {
      console.error("Failed adding comment");
      dispatch(errorSnackbar({ message: "Failed to update item" }));
    }
  };

  return (
    <Grid container mt={lgSize ? 12 : 10} justifyContent={"center"}>
      <Grid
        item
        xs={gridSize}
        display={"flex"}
        flexDirection={flexDirection}
        justifyContent={"space-between"}
      >
        <Grid item xs={largeGrid} sx={{ margin: "0 auto" }}>
          <Grid
            item
            pt={lgSize ? 10 : 0}
            xs={12}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            sx={{ maxHeight: "1200px" }}
          >
            <Grid display={"flex"} alignItems={"center"} pb={10}>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={session?.user.avatar} />
              </ListItemAvatar>

              <TextField
                label="Add a note..."
                fullWidth
                value={comment}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    await handleAddNote();
                  }
                }}
                onChange={(e) => setComment(e.target.value)}
                InputProps={{
                  sx: { borderRadius: "30px" },
                  endAdornment: (
                    <InputAdornment
                      sx={{ cursor: "pointer" }}
                      onClick={handleAddNote}
                      position="start"
                    >
                      <SendIcon fontSize="large" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid
              item
              height={lgSize ? "300px" : "unset"}
              display={"flex"}
              flexDirection={"column"}
              overflow={"auto"}
            >
              {item &&
                [...item.notes]?.reverse().map((comment, index) => {
                  const user = data?.find((user) => user.id === comment.userId);
                  return (
                    <ListItem key={index} button>
                      <ListItemAvatar>
                        <Avatar
                          alt="Profile Picture"
                          src={user?.avatar ?? ""}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.author}
                        secondary={
                          isValidHttpUrl(comment.comment) ? (
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              href={comment.comment}
                            >
                              {comment.comment}
                            </Link>
                          ) : (
                            comment.comment
                          )
                        }
                      />
                    </ListItem>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SubSubCategoryItemsNotesPage;
