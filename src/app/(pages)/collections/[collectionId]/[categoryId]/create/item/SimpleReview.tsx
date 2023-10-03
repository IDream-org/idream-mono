import React from "react";
import { CategoryItems } from "@prisma/client";
import RenderSimpleItem from "@/components/RenderSimpleItem/RenderSimpleItem";

interface SimpleReviewProps {
  data: Partial<CategoryItems>;
  setData: React.Dispatch<React.SetStateAction<Partial<CategoryItems>>>;
}

const SimpleReview: React.FC<SimpleReviewProps> = ({ data }) => {
  return <RenderSimpleItem item={data} />;
};

export default SimpleReview;
