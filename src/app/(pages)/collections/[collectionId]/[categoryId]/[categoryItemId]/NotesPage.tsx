"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { CategoryItems } from "@prisma/client";
import { useAppDispatch } from "@/app/redux/hooks";

import SendIcon from "@mui/icons-material/Send";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
  useAddCategoryItemNoteMutation,
  useRemoveCategoryItemNoteMutation,
} from "@/app/redux/services/categoryItemApiSlice";
import {
  errorSnackbar,
  successSnackbar,
} from "@/app/redux/features/snackbarSlice";
import { UserActions } from "@/classes/UserActions";
import { getCommentValues } from "@/app/helpers/getCommentValues";
import { useGetCollectionQuery } from "@/app/redux/services/collectionApiSlice";

interface NotesPageProps {
  item: CategoryItems;
  setItems: (value: React.SetStateAction<CategoryItems>) => void;
}

const NotesPage: React.FC<NotesPageProps> = ({ item, setItems }) => {
  const { data: session } = useSession();
  const theme = useTheme();
  const params = useParams();
  const dispatch = useAppDispatch();
  const mdSize = useMediaQuery(theme.breakpoints.down("md"));
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));
  const collectionId = String(params.collectionId);

  const { data } = useGetUsersQuery({});
  const { data: collection } = useGetCollectionQuery({ collectionId });

  const userActions = new UserActions(session, collection);

  const largeGrid = lgSize ? 12 : 10;
  const largeGridSize = lgSize ? 10 : 8;
  const gridSize = mdSize ? 12 : largeGridSize;
  const flexDirection = lgSize ? "column" : "row";

  const [addCategoryItemNote] = useAddCategoryItemNoteMutation();
  const [removeCategoryItemNote] = useRemoveCategoryItemNoteMutation();

  const [comment, setComment] = useState("");

  const handleAddNote = async () => {
    if (!comment || !item) return;

    try {
      const updatedCategoryItem = await addCategoryItemNote({
        collectionId,
        categoryItemId: item.id,
        comment,
      }).unwrap();
      setItems(updatedCategoryItem);
      dispatch(successSnackbar({ message: "Message added successfully" }));
      setComment("");
    } catch (error) {
      console.error("Failed removing message");
      dispatch(errorSnackbar({ message: "Failed adding message" }));
    }
  };

  const handleRemoveNote = async (noteId: string) => {
    try {
      await removeCategoryItemNote({
        collectionId,
        categoryItemId: item.id,
        noteId,
      }).unwrap();
      dispatch(successSnackbar({ message: "Message removed successfully" }));
    } catch (error) {
      console.error("Failed adding message");
      dispatch(errorSnackbar({ message: "Failed removing message" }));
    }
  };

  return (
    <Grid container mt={lgSize ? 5 : 10} justifyContent={"center"}>
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
            xs={12}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            sx={{ maxHeight: "1200px" }}
          >
            <Grid display={"flex"} alignItems={"center"} pb={5}>
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
              height={lgSize ? "450px" : "900px"}
              display={"flex"}
              flexDirection={"column"}
              overflow={"auto"}
            >
              {[...item.notes]?.reverse().map((itemComment, index) => {
                const user = data?.find(
                  (user) => user.id === itemComment.userId
                );
                return (
                  <ListItem key={index} button>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src={user?.avatar ?? ""} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ wordBreak: "break-word" }}
                      primary={itemComment.author}
                      secondary={getCommentValues(itemComment.comment)}
                    />
                    {userActions.isAuthorOrOwnerOrCommentOwner(itemComment) && (
                      <DeleteOutlineIcon
                        color="warning"
                        onClick={() => handleRemoveNote(itemComment.id)}
                      />
                    )}
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

export default NotesPage;
