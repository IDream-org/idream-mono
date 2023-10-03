import { prisma } from "../../server/db/client";
import { AddCommentDto } from "../dto/categoryItems/AddCommentDto";
import { CreateCategoryItemDto } from "../dto/categoryItems/CreateCategoryItemDto";
import { CreateSubCategoryItemDto } from "../dto/categoryItems/CreateSubCategoryItemDto";
import { CreateSubSubCategoryItemDto } from "../dto/categoryItems/CreateSubSubCategoryItemDto";
import { UpdateCategoryItemDto } from "../dto/categoryItems/UpdateCategoryItemDto";

export class CategoryItem {
  static async getByCategoryId(categoryId: string) {
    return await prisma.categories.findFirst({
      where: {
        id: categoryId,
      },
      include: {
        items: true,
      },
    });
  }

  static async getByCategoryAndItemId(
    categoryId: string,
    categoryItemId: string
  ) {
    return await prisma.categoryItems.findFirst({
      where: {
        AND: [{ categoryId: categoryId }, { id: categoryItemId }],
      },
    });
  }

  static async createItem(createCategoryItemDto: CreateCategoryItemDto) {
    const {
      categoryId,
      title,
      image,
      description,
      rating,
      subtitle,
      icons,
      details,
      video,
      comments,
      itemDesign,
    } = createCategoryItemDto;
    return await prisma.categoryItems.create({
      data: {
        title,
        image,
        description,
        rating,
        subtitle,
        icons,
        details,
        video,
        comments,
        itemDesign,
        categories: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  static async createSubCategoryItem(
    createSubCategoryItemDto: CreateSubCategoryItemDto
  ) {
    const {
      categoryId,
      subCategoryId,
      title,
      image,
      description,
      rating,
      subtitle,
      icons,
      details,
      video,
      comments,
      itemDesign,
    } = createSubCategoryItemDto;
    return await prisma.categoryItems.create({
      data: {
        title,
        image,
        description,
        rating,
        subtitle,
        icons,
        details,
        video,
        comments,
        itemDesign,
        subCategory: {
          connect: {
            id: subCategoryId,
          },
        },
        categories: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  static async createSubSubCategoryItem(
    createSubSubCategoryItemDto: CreateSubSubCategoryItemDto
  ) {
    const {
      categoryId,
      subCategoryId,
      subSubCategoryId,
      title,
      image,
      description,
      rating,
      subtitle,
      icons,
      details,
      video,
      comments,
      itemDesign,
    } = createSubSubCategoryItemDto;
    return await prisma.categoryItems.create({
      data: {
        title,
        image,
        description,
        rating,
        subtitle,
        icons,
        details,
        video,
        comments,
        itemDesign,
        SubSubCategory: {
          connect: {
            id: subSubCategoryId,
          },
        },
        subCategory: {
          connect: {
            id: subCategoryId,
          },
        },
        categories: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  static async updateItemById(updateCategoryItemDto: UpdateCategoryItemDto) {
    const {
      categoryItemId,
      title,
      image,
      description,
      rating,
      subtitle,
      icons,
      details,
      video,
      comments,
    } = updateCategoryItemDto;
    return await prisma.categoryItems.update({
      where: { id: categoryItemId },
      data: {
        title,
        image,
        description,
        rating,
        subtitle,
        icons,
        details,
        video,
        comments,
      },
    });
  }

  static async addComment(addCommentDto: AddCommentDto) {
    const { id, author, userId, comment } = addCommentDto;
    return await prisma.categoryItems.update({
      where: { id: id },
      data: {
        comments: {
          push: [
            {
              author,
              userId,
              comment,
            },
          ],
        },
      },
    });
  }

  static async addNote(addCommentDto: AddCommentDto) {
    const { id, author, userId, comment } = addCommentDto;
    return await prisma.categoryItems.update({
      where: { id: id },
      data: {
        notes: {
          push: [
            {
              author,
              userId,
              comment,
            },
          ],
        },
      },
    });
  }

  static async updateToDone(categoryItemId: string, done: boolean) {
    return await prisma.categoryItems.update({
      where: { id: categoryItemId },
      data: {
        done,
      },
    });
  }

  static async deleteItem(categoryItemId: string) {
    return await prisma.categoryItems.delete({
      where: {
        id: categoryItemId,
      },
    });
  }
}
