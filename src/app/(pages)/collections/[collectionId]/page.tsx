"use client";
import React, { useState } from "react";
import { Roles } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import BasicSpeedDial from "@/components/BasicSpeedDial/BasicSpeedDial";
import WrapperComponent from "@/components/WrapperComponent/WrapperComponent";
import RenderCollections from "@/components/RenderCollections/RenderCollections";

import { useGetCategoriesQuery } from "@/app/redux/services/categoriesApiSlice";
import { useGetCollectionQuery } from "@/app/redux/services/collectionApiSlice";
import { useDeleteCollectionMutation } from "@/app/redux/services/collectionsApiSilce";
import BackButton from "@/components/BackButton/BackButton";
import BasicDialog from "@/components/BasicDialog/BasicDialog";

const CollectionsCategories = () => {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const collectionId = String(params.collectionId);

  const { data: collection } = useGetCollectionQuery({ collectionId });
  const { data, isLoading, error } = useGetCategoriesQuery({ collectionId });
  const [deleteCollection] = useDeleteCollectionMutation();
  const currentUser = collection?.users.find(
    (user) => user.userId === session?.user.id
  );

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    await deleteCollection({ collectionId }).unwrap();
    router.push(`/collections`);
  };

  const handleConfirmDialog = async () => {
    await handleDelete();
  };

  const adminActions = [
    {
      icon: (
        <AddIcon
          onClick={() => router.push(`/collections/${collectionId}/create`)}
        />
      ),
      name: "Create",
    },
  ];

  const ownerActions = [
    ...adminActions,
    {
      icon: (
        <SettingsIcon
          onClick={() => router.push(`/collections/${collectionId}/settings`)}
        />
      ),
      name: "Settings",
    },
  ];
  const authorActions = [
    ...ownerActions,
    {
      icon: <DeleteOutlineIcon onClick={() => setOpenDialog(true)} />,
      name: "Delete",
    },
  ];

  const renderAuthorSpeedDial = () =>
    session?.user.id === collection?.authorId && (
      <BasicSpeedDial actions={authorActions} />
    );

  const renderOwnerSpeedDial = () =>
    currentUser?.role === Roles.Owner && (
      <BasicSpeedDial actions={ownerActions} />
    );

  const renderAdminSpeedDial = () =>
    currentUser?.role === Roles.Admin && (
      <BasicSpeedDial actions={adminActions} />
    );

  const renderCollection = () => {
    if (!data || data.length === 0) {
      return (
        <Grid pt={"25%"} pb={"25%"} textAlign={"center"}>
          <Typography mb={5}>No Catagories found</Typography>
          <Button
            variant="contained"
            onClick={() => router.push(`/collections/${collectionId}/create`)}
          >
            Create new category
          </Button>
          {renderOwnerSpeedDial()}
          {renderAdminSpeedDial()}
          {renderAuthorSpeedDial()}
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
      );
    }

    return (
      <>
        <RenderCollections data={data} path="collections" />
        {renderOwnerSpeedDial()}
        {renderAdminSpeedDial()}
        {renderAuthorSpeedDial()}
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
      </>
    );
  };

  return (
    <React.Fragment>
      <BackButton path="/collections" />
      <Grid container mt={4} display={"flex"} justifyContent={"center"}>
        <Grid item xs={12} lg={10}>
          <WrapperComponent
            loading={isLoading}
            error={error}
            component={renderCollection()}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CollectionsCategories;
