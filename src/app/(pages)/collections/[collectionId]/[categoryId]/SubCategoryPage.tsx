"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import BackButton from "@/components/BackButton/BackButton";
import BasicDialog from "@/components/BasicDialog/BasicDialog";
import BasicSpeedDial from "@/components/BasicSpeedDial/BasicSpeedDial";
import WrapperComponent from "@/components/WrapperComponent/WrapperComponent";
import RenderCollections from "@/components/RenderCollections/RenderCollections";

import { useDeleteCategoryMutation } from "@/app/redux/services/categoriesApiSlice";
import { useGetSubcategoriesQuery } from "@/app/redux/services/subcategoryApiSlice";
import { useGetCollectionQuery } from "@/app/redux/services/collectionApiSlice";
import SubCategoryItems from "./SubCategoryItems/SubCategoryItems";
import { UserActions } from "@/classes/UserActions";

const SubCategoryPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const collectionId = String(params.collectionId);
  const categoryId = String(params.categoryId);
  const subcategoryId = searchParams.get("subcategoryId");

  const { data: collection } = useGetCollectionQuery({ collectionId });
  const {
    data: subcategory,
    isLoading: isLoadingSubCategory,
    error: errorSubCategory,
  } = useGetSubcategoriesQuery({
    collectionId,
    categoryId,
  });

  const [deleteCategory] = useDeleteCategoryMutation();
  const actions = new UserActions(session, collection);

  const [openDialog, setOpenDialog] = useState(false);

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

  const renderSubCategory = () => {
    if (subcategoryId) {
      return <SubCategoryItems />;
    }

    if (!subcategory || subcategory.length === 0) {
      return (
        <>
          <BackButton path={`/collections/${collectionId}/${categoryId}`} />
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
                  `/collections/${collectionId}/${categoryId}/create?categoryId=${categoryId}`
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
        <BackButton path={`/collections/${collectionId}`} />
        <Grid container mt={4} display={"flex"} justifyContent={"center"}>
          <Grid item xs={12} lg={10}>
            <RenderCollections
              data={subcategory}
              path={`collections/${collectionId}`}
            />
            <BasicSpeedDial
              actions={actions.getAuthorAndOwnerPrivilegesActions({
                create: () =>
                  router.push(
                    `/collections/${collectionId}/create?categoryId=${categoryId}`
                  ),
                remove: () => setOpenDialog(true),
              })}
            />
            <BasicDialog
              title={`Delete ${collectionId}`}
              text="Are you sure you want to delete this category? All of its itens will be delete."
              confirmText="Delete"
              cancelText="Cancel"
              open={openDialog}
              confirmColor={"warning"}
              handleClose={handleCloseDialog}
              handleConfirm={handleConfirmDialog}
            />
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <WrapperComponent
      loading={isLoadingSubCategory}
      error={errorSubCategory}
      component={renderSubCategory()}
    />
  );
};

export default SubCategoryPage;
