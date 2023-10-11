"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import WrapperComponent from "@/components/WrapperComponent/WrapperComponent";
import BackButton from "@/components/BackButton/BackButton";
import BasicSpeedDial from "@/components/BasicSpeedDial/BasicSpeedDial";
import BasicDialog from "@/components/BasicDialog/BasicDialog";

import { useGetCategoryItemsQuery } from "@/app/redux/services/categoryItemApiSlice";
import { useGetCollectionQuery } from "@/app/redux/services/collectionApiSlice";
import { useDeleteCategoryMutation } from "@/app/redux/services/categoriesApiSlice";
import { UserActions } from "@/classes/UserActions";
import RenderCollectionItem from "@/components/RenderCollectionItem/RenderCollectionItem";

import { Page } from "@/app/models/Page";
import { CategoryItems } from "@prisma/client";
import CategoryItemsPageNotes from "./CategoryItemsPageNotes";
import CategoryItemsPageGallary from "./CategoryItemsPageGallary";

const CategoryItemsPage = () => {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();

  const collectionId = String(params.collectionId);
  const categoryId = String(params.categoryId);

  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(Page.DEFAULT);

  const { data: collection } = useGetCollectionQuery({ collectionId });
  const {
    data: categoryItems,
    isLoading,
    error,
  } = useGetCategoryItemsQuery({
    collectionId,
    categoryId,
  });
  const [deleteCategory] = useDeleteCategoryMutation();
  const actions = new UserActions(session, collection);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    await deleteCategory({ collectionId, categoryId }).unwrap();
    router.push(`/collections/${collectionId}`);
  };

  const handleConfirmDialog = async () => {
    await handleDelete();
  };

  const getPage = (page: Page) => {
    switch (page) {
      case Page.DEFAULT:
        return (
          <RenderCollectionItem
            isLoading={isLoading}
            categoryItems={categoryItems as CategoryItems[]}
          />
        );
      case Page.NOTES:
        return <CategoryItemsPageNotes />;
      case Page.GALLRY:
        return <CategoryItemsPageGallary />;
      default:
        return (
          <RenderCollectionItem
            isLoading={isLoading}
            categoryItems={categoryItems as CategoryItems[]}
          />
        );
    }
  };

  const renderCategoryItems = () => {
    if (!categoryItems || categoryItems.length === 0) {
      return (
        <>
          <BackButton path={`/collections/${collectionId}`} />
          <Grid pt={"25%"} pb={"25%"} textAlign={"center"}>
            <Typography mb={5}>No Items found</Typography>
            <Button
              variant="contained"
              onClick={() =>
                router.push(`/collections/${collectionId}/${categoryId}/create`)
              }
            >
              Create new item
            </Button>
          </Grid>
          <BasicSpeedDial
            actions={actions.getAuthorAndOwnerPrivilegesActions({
              create: () =>
                router.push(
                  `/collections/${collectionId}/${categoryId}/create`
                ),
              remove: () => setOpenDialog(true),
            })}
          />
          <BasicDialog
            title={`Delete ${categoryId}`}
            text="Are you sure you want to delete this category? All of its itens will be delete."
            confirmText="Delete"
            cancelText="Cancel"
            open={openDialog}
            confirmColor={"warning"}
            handleClose={handleCloseDialog}
            handleConfirm={handleConfirmDialog}
          />
        </>
      );
    }

    return (
      <>
        <BackButton
          onClick={
            page !== Page.DEFAULT ? () => setPage(Page.DEFAULT) : undefined
          }
          path={`/collections/${collectionId}`}
        />
        {getPage(page)}
        <BasicSpeedDial
          actions={actions.getAuthorAndOwnerPrivilegesItemsActions({
            create: () =>
              router.push(
                `/collections/${collectionId}/${categoryId}/create/item?categoryItemExists=true`
              ),
            remove: () => setOpenDialog(true),
            notes: () => setPage(Page.NOTES),
            gallery: () => setPage(Page.GALLRY),
          })}
        />
        <BasicDialog
          title={`Delete ${categoryId}`}
          text="Are you sure you want to delete this category? All of its itens will be delete."
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
      component={renderCategoryItems()}
    />
  );
};

export default CategoryItemsPage;
