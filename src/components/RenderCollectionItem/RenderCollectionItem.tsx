"use client";
import React, { useEffect, useState } from "react";
import { CategoryItems } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import IconButton from "@mui/material/IconButton";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import SearchAutoComplete from "@/components/SearchAutoComplete/SearchAutoComplete";

import { RenderCollectionItemProps } from "./RenderCollectionItemProps";

const RenderCollectionItem: React.FC<RenderCollectionItemProps> = ({
  categoryItems,
  isLoading,
  path,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const mdSize = useMediaQuery(theme.breakpoints.down("md"));
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));
  const xlSize = useMediaQuery(theme.breakpoints.down("xl"));

  const [item, setItems] = useState<CategoryItems[]>([]);

  const extraLarge = xlSize ? 3 : 4;
  const largeImage = lgSize ? 2 : extraLarge;
  const getImageSize = () => (mdSize ? 1 : largeImage);

  useEffect(() => {
    !isLoading && setItems(categoryItems ?? []);
  }, [isLoading, categoryItems]);

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: string | null,
    reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<string> | undefined
  ) => {
    if (reason === "clear") {
      return setItems(categoryItems ?? []);
    } else {
      const filteredItems = categoryItems!.filter(
        (item) => item.title == value
      );
      setItems(filteredItems);
    }
  };

  return (
    <Grid container mt={4} justifyContent={"center"}>
      <Grid item xs={lgSize ? 12 : 10}>
        <Grid
          item
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          xs={12}
        >
          <SearchAutoComplete
            data={categoryItems || []}
            onChange={handleChange}
          />
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
                  onClick={() =>
                    router.push(
                      path
                        ? `${pathname}/${item.id}/${path}`
                        : `${pathname}/${item.id}`
                    )
                  }
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
  );
};

export default RenderCollectionItem;
