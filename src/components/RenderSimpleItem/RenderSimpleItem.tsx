"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CategoryItems } from "@prisma/client";

import { useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { defaultImage } from "@/app/helpers/defaultImage";

export interface CategoriesItemsProps {
  item: Partial<CategoryItems>;
}

const RenderSimpleItem: React.FC<CategoriesItemsProps> = ({ item }) => {
  const theme = useTheme();
  const mdSize = useMediaQuery(theme.breakpoints.down("md"));
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));

  const largeGrid = lgSize ? 12 : 10;
  const largeGridSize = lgSize ? 10 : 8;
  const gridSize = mdSize ? 12 : largeGridSize;
  const flexDirection = lgSize ? "column" : "row";

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid
          item
          xs={gridSize}
          display={"flex"}
          flexDirection={flexDirection}
          justifyContent={"space-between"}
        >
          <Grid item xs={largeGrid}>
            <Grid>
              <Typography fontWeight={"bold"} variant="h4" mb={1}>
                {item.title} {`(${item.subtitle})`}
              </Typography>

              <Typography
                mt={4}
                mr={lgSize ? 0 : 8}
                mb={6}
                textAlign={"justify"}
              >
                {item.description}
              </Typography>
              <Grid
                item
                xs={largeGrid}
                width={"100%"}
                pt={lgSize ? 10 : 0}
                textAlign={lgSize ? "center" : "unset"}
              >
                {item.details &&
                  Object.keys(item.details).map((detail) => (
                    <Grid key={detail}>
                      <Typography mt={2} mb={1} fontWeight={"bold"}>
                        {detail}
                      </Typography>
                      {detail === "Link" ? (
                        <Link
                          href={(item as any).details[detail]}
                          target="blank"
                          style={{ textDecoration: "none" }}
                        >
                          {(item as any).details[detail]}
                        </Link>
                      ) : (
                        <Typography>{(item as any).details[detail]}</Typography>
                      )}
                      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item height={500} xs={largeGrid} overflow={"hidden"}>
            <Image
              height={0}
              width={0}
              alt={item.image || defaultImage}
              src={item.image || defaultImage}
              loading="eager"
              priority={true}
              quality={80}
              sizes="100vw"
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RenderSimpleItem;
