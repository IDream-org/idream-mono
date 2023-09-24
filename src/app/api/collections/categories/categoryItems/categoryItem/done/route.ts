import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../../server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function PUT(request: NextRequest) {
  const req = await request.json();
  const session = await getServerSession(authOptions);
  const collectionId = request.nextUrl.searchParams.get("collectionId");
  const categoryItemId = request.nextUrl.searchParams.get("categoryItemId");

  if (!collectionId) {
    return new NextResponse("Collection ID not found", { status: 404 });
  }

  if (!categoryItemId) {
    return new NextResponse("Category item ID not found", { status: 404 });
  }

  if (!session?.user) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const collection = await prisma.collections.findFirst({
    where: {
      id: collectionId,
    },
  });

  const currentUserAccess = collection?.users.some(
    (user) => user.userId === session.user.id
  );

  if (collection?.authorId !== session.user.id && !currentUserAccess) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const { done } = req;

  const updatedCategoryItem = await prisma.categoryItems.update({
    where: { id: categoryItemId },
    data: {
      done,
    },
  });

  return NextResponse.json(updatedCategoryItem);
}
