import { v4 as uuid } from "uuid";
import { prisma } from "../../server/db/client";
import { AddCommentDto } from "../dto/categoryItems/AddCommentDto";
import { CreateSubSubCategoryDto } from "../dto/subSubCategory/CreateSubSubCategoryDto";
import { Notes } from "@prisma/client";

export class SubSubCategory {
  static async getById(subSubCategoryId: string) {
    return await prisma.subSubCategory.findFirst({
      where: { id: subSubCategoryId },
    });
  }

  static async getBySubCategoryId(subCategoryId: string) {
    return await prisma.subSubCategory.findMany({
      where: { subCategoryId: subCategoryId },
    });
  }

  static async getBySubSubCategoryId(subSubCategoryId: string) {
    return await prisma.categoryItems.findMany({
      where: { subSubCategoryId: subSubCategoryId },
    });
  }

  static async create(createSubSubCategoryDto: CreateSubSubCategoryDto) {
    const { title, image, subCategoryId } = createSubSubCategoryDto;
    return await prisma.subSubCategory.create({
      data: {
        title,
        image,
        subCategory: { connect: { id: subCategoryId } },
      },
    });
  }

  static async addNote(addCommentDto: AddCommentDto) {
    const { id, author, userId, comment } = addCommentDto;
    return await prisma.subSubCategory.update({
      where: { id },
      data: {
        notes: {
          push: [
            {
              id: uuid(),
              author,
              userId,
              comment,
            },
          ],
        },
      },
    });
  }

  static async removeNote(subsubcategoryId: string, updatedNotes: Notes[]) {
    return await prisma.subSubCategory.update({
      where: { id: subsubcategoryId },
      data: {
        notes: updatedNotes,
      },
    });
  }

  static async delete(subsubcategoryId: string) {
    return await prisma.subSubCategory.delete({
      where: {
        id: subsubcategoryId,
      },
    });
  }
}
