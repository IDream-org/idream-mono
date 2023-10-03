import React, { useEffect } from "react";
import RenderItem from "@/components/RenderItem/RenderItem";
import { CategoryItems } from "@prisma/client";

interface ReviewProps {
  data: Partial<CategoryItems>;
  setData: React.Dispatch<React.SetStateAction<Partial<CategoryItems>>>;
}

const Review: React.FC<ReviewProps> = ({ data, setData }) => {
  useEffect(() => {
    const total =
      ((data.rating?.expectations ?? 0) +
        (data.rating?.overall ?? 0) +
        (data.rating?.performance ?? 0) +
        (data.rating?.quality ?? 0) +
        (data.rating?.recommendation ?? 0)) /
      5;

    setData((prev) => ({
      ...prev,
      rating: { ...prev.rating!, total: Math.round(total * 2) / 2 },
    }));
  }, []);
  return <RenderItem item={data} />;
};

export default Review;
