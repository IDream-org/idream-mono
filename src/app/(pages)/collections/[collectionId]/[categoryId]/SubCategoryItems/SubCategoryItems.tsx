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

import { UserActions } from "@/classes/UserActions";
import { useGetCollectionQuery } from "@/app/redux/services/collectionApiSlice";
import { useGetSubcategoryItemQuery } from "@/app/redux/services/subcategoryItemApiSlice";
import { useDeleteSubCategoryMutation } from "@/app/redux/services/subcategoryApiSlice";
import { useGetSubSubCategoriesQuery } from "@/app/redux/services/subsubcategoryApiSlice";
import RenderCollections from "@/components/RenderCollections/RenderCollections";
import SubSubCategoryItems from "./SubSubCategoryItems/SubSubCategoryItems";
import RenderCollectionItem from "@/components/RenderCollectionItem/RenderCollectionItem";
import { Page } from "@/app/models/Page";
import SubCategoryItemsNotes from "./SubCategoryItemsNotes";
import SubCategoryItemsGallery from "./SubCategoryItemsGallery";

const SubCategoryItems = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const collectionId = String(params.collectionId);
  const categoryId = String(params.categoryId);
  const subcategoryId = searchParams.get("subcategoryId");
  const subsubcategoryId = searchParams.get("subsubcategoryId");

  const { data: collection } = useGetCollectionQuery({ collectionId });
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const {
    data: subSubCategory,
    isLoading: isLoadingSubSubCategory,
    error: errorSubSubCategory,
  } = useGetSubSubCategoriesQuery({
    collectionId,
    subCategoryId: subcategoryId ?? "",
  });
  const {
    data: subcategoryItem,
    isLoading: isLoadingSubCategoryItems,
    error: errorSubCategoryItems,
  } = useGetSubcategoryItemQuery({
    collectionId,
    subcategoryId: subcategoryId ?? "",
  });
  const actions = new UserActions(session, collection);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(Page.DEFAULT);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    if (!subcategoryId) return;
    await deleteSubCategory({
      collectionId,
      subCategoryId: subcategoryId,
    }).unwrap();
    router.push(`/collections/${collectionId}/${categoryId}`);
  };

  const handleConfirmDialog = async () => {
    await handleDelete();
  };

  const getPage = (page: Page) => {
    switch (page) {
      case Page.DEFAULT:
        return (
          <RenderCollectionItem
            categoryItems={subcategoryItem as CategoryItems[]}
            isLoading={isLoadingSubCategoryItems}
            path={`?subcategoryId=${subcategoryId}`}
          />
        );
      case Page.NOTES:
        return <SubCategoryItemsNotes />;
      case Page.GALLRY:
        return <SubCategoryItemsGallery />;
      default:
        return (
          <RenderCollectionItem
            categoryItems={subcategoryItem as CategoryItems[]}
            isLoading={isLoadingSubCategoryItems}
            path={`?subcategoryId=${subcategoryId}`}
          />
        );
    }
  };

  const renderSubCategory = () => {
    if (subsubcategoryId) {
      return <SubSubCategoryItems />;
    }

    if (
      (!subcategoryItem || subcategoryItem.length === 0) &&
      (!subSubCategory || !subSubCategory.length)
    ) {
      return (
        <>
          <BackButton path={`/collections/${collectionId}/${categoryId}`} />
          <Grid pt={"25%"} pb={"25%"} textAlign={"center"}>
            <Typography mb={5}>No Items found</Typography>
            <Button
              variant="contained"
              onClick={() =>
                router.push(
                  `/collections/${collectionId}/${categoryId}/create?categoryId=${categoryId}&subcategoryId=${subcategoryId}`
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
                  `/collections/${collectionId}/${categoryId}/create?categoryId=${categoryId}&subcategoryId=${subcategoryId}`
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

    if (subSubCategory && subSubCategory.length > 0) {
      return (
        <>
          <BackButton path={`/collections/${collectionId}/${categoryId}`} />
          <Grid container display={"flex"} justifyContent={"center"}>
            <Grid item xs={12} lg={10}>
              <RenderCollections
                data={subSubCategory}
                path={`collections/${collectionId}`}
              />
              <BasicSpeedDial
                actions={actions.getAuthorAndOwnerPrivilegesActions({
                  create: () =>
                    router.push(
                      `/collections/${collectionId}/create?categoryId=${categoryId}&subcategoryId=${subcategoryId}&categoryItemExists=true`
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
    }

    return (
      <>
        <BackButton
          onClick={
            page !== Page.DEFAULT ? () => setPage(Page.DEFAULT) : undefined
          }
          path={`/collections/${collectionId}/${categoryId}`}
        />
        {getPage(page)}
        <BasicSpeedDial
          actions={actions.getAuthorAndOwnerPrivilegesItemsActions({
            create: () =>
              router.push(
                `/collections/${collectionId}/${categoryId}/create/item?categoryItemExists=true&subcategoryId=${subcategoryId}`
              ),
            remove: () => setOpenDialog(true),
            notes: () => setPage(Page.NOTES),
            gallery: () => setPage(Page.GALLRY),
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
  };

  return (
    <WrapperComponent
      loading={isLoadingSubCategoryItems || isLoadingSubSubCategory}
      error={errorSubCategoryItems || errorSubSubCategory}
      component={renderSubCategory()}
    />
  );
};

export default SubCategoryItems;
