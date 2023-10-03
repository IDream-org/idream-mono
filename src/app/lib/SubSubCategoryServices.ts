import { NextRequest, NextResponse } from "next/server";
import isNotMemberAuthorize from "../middlewares/isNotMemberAuthorize";
import { RequestValidationError } from "../models/RequestValidationError";
import { SubSubCategory } from "../providers/SubSubCategory";
import authorOrIncludedUserAuthorize from "../middlewares/authorOrIncludedUserAuthorize";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

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
  deleteSubSubCategory,
} = SubSubCategoryServices;
