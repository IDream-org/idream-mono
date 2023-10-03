import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

import authorize from "../middlewares/authorize";
import { Collections } from "../providers/Collections";
import { RequestValidationError } from "../models/RequestValidationError";
import authorAuthorize from "../middlewares/authorAuthorize";
import authorOrIncludedUserAuthorize from "../middlewares/authorOrIncludedUserAuthorize";
import authorRoleAuthorize from "../middlewares/authorRoleAuthorize";

const CollectionsServices = {
  getCollections: authorize(async () => {
    const session = await getServerSession(authOptions);
    const collections = await Collections.getByUserId(session!.user.id);
    return NextResponse.json(collections);
  }),

  getCollectionById: authorOrIncludedUserAuthorize(
    async (request: NextRequest) => {
      const collectionId = request.nextUrl.searchParams.get("collectionId");

      if (!collectionId) {
        return new RequestValidationError().send();
      }

      const collection = await Collections.getByCollectionId(collectionId);
      return NextResponse.json(collection);
    }
  ),

  createCollection: authorize(async (request: NextRequest) => {
    const { title, image, private: privateKey = true } = await request.json();
    const session = await getServerSession(authOptions);

    if (!title || !image) {
      return new RequestValidationError().send();
    }

    const createdCollection = await Collections.createCollection({
      title,
      image,
      private: privateKey,
      userId: session!.user.id,
    });

    return NextResponse.json(createdCollection);
  }),

  addUserToCollection: authorRoleAuthorize(async (request: NextRequest) => {
    const { user } = await request.json();
    const collectionId = request.nextUrl.searchParams.get("collectionId");

    if (!collectionId || !user) {
      return new RequestValidationError().send();
    }

    const updatedCollection = await Collections.addUserToCollection({
      collectionId,
      user: user.user,
      userId: user.userId,
      role: user.role,
    });

    return NextResponse.json(updatedCollection);
  }),

  updateUserRole: authorRoleAuthorize(async (request: NextRequest) => {
    const { userId, userRole } = await request.json();
    const collectionId = request.nextUrl.searchParams.get("collectionId");

    if (!collectionId || !userId || !userRole) {
      return new RequestValidationError().send();
    }

    const collection = await Collections.getByCollectionId(collectionId);
    const usersCollections = collection!.users;
    const userToUpdateIndex = usersCollections.findIndex(
      (user) => user.userId === userId
    );
    usersCollections[userToUpdateIndex].role = userRole;

    const updatedCollection = await Collections.updateUserRole(
      collectionId,
      usersCollections
    );

    return NextResponse.json(updatedCollection);
  }),

  removeUserFromCollection: authorRoleAuthorize(
    async (request: NextRequest) => {
      const { userId } = await request.json();
      const collectionId = request.nextUrl.searchParams.get("collectionId");

      if (!collectionId || !userId) {
        return new RequestValidationError().send();
      }

      const collection = await Collections.getByCollectionId(collectionId);
      const updatedUsers = collection?.users.filter(
        (user) => user.userId !== userId
      );

      const updatedCollection = await Collections.removeUserFromCollection(
        collectionId,
        updatedUsers || []
      );
      return NextResponse.json(updatedCollection);
    }
  ),

  deleteCollection: authorAuthorize(async (request: NextRequest) => {
    const collectionId = request.nextUrl.searchParams.get("collectionId");

    const deletedCollection = await Collections.deleteCollection(collectionId!);
    return NextResponse.json(deletedCollection);
  }),
};

export const {
  getCollections,
  getCollectionById,
  createCollection,
  addUserToCollection,
  updateUserRole,
  removeUserFromCollection,
  deleteCollection,
} = CollectionsServices;
