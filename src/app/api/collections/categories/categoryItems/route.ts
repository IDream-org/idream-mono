import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";

export async function GET(request: NextRequest) {
  const collectionId = request.nextUrl.searchParams.get("collectionId");
  const categoryId = request.nextUrl.searchParams.get("categoryId");

  if (!collectionId) {
    return new NextResponse("Collection ID not found", { status: 404 });
  }

  if (!categoryId) {
    return new NextResponse("Category ID not found", { status: 404 });
  }

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const collection = await prisma.collections.findFirst({
    where: {
      id: collectionId,
    },
    include: {
      categories: {
        where: {
          id: categoryId,
        },
        include: {
          items: true,
        },
      },
    },
  });

  if (
    collection?.authorId !== session.user.id &&
    !collection?.users.some((user) => user.userId === session.user.id)
  ) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  return NextResponse.json(collection.categories[0].items);
}
