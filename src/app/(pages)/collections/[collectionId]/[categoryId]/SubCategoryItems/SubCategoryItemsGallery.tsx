import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import "react-dropzone/examples/theme.css";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import { useDropzone } from "react-dropzone";
import { useAppDispatch } from "@/app/redux/hooks";
import {
  errorSnackbar,
  successSnackbar,
} from "@/app/redux/features/snackbarSlice";

import { useUploadImageMutation } from "@/app/redux/services/imageApiSlice";
import { useParams, useSearchParams } from "next/navigation";
import { useGetCollectionQuery } from "@/app/redux/services/collectionApiSlice";
import { UserActions } from "@/classes/UserActions";
import { useSession } from "next-auth/react";
import {
  useAddSubCategoryPhotoMutation,
  useGetSubcategoryQuery,
  useRemoveSubCategoryPhotoMutation,
} from "@/app/redux/services/subcategoryApiSlice";

const SubCategoryItemsGallery = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const params = useParams();
  const theme = useTheme();
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));

  const collectionId = String(params.collectionId);
  const subcategoryId = searchParams.get("subcategoryId");

  const { data: collection } = useGetCollectionQuery({ collectionId });
  const { data: subCategory } = useGetSubcategoryQuery({
    collectionId,
    subcategoryId: subcategoryId ?? "",
  });

  const userActions = new UserActions(session, collection);

  const [uploadImage] = useUploadImageMutation();
  const [addPhoto] = useAddSubCategoryPhotoMutation();
  const [removePhoto] = useRemoveSubCategoryPhotoMutation();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
    onDropAccepted(files, event) {
      if (!subcategoryId) return;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = async () => {
        if (reader.result) {
          try {
            let imageURL;

            const { url } = await uploadImage(files[0]).unwrap();
            imageURL = url.split("?")[0];

            await addPhoto({
              collectionId,
              subCategoryId: subcategoryId,
              image: imageURL,
            }).unwrap();
            dispatch(
              successSnackbar({ message: "Successfully uploaded image" })
            );
          } catch (error) {
            dispatch(errorSnackbar({ message: "Failed to upload image" }));
          }
        } else {
          console.error('"Failed converting to base64"');
          dispatch(errorSnackbar({ message: "Failed converting to base64" }));
        }
      };
    },
  });

  const handleRemovePhoto = async (photoId: string) => {
    if (!subcategoryId) return;
    try {
      await removePhoto({
        collectionId,
        subCategoryId: subcategoryId,
        photoId,
      }).unwrap();
      dispatch(successSnackbar({ message: "Successfully uploaded image" }));
    } catch (error) {
      dispatch(errorSnackbar({ message: "Failed remove image" }));
    }
  };

  return (
    <Grid container display={"flex"} justifyContent={"center"}>
      <Grid item xs={lgSize ? 12 : 10}>
        <section className="container">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>
              Drag drop image for you categorie here, or click to select file
            </p>
          </div>
        </section>
        {subCategory && (
          <ImageList
            sx={{ width: "100%", height: 900 }}
            variant="quilted"
            cols={lgSize ? 1 : 3}
            gap={20}
          >
            {subCategory.photos.map((item) => (
              <ImageListItem
                key={item.image}
                sx={{
                  "& .MuiImageListItem-img": {
                    height: "unset",
                  },
                }}
              >
                <img
                  srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.image}?w=248&fit=crop&auto=format`}
                  alt={item.image}
                  loading="lazy"
                  style={{ cursor: "pointer" }}
                  onClick={() => window.open(item.image)}
                />
                <Grid
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                >
                  <ImageListItemBar
                    subtitle={<span>by: {item.author}</span>}
                    position="below"
                  />
                  {userActions.isAuthorOrOwnerOrPhotoOwner(item) && (
                    <DeleteOutlineIcon
                      color="warning"
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleRemovePhoto(item.id)}
                    />
                  )}
                </Grid>
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Grid>
    </Grid>
  );
};

export default SubCategoryItemsGallery;
