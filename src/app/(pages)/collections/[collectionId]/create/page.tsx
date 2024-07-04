"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch } from "@/app/redux/hooks";
import { errorSnackbar } from "@/app/redux/features/snackbarSlice";
import "react-dropzone/examples/theme.css";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import TextField from "@mui/material/TextField";

import BackButton from "@/components/BackButton/BackButton";
import { useUploadImageMutation } from "@/app/redux/services/imageApiSlice";
import { useCreateCategoryMutation } from "@/app/redux/services/categoriesApiSlice";
import { useCreateSubcategoryMutation } from "@/app/redux/services/subcategoryApiSlice";
import { useCreateSubSubCategoryMutation } from "@/app/redux/services/subsubcategoryApiSlice";

const CreateCategoryPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));

  const collectionId = String(params.collectionId);
  const categoryId = searchParams.get("categoryId");
  const subcategoryId = searchParams.get("subcategoryId");
  const categoryExists = searchParams.get("categoryExists");
  const categoryItemExists = searchParams.get("categoryItemExists");

  const dispatch = useAppDispatch();
  const [uploadImage] = useUploadImageMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [createSubcategory] = useCreateSubcategoryMutation();
  const [createSubSubcategory] = useCreateSubSubCategoryMutation();

  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<string>("");
  const [filesToUpload, setFilesToUpload] = useState<File>();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
    onDropAccepted(files, event) {
      const reader = new FileReader();
      setFilesToUpload(files[0]);
      reader.readAsDataURL(files[0]);

      reader.onload = () => {
        if (reader.result) {
          setFile(reader.result as string);
        } else {
          console.error('"Failed converting to base64"');
          dispatch(errorSnackbar({ message: "Failed converting to base64" }));
        }
      };
    },
  });

  const handleCreate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!filesToUpload) return;
    try {
      const { url } = await uploadImage(filesToUpload).unwrap();

      const imageURL = url.split("?")[0];
      if (subcategoryId) {
        await createSubSubcategory({
          collectionId,
          subCategoryId: subcategoryId,
          title,
          imageURL,
        }).unwrap();
        router.push(
          `/collections/${collectionId}/${categoryId}?subcategoryId=${subcategoryId}`
        );
      } else if (categoryId) {
        await createSubcategory({
          collectionId,
          categoryId,
          title,
          imageURL,
        }).unwrap();
        router.push(`/collections/${collectionId}/${categoryId}`);
      } else {
        await createCategory({ collectionId, title, imageURL }).unwrap();
        router.push(`/collections/${collectionId}`);
      }
    } catch (error) {
      dispatch(errorSnackbar({ message: "Failed to upload image" }));
    }
  };

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <>
      <BackButton
        path={
          categoryItemExists && categoryId && subcategoryId
            ? `/collections/${collectionId}/${categoryId}?subcategoryId=${subcategoryId}`
            : categoryExists && categoryId
            ? `/collections/${collectionId}/${categoryId}`
            : subcategoryId
            ? `/collections/${collectionId}/${categoryId}/create?subcategoryId=${subcategoryId}`
            : categoryId
            ? `/collections/${collectionId}/${categoryId}/create`
            : `/collections/${collectionId}`
        }
      />

      <Grid container mt={4} justifyContent={"center"}>
        <Grid item xs={lgSize ? 12 : 10}>
          <Grid pb={5} display={"flex"} justifyContent={"space-between"}>
            <Grid item xs={lgSize ? 12 : 5}>
              <TextField
                type="text"
                value={title}
                label="Title"
                fullWidth
                variant="standard"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
          </Grid>
          <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>
                Drag drop image for you categorie here, or click to select file
              </p>
            </div>
            <aside>{acceptedFiles.length > 0 && <h4>File: {files}</h4>}</aside>
          </section>
          {file && (
            <ImageList
              cols={1}
              sx={{
                pt: lgSize ? 5 : 10,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid item xs={lgSize ? 12 : 6} key={"title"}>
                <ImageListItem
                  sx={{
                    maxHeight: 300,
                    textAlign: "center",
                  }}
                >
                  <Image
                    alt={file}
                    width={500}
                    height={300}
                    src={file ?? ""}
                    loading="eager"
                    quality={80}
                    style={{
                      overflow: "hidden",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {title && acceptedFiles.length > 0 && (
                    <ImageListItemBar title={title} />
                  )}
                </ImageListItem>
              </Grid>
            </ImageList>
          )}
          <Button
            sx={{
              position: "fixed",
              bottom: lgSize ? "24px" : "60px",
              right: lgSize ? "24px" : "60px",
            }}
            onClick={handleCreate}
          >
            Create <ArrowRightIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateCategoryPage;
