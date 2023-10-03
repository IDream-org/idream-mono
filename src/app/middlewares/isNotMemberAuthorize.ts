import { NextRequest, NextResponse } from "next/server";
import { NotAuthorizedError } from "../models/NotAuthorizedError";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { Collections } from "../providers/Collections";
import { Roles } from "@prisma/client";

const isNotMemberAuthorize = (handler: any) => {
  return async (req: NextRequest, res: NextResponse) => {
    const session = await getServerSession(authOptions);
    const collectionId = req.nextUrl.searchParams.get("collectionId");
    const collection = await Collections.getByCollectionId(collectionId!);
    const currentUser = collection?.users.find(
      (user) => user.userId === session!.user.id
    );
    if (
      !session?.user ||
      (collection?.authorId !== session?.user.id &&
        !collection?.users.some(
          (userSome) => userSome.userId === session?.user.id
        )) ||
      currentUser?.role === Roles.Member
    ) {
      return new NotAuthorizedError().send();
    }
    return handler(req, res);
  };
};

export default isNotMemberAuthorize;
