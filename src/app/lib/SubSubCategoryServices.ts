import { NextRequest, NextResponse } from "next/server";
import isNotMemberAuthorize from "../middlewares/isNotMemberAuthorize";
import { RequestValidationError } from "../models/RequestValidationError";
import { SubSubCategory } from "../providers/SubSubCategory";
import authorOrIncludedUserAuthorize from "../middlewares/authorOrIncludedUserAuthorize";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { Collections } from "../providers/Collections";
import { NotAuthorizedError } from "../models/NotAuthorizedError";

const SubSubCategoryServices = {
  getSubSubCategoryById: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const subsubcategoryId =
        request.nextUrl.searchParams.get("subsubcategoryId");
      if (!subsubcategoryId) {
        return new RequestValidationError().send();
      }

      const subcategory = await SubSubCategory.getById(subsubcategoryId);
      return NextResponse.json(subcategory);
    }
  ),
  getSubSubCategoryBySubSubCategoryId: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const subsubcategoryId =
        request.nextUrl.searchParams.get("subsubcategoryId");
      if (!subsubcategoryId) {
        return new RequestValidationError().send();
      }

      const subcategory = await SubSubCategory.getBySubSubCategoryId(
        subsubcategoryId
      );
      return NextResponse.json(subcategory);
    }
  ),
  getSubSubCategory: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const subsubcategoryId =
        request.nextUrl.searchParams.get("subsubcategoryId");

      if (!subsubcategoryId) {
        return new RequestValidationError().send();
      }

      const savedSubcategory = await SubSubCategory.getBySubCategoryId(
        subsubcategoryId
      );
      return NextResponse.json(savedSubcategory);
    }
  ),
  createSubSubCategory: isNotMemberAuthorize(async (request: NextRequest) => {
    const { title, image } = await request.json();
    const subsubcategoryId =
      request.nextUrl.searchParams.get("subsubcategoryId");

    if (!subsubcategoryId || !title || !image) {
      return new RequestValidationError().send();
    }

    const savedSubcategory = await SubSubCategory.create({
      subCategoryId: subsubcategoryId,
      title,
      image,
    });
    return NextResponse.json(savedSubcategory);
  }),

  addSubSubCategoryNote: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const { comment } = await request.json();
      const session = await getServerSession(authOptions);
      const subsubcategoryId =
        request.nextUrl.searchParams.get("subsubcategoryId");

      if (!subsubcategoryId || !comment) {
        return new RequestValidationError().send();
      }

      const updatedCategoryItem = await SubSubCategory.addNote({
        id: subsubcategoryId,
        author: `${session!.user.firstName} ${session!.user.lastName}`,
        userId: session!.user.id,
        comment,
      });

      return NextResponse.json(updatedCategoryItem);
    }
  ),

  removeSubSubCategoryNote: async (request: NextRequest) => {
    const { noteId } = await request.json();
    const session = await getServerSession(authOptions);
    const subsubcategoryId =
      request.nextUrl.searchParams.get("subsubcategoryId");
    const collectionId = request.nextUrl.searchParams.get("collectionId");

    if (!subsubcategoryId || !noteId) {
      return new RequestValidationError().send();
    }

    const collection = await Collections.getByCollectionId(collectionId!);
    const subSubCategory = await SubSubCategory.getById(subsubcategoryId);

    const noteToRemove = subSubCategory?.notes.find(
      (note) => note.id === noteId
    );

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

    const updateNotes = subSubCategory?.notes.filter(
      (comment) => comment.id !== noteToRemove.id
    );

    const updatedCategoryItem = await SubSubCategory.removeNote(
      subsubcategoryId,
      updateNotes || []
    );

    return NextResponse.json(updatedCategoryItem);
  },

  addSubSubCategoryPhoto: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const { image } = await request.json();
      const session = await getServerSession(authOptions);
      const subsubcategoryId =
        request.nextUrl.searchParams.get("subsubcategoryId");

      if (!subsubcategoryId || !image) {
        return new RequestValidationError().send();
      }

      const updatedCategory = await SubSubCategory.addPhoto({
        id: subsubcategoryId,
        author: `${session!.user.firstName} ${session!.user.lastName}`,
        userId: session!.user.id,
        image,
      });

      return NextResponse.json(updatedCategory);
    }
  ),

  removeSubSubCategoryPhoto: async (request: NextRequest) => {
    const { photoId } = await request.json();
    const session = await getServerSession(authOptions);
    const subsubcategoryId =
      request.nextUrl.searchParams.get("subsubcategoryId");
    const collectionId = request.nextUrl.searchParams.get("collectionId");

    if (!subsubcategoryId || !photoId) {
      return new RequestValidationError().send();
    }

    const collection = await Collections.getByCollectionId(collectionId!);
    const category = await SubSubCategory.getById(subsubcategoryId);

    const photoToRemove = category?.photos.find(
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

    const updatedPhotos = category?.photos.filter(
      (photo) => photo.id !== photoToRemove.id
    );

    const updatedSubSubCategoryItem = await SubSubCategory.removePhoto(
      subsubcategoryId,
      updatedPhotos || []
    );

    return NextResponse.json(updatedSubSubCategoryItem);
  },

  deleteSubSubCategory: isNotMemberAuthorize(async (request: NextRequest) => {
    const subsubcategoryId =
      request.nextUrl.searchParams.get("subsubcategoryId");

    if (!subsubcategoryId) {
      return new RequestValidationError().send();
    }

    const savedSubcategory = await SubSubCategory.delete(subsubcategoryId);
    return NextResponse.json(savedSubcategory);
  }),
};

export const {
  getSubSubCategoryById,
  getSubSubCategoryBySubSubCategoryId,
  getSubSubCategory,
  createSubSubCategory,
  addSubSubCategoryNote,
  removeSubSubCategoryNote,
  addSubSubCategoryPhoto,
  removeSubSubCategoryPhoto,
  deleteSubSubCategory,
} = SubSubCategoryServices;
