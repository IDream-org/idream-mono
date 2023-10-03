import { prisma } from "../../server/db/client";

export class Users {
  static async getAll() {
    return await prisma.users.findMany();
  }

  static async updateAvatar(userId: string, avatar: string) {
    return await prisma?.users.update({
      where: { id: userId },
      data: {
        avatar,
      },
    });
  }
}
