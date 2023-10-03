"use client";
import React from "react";
import { useParams } from "next/navigation";

import WrapperComponent from "@/components/WrapperComponent/WrapperComponent";
import { useGetSubcategoriesQuery } from "@/app/redux/services/subcategoryApiSlice";
import SubCategoryPage from "./SubCategoryPage";
import CategoryItemsPage from "./CategoryItemsPage";

const CategoriesData = () => {
  const params = useParams();

  const collectionId = String(params.collectionId);
  const categoryId = String(params.categoryId);

  const {
    data: subcategory,
    isLoading,
    error,
  } = useGetSubcategoriesQuery({
    collectionId,
    categoryId,
  });

  const renderCategory = () => {
    if (subcategory && subcategory.length > 0) {
      return <SubCategoryPage />;
    }

    return <CategoryItemsPage />;
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
