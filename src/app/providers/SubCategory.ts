import { v4 as uuid } from "uuid";
import { prisma } from "../../server/db/client";
import { AddCommentDto } from "../dto/categoryItems/AddCommentDto";
import { CreateSubCategoryDto } from "../dto/subCategory.ts/CreateSubCategoryDto";
import { Notes, Photos } from "@prisma/client";
import { AddPhotoDto } from "../dto/categoryItems/AddPhotoDto";

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
              createdAt: new Date(),
            },
          ],
        },
      },
    });
  }

  static async addPhoto(addPhotoDto: AddPhotoDto) {
    const { id, image, userId, author } = addPhotoDto;
    return await prisma.subCategory.update({
      where: { id },
      data: {
        photos: {
          push: [
            {
              id: uuid(),
              author,
              userId,
              image,
              createdAt: new Date(),
            },
          ],
        },
      },
    });
  }

  static async removePhoto(photoId: string, updatedPhotos: Photos[]) {
    return await prisma.subCategory.update({
      where: { id: photoId },
      data: {
        photos: updatedPhotos,
      },
    });
  }

  static async removeNote(subCategoryId: string, updatedNotes: Notes[]) {
    return await prisma.subCategory.update({
      where: { id: subCategoryId },
      data: {
        notes: updatedNotes,
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
