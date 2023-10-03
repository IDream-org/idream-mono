import { NextRequest, NextResponse } from "next/server";
import { NotAuthorizedError } from "../models/NotAuthorizedError";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { Collections } from "../providers/Collections";

const authorAuthorize = (handler: any) => {
  return async (req: NextRequest, res: NextResponse) => {
    const session = await getServerSession(authOptions);
    const collectionId = req.nextUrl.searchParams.get("collectionId");
    const collection = await Collections.getByCollectionId(collectionId!);
    if (collection?.authorId !== session?.user.id) {
      return new NotAuthorizedError().send();
    }
    return handler(req, res);
  };
};

export default authorAuthorize;
