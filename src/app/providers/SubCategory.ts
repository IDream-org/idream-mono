import { v4 as uuid } from "uuid";
import { prisma } from "../../server/db/client";
import { AddCommentDto } from "../dto/categoryItems/AddCommentDto";
import { CreateSubCategoryDto } from "../dto/subCategory.ts/CreateSubCategoryDto";

export class SubCategory {
  static async getByCategoryId(categoryId: string) {
    return await prisma.subCategory.findMany({
      where: {
        categoryId: categoryId,
      },
    });
  }

  static async getById(subcategoryId: string) {
    return await prisma.subCategory.findFirst({
      where: {
        id: subcategoryId,
      },
    });
  }

  static async getBySubCategoryId(subcategoryId: string) {
    return await prisma.categoryItems.findMany({
      where: {
        subCategoryId: subcategoryId,
      },
    });
  }

  static async create(createSubCategoryDto: CreateSubCategoryDto) {
    const { title, image, categoryId } = createSubCategoryDto;
    return await prisma.subCategory.create({
      data: {
        title,
        image,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  static async addNote(addCommentDto: AddCommentDto) {
    const { id, author, userId, comment } = addCommentDto;
    return await prisma.subCategory.update({
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

  static async delete(subCategoryId: string) {
    return await prisma.subCategory.delete({
      where: {
        id: subCategoryId,
      },
    });
  }
}
