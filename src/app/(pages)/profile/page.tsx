"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import { useAppDispatch } from "@/app/redux/hooks";
import { useUploadImageMutation } from "@/app/redux/services/imageApiSlice";
import { useUploadUserImageMutation } from "@/app/redux/services/userApiSlice";
import {
  errorSnackbar,
  successSnackbar,
} from "@/app/redux/features/snackbarSlice";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [uploadImage] = useUploadImageMutation();
  const [uploadUserImage] = useUploadUserImageMutation();

  const dispatch = useAppDispatch();

  const { getRootProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
    onDropAccepted(files, event) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = async () => {
        if (reader.result) {
          try {
            const { url } = await uploadImage(files[0]).unwrap();
            const imageURL = url.split("?")[0];
            await uploadUserImage({
              userId: session!.user.id,
              imageURL,
            }).unwrap();
            dispatch(
              successSnackbar({ message: "User avatar uploaded successfully" })
            );
          } catch (error) {
            console.error(error);
            dispatch(
              errorSnackbar({ message: "Failed to upload user avatar" })
            );
          }
        } else {
          console.error("Failed converting to base64");
          dispatch(errorSnackbar({ message: "Failed converting to base64" }));
        }
      };
    },
  });

  return (
    <Grid container mt={4} justifyContent={"center"}>
      <Grid item xs={12} md={10} lg={8}>
        <div {...getRootProps()}>
          <Avatar
            alt="Remy Sharp"
            src={session?.user.avatar}
            sx={{
              width: 100,
              height: 100,
              margin: "auto",
              marginBottom: 10,
              cursor: "pointer",
            }}
          />
        </div>
        <Typography fontWeight={"bold"}>Account Information</Typography>
        <Typography mt={1} mb={4}>
          Personal details
        </Typography>
        <Divider />
        <Grid mt={3} mb={4}>
          <Grid item xs={4}>
            <Typography>Full Name</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              {session?.user.firstName} {session?.user.lastName}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid mt={3} mb={4}>
          <Grid item xs={4}>
            <Typography>Email Address</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{session?.user.email}</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid mt={3} mb={4}>
          <Grid item xs={4}>
            <Typography>Interests</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              {session?.user.interests ?? "No information available"}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid mt={3} mb={4}>
          <Grid item xs={4}>
            <Typography>About</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              {session?.user.description ?? "No information available"}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
