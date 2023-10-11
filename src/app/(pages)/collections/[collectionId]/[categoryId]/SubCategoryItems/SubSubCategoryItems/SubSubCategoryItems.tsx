"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { CategoryItems } from "@prisma/client";
import { useParams, useSearchParams, useRouter } from "next/navigation";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BackButton from "@/components/BackButton/BackButton";
import BasicDialog from "@/components/BasicDialog/BasicDialog";
import BasicSpeedDial from "@/components/BasicSpeedDial/BasicSpeedDial";
import WrapperComponent from "@/components/WrapperComponent/WrapperComponent";

import { useDeleteSubSubCategoryMutation } from "@/app/redux/services/subsubcategoryApiSlice";

import { UserActions } from "@/classes/UserActions";
import { useGetCollectionQuery } from "@/app/redux/services/collectionApiSlice";
import { useGetSubSubcategoryItemQuery } from "@/app/redux/services/subsubcategoryItemApiSlice";
import RenderCollectionItem from "@/components/RenderCollectionItem/RenderCollectionItem";
import SubSubCategoryItemsNotesPage from "./SubSubCategoryItemsNotesPage";
import SubSubCategoryItemsGalleryPage from "./SubSubCategoryItemsGalleryPage";

enum Page {
  DEFAULT,
  NOTES,
  GALLRY,
}

const SubSubCategoryItems = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const collectionId = String(params.collectionId);
  const categoryId = String(params.categoryId);
  const subcategoryId = searchParams.get("subcategoryId");
  const subsubcategoryId = searchParams.get("subsubcategoryId");

  const { data: collection } = useGetCollectionQuery({ collectionId });
  const [deleteSubSubCategory] = useDeleteSubSubCategoryMutation();
  const {
    data: subSubcategoryItem,
    isLoading: isLoadingSubSubCategoryItems,
    error: errorSubSubCategoryItems,
  } = useGetSubSubcategoryItemQuery({
    collectionId,
    subsubcategoryId: subsubcategoryId ?? "",
  });

  const actions = new UserActions(session, collection);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(Page.DEFAULT);

  const handleCloseDialog = async () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    if (!subsubcategoryId) return;
    await deleteSubSubCategory({
      collectionId,
      subsubcategoryId,
    });
    router.push(
      `/collections/${collectionId}/${categoryId}?subcategoryId=${subcategoryId}`
    );
  };

  const handleConfirmDialog = async () => {
    await handleDelete();
  };

  const getPage = (page: Page) => {
    switch (page) {
      case Page.DEFAULT:
        return (
          <RenderCollectionItem
            categoryItems={subSubcategoryItem as CategoryItems[]}
            isLoading={isLoadingSubSubCategoryItems}
            path={`?subcategoryId=${subcategoryId}&subsubcategoryId=${subsubcategoryId}`}
          />
        );
      case Page.NOTES:
        return <SubSubCategoryItemsNotesPage />;
      case Page.GALLRY:
        return <SubSubCategoryItemsGalleryPage />;
      default:
        return (
          <RenderCollectionItem
            categoryItems={subSubcategoryItem as CategoryItems[]}
            isLoading={isLoadingSubSubCategoryItems}
            path={`?subcategoryId=${subcategoryId}&subsubcategoryId=${subsubcategoryId}`}
          />
        );
    }
  };

  const renderSubSubCategoryItems = () => {
    if (!subSubcategoryItem || subSubcategoryItem.length == 0) {
      return (
        <>
          <BackButton
            path={`/collections/${collectionId}/${categoryId}?subcategoryId=${subcategoryId}`}
          />
          <Grid pt={"25%"} pb={"25%"} textAlign={"center"}>
            <Typography mb={5}>No Items found</Typography>
            <Button
              variant="contained"
              onClick={() =>
                router.push(
                  `/collections/${collectionId}/${categoryId}/create/item?categoryId=${categoryId}&subcategoryId=${subcategoryId}&subsubcategoryId=${subsubcategoryId}`
                )
              }
            >
              Create new item
            </Button>
          </Grid>
          <BasicSpeedDial
            actions={actions.getAuthorAndOwnerPrivilegesActions({
              create: () =>
                router.push(
                  `/collections/${collectionId}/${categoryId}/create/item?categoryId=${categoryId}&subcategoryId=${subcategoryId}&subsubcategoryId=${subsubcategoryId}`
                ),
              remove: () => setOpenDialog(true),
            })}
          />
          <BasicDialog
            title={`Delete ${subcategoryId}`}
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
          path={`/collections/${collectionId}/${categoryId}?subcategoryId=${subcategoryId}`}
        />
        {getPage(page)}
        <BasicSpeedDial
          actions={actions.getAuthorAndOwnerPrivilegesItemsActions({
            create: () =>
              router.push(
                `/collections/${collectionId}/${categoryId}/create/item?categoryId=${categoryId}&subcategoryId=${subcategoryId}&subsubcategoryId=${subsubcategoryId}`
              ),
            remove: () => setOpenDialog(true),
            notes: () => setPage(Page.NOTES),
            gallery: () => setPage(Page.GALLRY),
          })}
        />
        <BasicDialog
          title={`Delete ${subsubcategoryId}`}
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
      loading={isLoadingSubSubCategoryItems}
      error={errorSubSubCategoryItems}
      component={renderSubSubCategoryItems()}
    />
  );
};

export default SubSubCategoryItems;
