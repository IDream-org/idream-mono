import { NextRequest, NextResponse } from "next/server";
import authorOrIncludedUserAuthorize from "../middlewares/authorOrIncludedUserAuthorize";
import { CategoryItem } from "../providers/CategoryItems";
import { RequestValidationError } from "../models/RequestValidationError";
import isNotMemberAuthorize from "../middlewares/isNotMemberAuthorize";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

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

      console.log(categoryItemId);
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
  updateCategoryItemToDone,
  deleteCategoryItem,
} = CategoryItemsServices;
