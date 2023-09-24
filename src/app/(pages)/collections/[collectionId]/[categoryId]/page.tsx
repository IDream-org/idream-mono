"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { CategoryItems, Roles } from "@prisma/client";
import Image from "next/image";

import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import Typography from "@mui/material/Typography";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import SearchAutoComplete from "@/components/SearchAutoComplete/SearchAutoComplete";

import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BasicDialog from "@/components/BasicDialog/BasicDialog";
import BasicSpeedDial from "@/components/BasicSpeedDial/BasicSpeedDial";
import WrapperComponent from "@/components/WrapperComponent/WrapperComponent";

import { useGetCollectionQuery } from "@/app/redux/services/collectionApiSlice";
import { useDeleteCategoryMutation } from "@/app/redux/services/categoriesApiSlice";
import { useGetCategoryItemsQuery } from "@/app/redux/services/categoryItemApiSlice";
import BackButton from "@/components/BackButton/BackButton";

const CategoriesData = () => {
  const { data: session } = useSession();
  const params = useParams();
  const theme = useTheme();
  const mdSize = useMediaQuery(theme.breakpoints.down("md"));
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));
  const xlSize = useMediaQuery(theme.breakpoints.down("xl"));

  const extraLarge = xlSize ? 3 : 4;
  const largeImage = lgSize ? 2 : extraLarge;
  const getImageSize = () => (mdSize ? 1 : largeImage);

  const collectionId = String(params.collectionId);
  const categoryId = String(params.categoryId);

  const router = useRouter();
  const pathname = usePathname();
  const { data: collection } = useGetCollectionQuery({ collectionId });
  const { data, isLoading, error } = useGetCategoryItemsQuery({
    collectionId,
    categoryId,
  });
  const [deleteCategory] = useDeleteCategoryMutation();

  const [item, setItems] = useState<CategoryItems[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const currentUser = collection?.users.find(
    (user) => user.userId === session?.user.id
  );

  useEffect(() => {
    !isLoading && setItems(data ?? []);
  }, [isLoading, data]);

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

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: string | null,
    reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<string> | undefined
  ) => {
    if (reason === "clear") {
      return setItems(data ?? []);
    } else {
      const filteredItems = data!.filter((item) => item.title == value);
      setItems(filteredItems);
    }
  };

  const actions = [
    {
      icon: (
        <AddIcon
          onClick={() =>
            router.push(`/collections/${collectionId}/${categoryId}/create`)
          }
        />
      ),
      name: "Create",
    },
    {
      icon: <DeleteOutlineIcon onClick={() => setOpenDialog(true)} />,
      name: "Delete",
    },
  ];

  const renderCategory = () => {
    if (!data || data.length === 0) {
      return (
        <>
          <BackButton path={`/collections/${collectionId}`} />
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
          {currentUser?.role !== Roles.Member && (
            <BasicSpeedDial actions={actions} />
          )}
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
        <Grid container mt={4} justifyContent={"center"}>
          <Grid item xs={lgSize ? 12 : 10}>
            <Grid
              item
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              xs={12}
            >
              <SearchAutoComplete data={data || []} onChange={handleChange} />
            </Grid>
            <Grid>
              <ImageList cols={getImageSize()} gap={10}>
                {item.map((item) => (
                  <Grid item key={item.id} xs={12}>
                    <ImageListItem
                      sx={{
                        cursor: "pointer",
                        minHeight: 300,
                        maxHeight: 300,
                        transition: ".5s ease-in-out" /* Animation */,
                        "&:hover": {
                          opacity: ".5",
                        },
                      }}
                      onClick={() => router.push(`${pathname}/${item.id}`)}
                    >
                      <Image
                        height={500}
                        width={500}
                        alt={item.image ?? ""}
                        src={item.image ?? ""}
                        quality={80}
                        style={{
                          width: "100%",
                          overflow: "hidden",
                          objectFit: "cover",
                          borderRadius: "20px",
                        }}
                      />
                      <ImageListItemBar
                        sx={{
                          textAlign: "center",
                          borderBottomLeftRadius: "20px",
                          borderBottomRightRadius: "20px",
                        }}
                        title={item.title}
                        actionIcon={
                          <IconButton sx={{ color: "#e0e0e0" }}>
                            {item.done ? (
                              <FavoriteIcon fontSize="medium" />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  </Grid>
                ))}
              </ImageList>
            </Grid>
          </Grid>
        </Grid>
        {currentUser?.role !== Roles.Member && (
          <BasicSpeedDial actions={actions} />
        )}
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
  };

  return (
    <WrapperComponent
      loading={isLoading}
      error={error}
      component={renderCategory()}
    />
  );
};

export default CategoriesData;
