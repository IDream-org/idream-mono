"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { CategoryItems, ItemDesign } from "@prisma/client";
import RenderItem from "@/components/RenderItem/RenderItem";
import { useAppDispatch } from "@/app/redux/hooks";
import {
  errorSnackbar,
  successSnackbar,
} from "@/app/redux/features/snackbarSlice";
import {
  useAddCategoryItemCommentMutation,
  useRemoveCategoryItemCommentMutation,
} from "@/app/redux/services/categoryItemApiSlice";
import RenderSimpleItem from "@/components/RenderSimpleItem/RenderSimpleItem";

interface DefaultPageProps {
  item: CategoryItems;
  setItems: (value: React.SetStateAction<CategoryItems>) => void;
}

const DefaultPage: React.FC<DefaultPageProps> = ({ item, setItems }) => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const collectionId = String(params.collectionId);

  const [addCategoryItemComment] = useAddCategoryItemCommentMutation();
  const [removeCategoryItemComment] = useRemoveCategoryItemCommentMutation();

  const [comment, setComment] = useState("");

  const handleAddComment = async () => {
    if (!comment || !item) return;

    try {
      const updatedCategoryItem = await addCategoryItemComment({
        collectionId,
        categoryItemId: item.id,
        comment,
      }).unwrap();
      setItems(updatedCategoryItem);
      dispatch(successSnackbar({ message: "Message added successfully" }));
      setComment("");
    } catch (error) {
      console.error("Failed adding comment");
      dispatch(errorSnackbar({ message: "Failed to update item" }));
    }
  };

  const handlRemoveComment = async (commentId: string) => {
    try {
      await removeCategoryItemComment({
        collectionId,
        categoryItemId: item.id,
        commentId,
      }).unwrap();
      dispatch(successSnackbar({ message: "Message removed successfully" }));
      setComment("");
    } catch (error) {
      console.error("Failed removing comment");
      dispatch(errorSnackbar({ message: "Failed to update item" }));
    }
  };

  return (
    <React.Fragment>
      {item.itemDesign === ItemDesign.Simple ? (
        <RenderSimpleItem item={item} />
      ) : (
        <RenderItem
          item={item || {}}
          comment={{
            value: comment,
            handleChange: setComment,
            handleAdd: handleAddComment,
            handleRemove: handlRemoveComment,
          }}
        />
      )}
    </React.Fragment>
  );
};

export default DefaultPage;
