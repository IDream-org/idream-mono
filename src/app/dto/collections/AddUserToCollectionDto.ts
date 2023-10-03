import { Roles } from "@prisma/client";

export interface AddUserToCollectionDto {
  collectionId: string;
  user: string;
  userId: string;
  role: Roles;
}
