"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Typography, useTheme } from "@mui/material";
import "react-dropzone/examples/theme.css";

import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";

import Grid from "@mui/material/Grid";
import BackButton from "@/components/BackButton/BackButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

interface CreateCategoryItemPageProps {
  params: { categoryId: string; collectionId: string };
}

const CreateCategoryItemPage: React.FC<CreateCategoryItemPageProps> = ({
  params,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const theme = useTheme();
  const collectionId = params.collectionId;
  const categoryId = params.categoryId;
  const subcategoryId = searchParams.get("subcategoryId");
  const categoryItemId = searchParams.get("categoryItemId");
  const categoryItemExists = searchParams.get("categoryItemExists");
  const subsubcategoryId = searchParams.get("subsubcategoryId");

  return (
    <>
      <BackButton
        path={
          subcategoryId
            ? `/collections/${collectionId}/${categoryId}?subcategoryId=${subcategoryId}`
            : categoryItemId
            ? `/collections/${collectionId}/${categoryId}/${categoryItemId}`
            : categoryItemExists
            ? `/collections/${collectionId}/${categoryId}/`
            : `/collections/${collectionId}/${categoryId}`
        }
      />
      <Grid container justifyContent={"center"}>
        <Grid item xs={8} mt={4}>
          <Grid pt={10} item xs={12} display={"flex"} flexDirection={"row"}>
            <Grid item xs={6} textAlign={"center"}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography pb={3} variant="body2">
                    <FolderCopyIcon style={{ fontSize: "80px" }} />
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Sub Category
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                      router.push(
                        subcategoryId
                          ? `/collections/${collectionId}/create?categoryId=${categoryId}&subcategoryId=${subcategoryId}`
                          : `/collections/${collectionId}/create?categoryId=${categoryId}`
                      )
                    }
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={6} textAlign={"center"}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography pb={3} variant="body2">
                    <InsertDriveFileIcon style={{ fontSize: "80px" }} />
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Category Item
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                      router.push(
                        subcategoryId
                          ? `${pathname}/item?subcategoryId=${subcategoryId}`
                          : `${pathname}/item`
                      )
                    }
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateCategoryItemPage;
