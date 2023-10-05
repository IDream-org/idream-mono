import { v4 as uuid } from "uuid";
import { prisma } from "../../server/db/client";
import { CreateCategoryDto } from "../dto/categories/CreateCategoryDto";
import { AddCommentDto } from "../dto/categoryItems/AddCommentDto";

export class Categories {
  static async getByCollectionId(collectionId: string) {
    return await prisma?.categories.findMany({
      where: {
        collectionsId: collectionId,
      },
    });
  }

  static async getByCategoryId(categoryId: string) {
    return await prisma.categories.findFirst({
      where: {
        id: categoryId,
      },
    });
  }

  static async createCollection(createCategoryDto: CreateCategoryDto) {
    const { title, image, userId, collectionId } = createCategoryDto;
    return await prisma.categories.create({
      data: {
        title,
        image,
        user: {
          connect: {
            id: userId,
          },
        },
        collections: {
          connect: {
            id: collectionId,
          },
        },
      },
    });
  }

  static async addNote(addCommentDto: AddCommentDto) {
    const { id, author, userId, comment } = addCommentDto;
    return await prisma.categories.update({
      where: { id: id },
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

  static async deleteCategoryById(categoryId: string) {
    return await prisma.categories.delete({
      where: { id: categoryId },
    });
  }
}
