"use client";
import React from "react";
import { useRouter } from "next/navigation";

import AddIcon from "@mui/icons-material/Add";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import WrapperComponent from "@/components/WrapperComponent/WrapperComponent";
import BasicSpeedDial from "@/components/BasicSpeedDial/BasicSpeedDial";
import RenderCollections from "@/components/RenderCollections/RenderCollections";
import { useGetCollectionsQuery } from "@/app/redux/services/collectionsApiSilce";

const CollectionsPage = () => {
  const router = useRouter();
  const { data, isLoading, error, status } = useGetCollectionsQuery({});

  const actions = [
    {
      icon: <AddIcon onClick={() => router.push(`/collections/create`)} />,
      name: "Create",
    },
  ];

  const renderCollections = () => {
    if (!data || data.length === 0) {
      return (
        <Grid pt={"25%"} pb={"25%"} textAlign={"center"}>
          <Typography mb={5}>No Collections found</Typography>
          <Button
            variant="contained"
            onClick={() => router.push(`/collections/create`)}
          >
            Create new collection
          </Button>
        </Grid>
      );
    }

    return (
      <>
        <RenderCollections data={data} path="collections" />
        <BasicSpeedDial actions={actions} />
      </>
    );
  };

  return (
    <React.Fragment>
      <Grid container mt={4} display={"flex"} justifyContent={"center"}>
        <Grid item xs={12} lg={10}>
          <WrapperComponent
            loading={isLoading}
            error={error}
            component={renderCollections()}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CollectionsPage;
