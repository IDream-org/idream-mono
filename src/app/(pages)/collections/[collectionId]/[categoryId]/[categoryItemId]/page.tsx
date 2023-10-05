"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { CategoryItems, Roles } from "@prisma/client";

import EditIcon from "@mui/icons-material/Edit";
import NotesIcon from "@mui/icons-material/Notes";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Grid from "@mui/material/Grid";
import BasicDialog from "@/components/BasicDialog/BasicDialog";
import BasicSpeedDial from "@/components/BasicSpeedDial/BasicSpeedDial";
import BackButton from "@/components/BackButton/BackButton";
import WrapperComponent from "@/components/WrapperComponent/WrapperComponent";

import { useGetCollectionQuery } from "@/app/redux/services/collectionApiSlice";
import {
  useChangeCategoryItemFavoriteMutation,
  useDeleteCategoryItemMutation,
  useGetCategoryItemQuery,
} from "@/app/redux/services/categoryItemApiSlice";
import DefaultPage from "./DefaultPage";
import NotesPage from "./NotesPage";
import GalleryPage from "./GalleryPage";

enum Page {
  DEFAULT,
  NOTES,
  GALLRY,
}

const CategoriesItems = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const collectionId = String(params.collectionId);
  const categoryId = String(params.categoryId);
  const categoryItemId = String(params.categoryItemId);
  const subcategoryId = searchParams.get("subcategoryId");
  const subsubcategoryId = searchParams.get("subsubcategoryId");

  const { data, isLoading, error } = useGetCategoryItemQuery({
    collectionId,
    categoryId,
    categoryItemId,
  });
  const { data: collection } = useGetCollectionQuery({ collectionId });
  const [changeCategoryItemFavorite] = useChangeCategoryItemFavoriteMutation();
  const [deleteCategoryItem] = useDeleteCategoryItemMutation();

  const [item, setItems] = useState<CategoryItems>({} as CategoryItems);

  const [page, setPage] = useState(Page.DEFAULT);

  const currentUser = collection?.users.find(
    (user) => user.userId === session?.user.id
  );

  useEffect(() => {
    if (!isLoading) {
      setItems(data || ({} as CategoryItems));
    }
  }, [isLoading, data]);

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
      subcategoryId
        ? `/collections/${collectionId}/${item.categoryId}/create/item?categoryItemId=${item.id}&subcategoryId=${subcategoryId}`
        : `/collections/${collectionId}/${item.categoryId}/create/item?categoryItemId=${item.id}`
    );
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    if (!item) return;
    await deleteCategoryItem({
      collectionId,
      categoryItemId: item.id,
    }).unwrap();
    if (subsubcategoryId) {
      router.push(
        `/collections/${collectionId}/${item.categoryId}?subcategoryId=${subcategoryId}&subsubcategoryId=${subsubcategoryId}`
      );
    } else if (subcategoryId) {
      router.push(
        `/collections/${collectionId}/${item.categoryId}?subcategoryId=${subcategoryId}`
      );
    } else {
      router.push(`/collections/${collectionId}/${item.categoryId}`);
    }
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
      icon: <NotesIcon onClick={() => setPage(Page.NOTES)} />,
      name: "Notes",
    },
    {
      icon: <AddAPhotoIcon onClick={() => setPage(Page.GALLRY)} />,
      name: "Gallery",
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

  const getPage = (page: Page) => {
    switch (page) {
      case Page.DEFAULT:
        return <DefaultPage item={item} setItems={setItems} />;
      case Page.NOTES:
        return <NotesPage item={item} setItems={setItems} />;
      case Page.GALLRY:
        return <GalleryPage />;
      default:
        return <DefaultPage item={item} setItems={setItems} />;
    }
  };

  const renderComponent = () => {
    return (
      <>
        <Grid display={"flex"} justifyContent={"space-between"}>
          <BackButton
            onClick={
              page !== Page.DEFAULT ? () => setPage(Page.DEFAULT) : undefined
            }
            path={
              subsubcategoryId
                ? `/collections/${collectionId}/${item.categoryId}?subcategoryId=${subcategoryId}&subsubcategoryId=${subsubcategoryId}`
                : subcategoryId
                ? `/collections/${collectionId}/${item.categoryId}?subcategoryId=${subcategoryId}`
                : `/collections/${collectionId}/${item.categoryId}`
            }
          />
        </Grid>
        {getPage(page)}
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
