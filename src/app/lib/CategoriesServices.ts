import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

import { Categories } from "../providers/Categories";
import { RequestValidationError } from "../models/RequestValidationError";
import authorOrIncludedUserAuthorize from "../middlewares/authorOrIncludedUserAuthorize";
import authorRoleAuthorize from "../middlewares/authorRoleAuthorize";
import { Collections } from "../providers/Collections";
import { NotAuthorizedError } from "../models/NotAuthorizedError";

const CollectionsServices = {
  getCategoriesByCollectionId: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const collectionId = request.nextUrl.searchParams.get("collectionId");
      if (!collectionId) {
        return new RequestValidationError().send();
      }

      const categories = await Categories.getByCollectionId(collectionId);
      return NextResponse.json(categories);
    }
  ),
  getCategoryById: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const categoryId = request.nextUrl.searchParams.get("categoryId");
      if (!categoryId) {
        return new RequestValidationError().send();
      }

      const categories = await Categories.getByCategoryId(categoryId);
      return NextResponse.json(categories);
    }
  ),
  createCategory: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const { title, image } = await request.json();
      const session = await getServerSession(authOptions);
      const collectionId = request.nextUrl.searchParams.get("collectionId");

      if (!title || !image || !collectionId) {
        return new RequestValidationError().send();
      }

      const savedCategory = await Categories.createCollection({
        title,
        image,
        userId: session!.user.id,
        collectionId,
      });

      return NextResponse.json(savedCategory);
    }
  ),
  addCategoryNote: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const { comment } = await request.json();
      const session = await getServerSession(authOptions);
      const categoryId = request.nextUrl.searchParams.get("categoryId");

      if (!categoryId || !comment) {
        return new RequestValidationError().send();
      }

      const updatedCategoryItem = await Categories.addNote({
        id: categoryId,
        author: `${session!.user.firstName} ${session!.user.lastName}`,
        userId: session!.user.id,
        comment,
      });

      return NextResponse.json(updatedCategoryItem);
    }
  ),
  removeCategoryNote: async (request: NextRequest) => {
    const { noteId } = await request.json();
    const session = await getServerSession(authOptions);
    const categoryId = request.nextUrl.searchParams.get("categoryId");
    const collectionId = request.nextUrl.searchParams.get("collectionId");

    if (!categoryId || !noteId) {
      return new RequestValidationError().send();
    }

    const collection = await Collections.getByCollectionId(collectionId!);
    const category = await Categories.getByCategoryId(categoryId);

    const noteToRemove = category?.notes.find((note) => note.id === noteId);

    if (!noteToRemove) {
      return new RequestValidationError().send();
    }

    if (
      !session?.user ||
      (collection?.authorId !== session?.user.id &&
        !collection?.users.some(
          (userSome) =>
            userSome.userId === session?.user.id &&
            noteToRemove.id !== session.user.id
        ))
    ) {
      return new NotAuthorizedError().send();
    }

    const updateNotes = category?.notes.filter(
      (comment) => comment.id !== noteToRemove.id
    );

    const updatedCategoryItem = await Categories.removeNote(
      categoryId,
      updateNotes || []
    );

    return NextResponse.json(updatedCategoryItem);
  },
  deleteCtegoryById: authorRoleAuthorize(async (request: NextRequest) => {
    const categoryId = request.nextUrl.searchParams.get("categoryId");

    if (!categoryId) {
      return new RequestValidationError().send();
    }

    const deletedCategory = await Categories.deleteCategoryById(categoryId);

    return NextResponse.json(deletedCategory);
  }),
};

export const {
  getCategoriesByCollectionId,
  getCategoryById,
  createCategory,
  addCategoryNote,
  removeCategoryNote,
  deleteCtegoryById,
} = CollectionsServices;
