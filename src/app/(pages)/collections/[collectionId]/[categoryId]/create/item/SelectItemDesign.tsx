import React from "react";
import { $Enums, ItemDesign } from "@prisma/client";
import { useParams, useSearchParams } from "next/navigation";

import Grid from "@mui/material/Grid";

import MultipleSkeletons from "@/components/MultipleSkeletons/MultipleSkeletons";
import SingleSkeleton from "@/components/SingleSkeleton/SingleSkeleton";
import BackButton from "@/components/BackButton/BackButton";

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
        <Grid item xs={10}>
          <SingleSkeleton onClick={() => setItemDesign(ItemDesign.Simple)} />
          <MultipleSkeletons
            onClick={() => setItemDesign(ItemDesign.Advanced)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SelectItemDesign;
