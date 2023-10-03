import { CollectionUsers } from "@prisma/client";
import { prisma } from "../../server/db/client";
import { AddUserToCollectionDto } from "../dto/collections/AddUserToCollectionDto";
import { CreateCollectionDto } from "../dto/collections/CreteCollectionDto";

export class Collections {
  static async getByUserId(userId: string) {
    return await prisma.collections.findMany({
      where: {
        OR: [
          { authorId: userId },
          {
            users: {
              some: {
                userId: userId,
              },
            },
          },
        ],
      },
    });
  }

  static async getByCollectionId(collectionId: string) {
    return await prisma.collections.findFirst({
      where: {
        id: collectionId,
      },
      include: {
        categories: true,
      },
    });
  }

  static async createCollection(createCollectionDto: CreateCollectionDto) {
    const { title, image, private: privateKey, userId } = createCollectionDto;
    return await prisma.collections.create({
      data: {
        title,
        image,
        private: privateKey,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  static async addUserToCollection(
    addUserToCollectionDto: AddUserToCollectionDto
  ) {
    const { collectionId, user, userId, role } = addUserToCollectionDto;
    return await prisma.collections.update({
      where: { id: collectionId },
      data: {
        users: {
          push: [
            {
              user: user,
              userId: userId,
              role: role,
            },
          ],
        },
      },
    });
  }

  static async updateUserRole(
    collectionId: string,
    usersCollections: CollectionUsers[]
  ) {
    return await prisma.collections.update({
      where: { id: collectionId },
      data: {
        users: usersCollections,
      },
    });
  }

  static async removeUserFromCollection(
    collectionId: string,
    updatedUsers: CollectionUsers[]
  ) {
    return await prisma.collections.update({
      where: { id: collectionId },
      data: {
        users: updatedUsers,
      },
    });
  }

  static async deleteCollection(collectionId: string) {
    return await prisma.collections.delete({
      where: { id: collectionId },
    });
  }
}
