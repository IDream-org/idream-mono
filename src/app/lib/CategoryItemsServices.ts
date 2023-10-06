import { NextRequest, NextResponse } from "next/server";
import authorOrIncludedUserAuthorize from "../middlewares/authorOrIncludedUserAuthorize";
import { CategoryItem } from "../providers/CategoryItems";
import { RequestValidationError } from "../models/RequestValidationError";
import isNotMemberAuthorize from "../middlewares/isNotMemberAuthorize";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { Collections } from "../providers/Collections";
import { NotAuthorizedError } from "../models/NotAuthorizedError";

const CategoryItemsServices = {
  getCategoryItemsByCategoryId: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const categoryId = request.nextUrl.searchParams.get("categoryId");

      if (!categoryId) {
        return new RequestValidationError().send();
      }

      const category = await CategoryItem.getByCategoryId(categoryId);
      return NextResponse.json(category?.items);
    }
  ),

  getCategoryItemsById: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const categoryId = request.nextUrl.searchParams.get("categoryId");
      const categoryItemId = request.nextUrl.searchParams.get("categoryItemId");

      if (!categoryId || !categoryItemId) {
        return new RequestValidationError().send();
      }

      const categoryItem = await CategoryItem.getByCategoryAndItemId(
        categoryId,
        categoryItemId
      );
      return NextResponse.json(categoryItem);
    }
  ),

  createCategoryItem: isNotMemberAuthorize(async (request: NextRequest) => {
    const {
      title,
      image,
      video,
      description,
      subtitle,
      rating,
      icons,
      details,
      comments,
      itemDesign,
    } = await request.json();
    const categoryId = request.nextUrl.searchParams.get("categoryId");
    const categoryItemId = request.nextUrl.searchParams.get("categoryItemId");

    if (
      !categoryId ||
      !title ||
      !image ||
      !description ||
      !subtitle ||
      !itemDesign
    ) {
      return new RequestValidationError().send();
    }

    if (!categoryItemId) {
      const savedCategoryItem = await CategoryItem.createItem({
        categoryId,
        title,
        image,
        video,
        description,
        subtitle,
        rating,
        icons,
        details,
        comments,
        itemDesign,
      });
      return NextResponse.json(savedCategoryItem);
    } else {
      const savedCategoryItem = await CategoryItem.updateItemById({
        categoryItemId,
        title,
        image,
        video,
        description,
        subtitle,
        rating,
        icons,
        details,
        comments,
      });
      return NextResponse.json(savedCategoryItem);
    }
  }),

  createSubCategoryItem: isNotMemberAuthorize(async (request: NextRequest) => {
    const {
      title,
      image,
      video,
      description,
      subtitle,
      rating,
      icons,
      details,
      comments,
      itemDesign,
    } = await request.json();
    const categoryId = request.nextUrl.searchParams.get("categoryId");
    const subCategoryId = request.nextUrl.searchParams.get("subcategoryId");
    const categoryItemId = request.nextUrl.searchParams.get("categoryItemId");

    if (
      !categoryId ||
      !subCategoryId ||
      !title ||
      !image ||
      !description ||
      !subtitle ||
      !itemDesign
    ) {
      return new RequestValidationError().send();
    }

    if (!categoryItemId) {
      const savedCategoryItem = await CategoryItem.createSubCategoryItem({
        categoryId,
        subCategoryId,
        title,
        image,
        video,
        description,
        subtitle,
        rating,
        icons,
        details,
        comments,
        itemDesign,
      });
      return NextResponse.json(savedCategoryItem);
    } else {
      const savedCategoryItem = await CategoryItem.updateItemById({
        categoryItemId,
        title,
        image,
        video,
        description,
        subtitle,
        rating,
        icons,
        details,
        comments,
      });
      return NextResponse.json(savedCategoryItem);
    }
  }),

  createSubSubCategoryItem: isNotMemberAuthorize(
    async (request: NextRequest) => {
      const {
        title,
        image,
        video,
        description,
        subtitle,
        rating,
        icons,
        details,
        comments,
        itemDesign,
      } = await request.json();
      const categoryId = request.nextUrl.searchParams.get("categoryId");
      const subCategoryId = request.nextUrl.searchParams.get("subcategoryId");
      const subSubCategoryId =
        request.nextUrl.searchParams.get("subsubcategoryId");
      const categoryItemId = request.nextUrl.searchParams.get("categoryItemId");

      if (
        !categoryId ||
        !subCategoryId ||
        !subSubCategoryId ||
        !title ||
        !image ||
        !description ||
        !subtitle ||
        !itemDesign
      ) {
        return new RequestValidationError().send();
      }

      if (!categoryItemId) {
        const savedCategoryItem = await CategoryItem.createSubSubCategoryItem({
          categoryId,
          subCategoryId,
          subSubCategoryId,
          title,
          image,
          video,
          description,
          subtitle,
          rating,
          icons,
          details,
          comments,
          itemDesign,
        });
        return NextResponse.json(savedCategoryItem);
      } else {
        const savedCategoryItem = await CategoryItem.updateItemById({
          categoryItemId,
          title,
          image,
          video,
          description,
          subtitle,
          rating,
          icons,
          details,
          comments,
        });
        return NextResponse.json(savedCategoryItem);
      }
    }
  ),

  addCategoryItemComment: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const { comment } = await request.json();
      const session = await getServerSession(authOptions);
      const categoryItemId = request.nextUrl.searchParams.get("categoryItemId");

      if (!categoryItemId || !comment) {
        return new RequestValidationError().send();
      }

      const updatedCategoryItem = await CategoryItem.addComment({
        id: categoryItemId,
        author: `${session!.user.firstName} ${session!.user.lastName}`,
        userId: session!.user.id,
        comment,
      });

      return NextResponse.json(updatedCategoryItem);
    }
  ),

  addCategoryItemNote: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const { comment } = await request.json();
      const session = await getServerSession(authOptions);
      const categoryItemId = request.nextUrl.searchParams.get("categoryItemId");

      if (!categoryItemId || !comment) {
        return new RequestValidationError().send();
      }

      const updatedCategoryItem = await CategoryItem.addNote({
        id: categoryItemId,
        author: `${session!.user.firstName} ${session!.user.lastName}`,
        userId: session!.user.id,
        comment,
      });

      return NextResponse.json(updatedCategoryItem);
    }
  ),

  removeCategoryItemComment: async (request: NextRequest) => {
    const { commentId } = await request.json();
    const session = await getServerSession(authOptions);
    const categoryItemId = request.nextUrl.searchParams.get("categoryItemId");
    const collectionId = request.nextUrl.searchParams.get("collectionId");

    if (!categoryItemId || !commentId) {
      return new RequestValidationError().send();
    }

    const collection = await Collections.getByCollectionId(collectionId!);
    const categoryItem = await CategoryItem.getById(categoryItemId);

    const commentToRemove = categoryItem?.comments.find(
      (comment) => comment.id === commentId
    );

    if (!commentToRemove) {
      return new RequestValidationError().send();
    }

    if (
      !session?.user ||
      (collection?.authorId !== session?.user.id &&
        !collection?.users.some(
          (userSome) =>
            userSome.userId === session?.user.id &&
            commentToRemove.id !== session.user.id
        ))
    ) {
      return new NotAuthorizedError().send();
    }

    const updatedComments = categoryItem?.comments.filter(
      (comment) => comment.id !== commentToRemove.id
    );

    const updatedCategoryItem = await CategoryItem.removeComment(
      categoryItemId,
      updatedComments || []
    );

    return NextResponse.json(updatedCategoryItem);
  },

  removeCategoryItemNote: async (request: NextRequest) => {
    const { noteId } = await request.json();
    const session = await getServerSession(authOptions);
    const categoryItemId = request.nextUrl.searchParams.get("categoryItemId");
    const collectionId = request.nextUrl.searchParams.get("collectionId");

    if (!categoryItemId || !noteId) {
      return new RequestValidationError().send();
    }

    const collection = await Collections.getByCollectionId(collectionId!);
    const categoryItem = await CategoryItem.getById(categoryItemId);

    const noteToRemove = categoryItem?.notes.find((note) => note.id === noteId);

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

    const updateNotes = categoryItem?.notes.filter(
      (comment) => comment.id !== noteToRemove.id
    );

    const updatedCategoryItem = await CategoryItem.removeNote(
      categoryItemId,
      updateNotes || []
    );

    return NextResponse.json(updatedCategoryItem);
  },

  addCategoryItemPhoto: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const { image } = await request.json();
      const session = await getServerSession(authOptions);
      const categoryItemId = request.nextUrl.searchParams.get("categoryItemId");

      if (!categoryItemId || !image) {
        return new RequestValidationError().send();
      }

      const updatedCategoryItem = await CategoryItem.addPhoto({
        id: categoryItemId,
        author: `${session!.user.firstName} ${session!.user.lastName}`,
        userId: session!.user.id,
        image,
      });

      return NextResponse.json(updatedCategoryItem);
    }
  ),

  removeCategoryItemPhoto: async (request: NextRequest) => {
    const { photoId } = await request.json();
    const session = await getServerSession(authOptions);
    const categoryItemId = request.nextUrl.searchParams.get("categoryItemId");
    const collectionId = request.nextUrl.searchParams.get("collectionId");

    if (!categoryItemId || !photoId) {
      return new RequestValidationError().send();
    }

    const collection = await Collections.getByCollectionId(collectionId!);
    const categoryItem = await CategoryItem.getById(categoryItemId);

    const photoToRemove = categoryItem?.photos.find(
      (photo) => photo.id === photoId
    );

    if (!photoToRemove) {
      return new RequestValidationError().send();
    }

    if (
      !session?.user ||
      (collection?.authorId !== session?.user.id &&
        !collection?.users.some(
          (userSome) =>
            userSome.userId === session?.user.id &&
            photoToRemove.id !== session.user.id
        ))
    ) {
      return new NotAuthorizedError().send();
    }

    const updatedPhotos = categoryItem?.photos.filter(
      (photo) => photo.id !== photoToRemove.id
    );

    const updatedCategoryItem = await CategoryItem.removePhoto(
      categoryItemId,
      updatedPhotos || []
    );

    return NextResponse.json(updatedCategoryItem);
  },

  updateCategoryItemToDone: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const { done } = await request.json();
      const categoryItemId = request.nextUrl.searchParams.get("categoryItemId");

      if (!categoryItemId) {
        return new RequestValidationError().send();
      }
      const updatedCategoryItem = await CategoryItem.updateToDone(
        categoryItemId,
        done
      );

      return NextResponse.json(updatedCategoryItem);
    }
  ),

  deleteCategoryItem: isNotMemberAuthorize(async (request: NextRequest) => {
    const categoryItemId = request.nextUrl.searchParams.get("categoryItemId");

    if (!categoryItemId) {
      return new RequestValidationError().send();
    }

    const deletedCategoryItem = await CategoryItem.deleteItem(categoryItemId);
    return NextResponse.json(deletedCategoryItem);
  }),
};

export const {
  getCategoryItemsByCategoryId,
  getCategoryItemsById,
  createCategoryItem,
  createSubCategoryItem,
  createSubSubCategoryItem,
  addCategoryItemComment,
  addCategoryItemNote,
  removeCategoryItemComment,
  removeCategoryItemNote,
  addCategoryItemPhoto,
  removeCategoryItemPhoto,
  updateCategoryItemToDone,
  deleteCategoryItem,
} = CategoryItemsServices;
