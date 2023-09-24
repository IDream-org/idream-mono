import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { prisma } from "../../../../server/db/client";
import { Roles } from "@prisma/client";

export async function PUT(request: NextRequest) {
  const req = await request.json();
  const session = await getServerSession(authOptions);
  const collectionId = request.nextUrl.searchParams.get("collectionId");

  if (!collectionId) {
    return new NextResponse("Category item ID not found", { status: 404 });
  }

  if (!session?.user) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const { user } = req;

  const collection = await prisma.collections.findFirst({
    where: {
      id: collectionId,
    },
  });

  const currentUserAccess = collection?.users.some(
    (user) => user.userId === session.user.id
  );
  const currentUser = collection?.users.find(
    (user) => user.userId === session.user.id
  );

  if (
    (collection?.authorId !== session.user.id && !currentUserAccess) ||
    currentUser?.role === Roles.Member ||
    currentUser?.role === Roles.Admin
  ) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const updatedCollection = await prisma.collections.update({
    where: { id: collectionId },
    data: {
      users: {
        push: [
          {
            user: user.user,
            userId: user.userId,
            role: user.role,
          },
        ],
      },
    },
  });

  return NextResponse.json(updatedCollection);
}

export async function DELETE(request: NextRequest) {
  const req = await request.json();
  const session = await getServerSession(authOptions);
  const collectionId = request.nextUrl.searchParams.get("collectionId");

  if (!collectionId) {
    return new NextResponse("Category item ID not found", { status: 404 });
  }

  if (!session?.user) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const { userId } = req;

  const collection = await prisma.collections.findFirst({
    where: {
      id: collectionId,
    },
  });

  const currentUserAccess = collection?.users.some(
    (user) => user.userId === session.user.id
  );
  const currentUser = collection?.users.find(
    (user) => user.userId === session.user.id
  );

  if (
    (collection?.authorId !== session.user.id && !currentUserAccess) ||
    currentUser?.role === Roles.Member ||
    currentUser?.role === Roles.Admin
  ) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const updatedUsers = collection?.users.filter(
    (user) => user.userId !== userId
  );

  const updatedCollection = await prisma.collections.update({
    where: { id: collectionId },
    data: {
      users: updatedUsers,
    },
  });

  return NextResponse.json(updatedCollection);
}
