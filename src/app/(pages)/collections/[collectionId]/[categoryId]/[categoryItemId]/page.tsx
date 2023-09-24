"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { CategoryItems, Roles } from "@prisma/client";

import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Grid from "@mui/material/Grid";
import RenderItem from "@/components/RenderItem/RenderItem";
import BasicDialog from "@/components/BasicDialog/BasicDialog";
import BasicSpeedDial from "@/components/BasicSpeedDial/BasicSpeedDial";
import BackButton from "@/components/BackButton/BackButton";
import WrapperComponent from "@/components/WrapperComponent/WrapperComponent";

import { useAppDispatch } from "@/app/redux/hooks";
import { useGetCollectionQuery } from "@/app/redux/services/collectionApiSlice";
import {
  errorSnackbar,
  successSnackbar,
} from "@/app/redux/features/snackbarSlice";
import {
  useAddCategoryItemCommentMutation,
  useChangeCategoryItemFavoriteMutation,
  useDeleteCategoryItemMutation,
  useGetCategoryItemQuery,
} from "@/app/redux/services/categoryItemApiSlice";

const CategoriesItems = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();

  const collectionId = String(params.collectionId);
  const categoryId = String(params.categoryId);
  const categoryItemId = String(params.categoryItemId);

  const { data, isLoading, error } = useGetCategoryItemQuery({
    collectionId,
    categoryId,
    categoryItemId,
  });
  const { data: collection } = useGetCollectionQuery({ collectionId });
  const [addCategoryItemComment] = useAddCategoryItemCommentMutation();
  const [changeCategoryItemFavorite] = useChangeCategoryItemFavoriteMutation();
  const [deleteCategoryItem] = useDeleteCategoryItemMutation();

  const [item, setItems] = useState<CategoryItems>({} as CategoryItems);
  const [comment, setComment] = useState("");

  const currentUser = collection?.users.find(
    (user) => user.userId === session?.user.id
  );

  useEffect(() => {
    if (!isLoading) {
      setItems(data || ({} as CategoryItems));
    }
  }, [isLoading, data]);

  const handleAddComment = async () => {
    if (!comment || !item) return;

    try {
      const updatedCategoryItem = await addCategoryItemComment({
        collectionId,
        categoryItemId: item.id,
        comment,
      }).unwrap();
      setItems(updatedCategoryItem);
      dispatch(successSnackbar({ message: "Message added successfully" }));
      setComment("");
    } catch (error) {
      console.error("Failed adding comment");
      dispatch(errorSnackbar({ message: "Failed to update item" }));
    }
  };

  const handleDone = async (done: boolean) => {
    if (!item) return;
    try {
      const updatedCategoryItem = await changeCategoryItemFavorite({
        collectionId,
        categoryItemId: item.id,
        done,
      }).unwrap();
      setItems(updatedCategoryItem);
    } catch (error) {
      console.error("Failed adding favorite");
    }
  };

  const handleEdit = () => {
    if (!item) return;
    router.push(
      `/collections/${collectionId}/${item.categoryId}/create?categoryItemId=${item.id}`
    );
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    if (!item) return;
    await deleteCategoryItem({
      collectionId,
      categoryItemId: item.id,
    }).unwrap();
    router.push(`/collections/${collectionId}/${item.categoryId}`);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDialog = async () => {
    await handleDelete();
  };

  const getActions = (done: boolean) => [
    {
      icon: !done ? (
        <FavoriteBorderIcon onClick={() => handleDone(true)} />
      ) : (
        <FavoriteIcon onClick={() => handleDone(false)} />
      ),
      name: done ? "Like" : "Dislike",
    },
    {
      icon: <EditIcon onClick={handleEdit} />,
      name: "Edit",
    },
    {
      icon: <DeleteOutlineIcon onClick={() => setOpenDialog(true)} />,
      name: "Delete",
    },
  ];

  const memberActions = (done: boolean) => [
    {
      icon: !done ? (
        <FavoriteBorderIcon onClick={() => handleDone(true)} />
      ) : (
        <FavoriteIcon onClick={() => handleDone(false)} />
      ),
      name: done ? "Like" : "Dislike",
    },
  ];

  const renderComponent = () => {
    return (
      <>
        <Grid display={"flex"} justifyContent={"space-between"}>
          <BackButton
            path={`/collections/${collectionId}/${item.categoryId}`}
          />
        </Grid>
        <RenderItem
          item={item || {}}
          comment={{
            value: comment,
            handleChange: setComment,
            handleAdd: handleAddComment,
          }}
        />
        <BasicSpeedDial
          actions={
            currentUser?.role !== Roles.Member
              ? getActions(item.done)
              : memberActions(item.done)
          }
        />
        <BasicDialog
          title={`Delete ${item.title}`}
          text="Are you sure you want to delete this item?"
          confirmText="Delete"
          cancelText="Cancel"
          open={openDialog}
          confirmColor={"warning"}
          handleClose={handleCloseDialog}
          handleConfirm={handleConfirmDialog}
        />
      </>
    );
  };

  return (
    <WrapperComponent
      loading={isLoading}
      error={error}
      component={renderComponent()}
    />
  );
};

export default CategoriesItems;
