import React from "react";
import { $Enums, ItemDesign } from "@prisma/client";
import { useParams, useSearchParams } from "next/navigation";

import Grid from "@mui/material/Grid";

import MultipleSkeletons from "@/components/MultipleSkeletons/MultipleSkeletons";
import SingleSkeleton from "@/components/SingleSkeleton/SingleSkeleton";
import BackButton from "@/components/BackButton/BackButton";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface SelectItemDesignProps {
  setItemDesign: React.Dispatch<
    React.SetStateAction<$Enums.ItemDesign | undefined>
  >;
}

const SelectItemDesign: React.FC<SelectItemDesignProps> = ({
  setItemDesign,
}) => {
  const params = useParams();

  const searchParams = useSearchParams();
  const collectionId = params.collectionId;
  const categoryId = params.categoryId;
  const categoryItemId = searchParams.get("categoryItemId");
  const categoryItemExists = searchParams.get("categoryItemExists");
  const subcategoryId = searchParams.get("subcategoryId");
  const subsubcategoryId = searchParams.get("subsubcategoryId");
  return (
    <>
      <BackButton
        path={
          categoryItemExists && categoryId && subcategoryId
            ? `/collections/${collectionId}/${categoryId}?subcategoryId=${subcategoryId}`
            : subsubcategoryId
            ? `/collections/${collectionId}/${categoryId}?subcategoryId=${subcategoryId}&subsubcategoryId=${subsubcategoryId}`
            : subcategoryId
            ? `/collections/${collectionId}/${categoryId}/create?subcategoryId=${subcategoryId}`
            : categoryItemId
            ? `/collections/${collectionId}/${categoryId}/${categoryItemId}`
            : categoryItemExists
            ? `/collections/${collectionId}/${categoryId}/`
            : `/collections/${collectionId}/${categoryId}/create`
        }
      />
      <Grid container mt={4} justifyContent={"center"}>
        <Grid container justifyContent={"space-evenly"} xs={10}>
          <Card sx={{ position: "relative", minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 16, fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
              >
                Simple
              </Typography>
              <SingleSkeleton />
            </CardContent>
            <CardActions>
              <Button
                sx={{ position: "absolute", bottom: 0 }}
                onClick={() => setItemDesign(ItemDesign.Simple)}
                size="small"
              >
                Select
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ position: "relative", minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 16, fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
              >
                Standard
              </Typography>
              <MultipleSkeletons />
            </CardContent>
            <CardActions>
              <Button
                sx={{ position: "absolute", bottom: 0 }}
                onClick={() => setItemDesign(ItemDesign.Advanced)}
                size="small"
              >
                Select
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default SelectItemDesign;
