"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMediaQuery, useTheme } from "@mui/material";
import { Categories, CategoryItems, Collections, Notes } from "@prisma/client";

import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ImageList from "@mui/material/ImageList";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ImageListItem from "@mui/material/ImageListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import { useGetAllCategoryItemQuery } from "@/app/redux/services/categoryItemApiSlice";
import { useGetUsersQuery } from "@/app/redux/services/usersApiSlice";
import CenterLoading from "@/components/CenterLoading/CenterLoading";

interface Comments extends Notes {
  item: string;
  itemId: string;
  collectionId: string;
  categoryId: string;
  subCategoryId: string | null;
  subSubCategoryId: string | null;
}

interface CollectionsQuery extends Collections {
  categories: CategoryQuery[];
}

interface CategoryQuery extends Categories {
  items: CategoryItems[];
}

interface Items extends CategoryItems {
  collectionId: string;
}

const getAllItems = (data: CollectionsQuery[]) => {
  const items: Items[] = [];

  data.forEach((element) => {
    element.categories.forEach((category) => {
      category.items.forEach((item) => {
        const newItems = { ...item, collectionId: element.id };
        items.push(newItems);
      });
    });
  });

  return items;
};

const getAllComments = (data: Items[]) => {
  const comments: Comments[] = [];

  data.forEach((element) => {
    element.comments.forEach((comment) => {
      const newComments = {
        ...comment,
        item: element.title,
        itemId: element.id,
        collectionId: element.collectionId,
        categoryId: element.categoryId,
        subCategoryId: element.subCategoryId,
        subSubCategoryId: element.subSubCategoryId,
      };
      comments.push(newComments);
    });
  });

  return comments;
};

const DashboardPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));
  const { data: session } = useSession();

  const { data, isLoading } = useGetAllCategoryItemQuery({});
  const { data: usersQuery } = useGetUsersQuery({});

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Items[]>([]);
  const [comments, setComments] = useState<Comments[]>([]);

  useEffect(() => {
    if (!isLoading && data) {
      const items = getAllItems(data);
      const comments = getAllComments(items);
      setComments(comments);
      setItems(items);
      setLoading(false);
    }
  }, [isLoading, data]);

  return loading ? (
    <CenterLoading />
  ) : (
    <Grid container justifyContent={"center"}>
      <Grid item xs={lgSize ? 12 : 10}>
        <Grid
          pt={lgSize ? 0 : 5}
          pb={10}
          height={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"row"}
          sx={{
            borderRadius: "10px",
            height: "150px",
            position: "relative",
          }}
        >
          <Grid
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            height={"100%"}
          >
            <Typography fontSize={12}>
              {new Date().toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
            <Typography variant="h4">
              Welcome back {session?.user.firstName}!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={lgSize ? 12 : 10}
        display={"flex"}
        flexDirection={lgSize ? "column" : "row"}
        justifyContent={"space-between"}
        pt={lgSize ? 0 : 5}
      >
        <Grid item xs={lgSize ? 12 : 9}>
          <Typography>Recently Created Items</Typography>
          <Divider sx={{ pt: 1, mb: 4 }} />

          <Grid display={"flex"} justifyContent={"space-between"}>
            {items.length > 0 ? (
              items
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .slice(0, lgSize ? 2 : 3)
                .map((item) => (
                  <Grid
                    item
                    key={item.id}
                    xs={lgSize ? 5.8 : 3.8}
                    onClick={() => {
                      if (item.subSubCategoryId) {
                        router.push(
                          `collections/${item.collectionId}/${item.categoryId}/${item.id}?subcategoryId=${item.subCategoryId}&subsubcategoryId=${item.subSubCategoryId}`
                        );
                      } else if (item.subCategoryId) {
                        router.push(
                          `collections/${item.collectionId}/${item.categoryId}/${item.id}?subcategoryId=${item.subCategoryId}`
                        );
                      } else {
                        router.push(
                          `collections/${item.collectionId}/${item.categoryId}/${item.id}`
                        );
                      }
                    }}
                  >
                    <ImageListItem
                      sx={{
                        cursor: "pointer",
                        minHeight: lgSize ? 200 : 300,
                        maxHeight: lgSize ? 200 : 300,
                        transition: ".5s ease-in-out" /* Animation */,
                        "&:hover": {
                          opacity: ".5",
                        },
                      }}
                    >
                      <Image
                        height={lgSize ? 200 : 300}
                        width={lgSize ? 200 : 300}
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
                      />
                    </ImageListItem>
                  </Grid>
                ))
            ) : (
              <Typography textAlign={"center"} width={"100%"}>
                No Items Found
              </Typography>
            )}
          </Grid>
          <Typography sx={{ pt: 5 }}>Your Collections</Typography>
          <Divider sx={{ pt: 1, mb: 4 }} />

          {data && data.length > 0 ? (
            <ImageList
              gap={30}
              cols={lgSize ? 1 : 2}
              sx={{ justifyItems: "center" }}
            >
              {data
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .slice(0, lgSize ? 1 : 2)
                .map((collection) => (
                  <Grid
                    height={lgSize ? "200px" : "250px"}
                    item
                    xs={12}
                    width={"100%"}
                    key={collection.image}
                    sx={{ overflow: "hidden" }}
                    onClick={() => router.push(`/collections/${collection.id}`)}
                  >
                    <ImageListItem
                      style={{ height: lgSize ? "200px" : "250px" }}
                      sx={{
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Image
                        alt={collection.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        src={collection.image ?? ""}
                        loading="eager"
                        quality={80}
                        style={{
                          overflow: "hidden",
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                        }}
                      />
                      <ImageListItemBar title={collection.title} />
                    </ImageListItem>
                  </Grid>
                ))}
            </ImageList>
          ) : (
            <Typography textAlign={"center"} width={"100%"}>
              No Collections Found
            </Typography>
          )}
        </Grid>
        <Grid item pt={lgSize ? 4 : 0} xs={lgSize ? 12 : 2}>
          <Typography>New Comments</Typography>
          <Divider sx={{ pt: 1, mb: 2 }} />
          <Grid
            item
            display={"flex"}
            flexDirection={"column"}
            overflow={"auto"}
          >
            {comments
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .slice(0, lgSize ? 3 : 6)
              .map((itemComment, index) => {
                const user = usersQuery?.find(
                  (user) => user.id === itemComment.userId
                );
                return (
                  <>
                    <ListSubheader
                      sx={{
                        bgcolor: "background.paper",
                        height: "48px",
                        overflow: "hidden",
                      }}
                    >
                      {itemComment.item}
                    </ListSubheader>
                    <ListItem
                      key={index}
                      button
                      onClick={() => {
                        if (itemComment.subSubCategoryId) {
                          router.push(
                            `collections/${itemComment.collectionId}/${itemComment.categoryId}/${itemComment.itemId}?subcategoryId=${itemComment.subCategoryId}&subsubcategoryId=${itemComment.subSubCategoryId}`
                          );
                        } else if (itemComment.subCategoryId) {
                          router.push(
                            `collections/${itemComment.collectionId}/${itemComment.categoryId}/${itemComment.itemId}?subcategoryId=${itemComment.subCategoryId}`
                          );
                        } else {
                          router.push(
                            `collections/${itemComment.collectionId}/${itemComment.categoryId}/${itemComment.itemId}`
                          );
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt="Profile Picture"
                          src={user?.avatar ?? ""}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={itemComment.author}
                        secondary={itemComment.comment}
                      />
                    </ListItem>
                  </>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
