import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Grid from "@mui/material/Grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import BasicDialog from "@/components/BasicDialog/BasicDialog";
import { useDeleteCollectionMutation } from "@/app/redux/services/collectionsApiSilce";

const Options = () => {
  const params = useParams();
  const router = useRouter();
  const collectionId = String(params.collectionId);

  const [openDialog, setOpenDialog] = useState(false);

  const [deleteCollection] = useDeleteCollectionMutation();

  const handleDelete = async () => {
    await deleteCollection({ collectionId }).unwrap();
    router.push(`/collections`);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDialog = async () => {
    await handleDelete();
  };

  return (
    <Grid display={"flex"} justifyContent={"center"} pt={2}>
      <Grid>
        <DeleteOutlineIcon
          color="error"
          fontSize="large"
          onClick={() => setOpenDialog(true)}
          sx={{ cursor: "pointer", width: "300px" }}
        />
      </Grid>
      <BasicDialog
        title={`Delete ${collectionId}`}
        text="Are you sure you want to delete this collection? All of its itens will be delete."
        confirmText="Delete"
        cancelText="Cancel"
        open={openDialog}
        confirmColor={"warning"}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmDialog}
      />
    </Grid>
  );
};

export default Options;
