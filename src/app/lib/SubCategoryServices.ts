import { NextRequest, NextResponse } from "next/server";
import authorOrIncludedUserAuthorize from "../middlewares/authorOrIncludedUserAuthorize";
import { RequestValidationError } from "../models/RequestValidationError";
import { SubCategory } from "../providers/SubCategory";
import isNotMemberAuthorize from "../middlewares/isNotMemberAuthorize";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

const SubCategoryServices = {
  getSubCategoryById: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const subcategoryId = request.nextUrl.searchParams.get("subcategoryId");

      if (!subcategoryId) {
        return new RequestValidationError().send();
      }

      const subcategory = await SubCategory.getById(subcategoryId);
      return NextResponse.json(subcategory);
    }
  ),

  getSubCategoryBySubCategoryId: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const subcategoryId = request.nextUrl.searchParams.get("subcategoryId");

      if (!subcategoryId) {
        return new RequestValidationError().send();
      }

      const subcategory = await SubCategory.getBySubCategoryId(subcategoryId);
      return NextResponse.json(subcategory);
    }
  ),

  getSubCategoryByCategoryId: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const categoryId = request.nextUrl.searchParams.get("categoryId");

      if (!categoryId) {
        return new RequestValidationError().send();
      }

      const subcategory = await SubCategory.getByCategoryId(categoryId);
      return NextResponse.json(subcategory);
    }
  ),

  createSubCategory: isNotMemberAuthorize(async (request: NextRequest) => {
    const { title, image } = await request.json();
    const categoryId = request.nextUrl.searchParams.get("categoryId");

    if (!categoryId || !title || !image) {
      return new RequestValidationError().send();
    }

    const savedSubcategory = await SubCategory.create({
      categoryId,
      title,
      image,
    });
    return NextResponse.json(savedSubcategory);
  }),

  addSubCategoryNote: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const { comment } = await request.json();
      const session = await getServerSession(authOptions);
      const subCategoryId = request.nextUrl.searchParams.get("subCategoryId");

      if (!subCategoryId || !comment) {
        return new RequestValidationError().send();
      }

      const updatedCategoryItem = await SubCategory.addNote({
        id: subCategoryId,
        author: `${session!.user.firstName} ${session!.user.lastName}`,
        userId: session!.user.id,
        comment,
      });

      return NextResponse.json(updatedCategoryItem);
    }
  ),

  deleteSubCategory: isNotMemberAuthorize(async (request: NextRequest) => {
    const subCategoryId = request.nextUrl.searchParams.get("subCategoryId");

    if (!subCategoryId) {
      return new RequestValidationError().send();
    }

    const savedSubcategory = await SubCategory.delete(subCategoryId);
    return NextResponse.json(savedSubcategory);
  }),
};

export const {
  getSubCategoryById,
  getSubCategoryBySubCategoryId,
  getSubCategoryByCategoryId,
  createSubCategory,
  addSubCategoryNote,
  deleteSubCategory,
} = SubCategoryServices;
