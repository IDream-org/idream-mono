import React from "react";
import { useParams } from "next/navigation";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useGetUsersQuery } from "@/app/redux/services/usersApiSlice";
import { useGetCollectionQuery } from "@/app/redux/services/collectionApiSlice";

import WrapperComponent from "@/components/WrapperComponent/WrapperComponent";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  const params = useParams();
  const collectionId = String(params.collectionId);
  const {
    data: collection,
    isLoading: isLoadingCollection,
    error: errorCollection,
  } = useGetCollectionQuery({ collectionId });
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useGetUsersQuery({});
  const author = users?.find((user) => user.id === collection?.authorId);

  const renderSettings = () => {
    if (!collection || !users) {
      return <></>;
    }
    return (
      <Grid md={4} xs={12} display={"flex"} flexDirection={"column"}>
        <Grid container pb={2}>
          <Grid xs={6}>
            <Typography>Title: </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography>{collection.title}</Typography>
          </Grid>
        </Grid>

        <Grid container pb={2}>
          <Grid xs={6}>
            <Typography>Author: </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography>
              {author?.firstName} {author?.lastName}
            </Typography>
          </Grid>
        </Grid>

        <Grid container pb={2}>
          <Grid xs={6}>
            <Typography>Private: </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography>{collection.private ? "True" : "False"}</Typography>
          </Grid>
        </Grid>

        <Grid container pb={2}>
          <Grid xs={6}>
            <Typography>Created: </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography>
              {new Date(collection.createdAt).toLocaleDateString("en-US")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  return (
    <WrapperComponent
      loaderStyles={{ bottom: "30%" }}
      loading={isLoadingCollection || isLoadingUsers}
      error={errorCollection || errorUsers}
      component={renderSettings()}
    />
  );
};

export default Settings;
