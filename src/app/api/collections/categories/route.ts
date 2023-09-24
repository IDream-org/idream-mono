import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { Roles } from "@prisma/client";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const collectionId = request.nextUrl.searchParams.get("collectionId");

  if (!collectionId) {
    return new NextResponse("Collection ID not found", { status: 404 });
  }

  if (!session?.user) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const collection = await prisma.collections.findFirst({
    where: {
      id: collectionId,
    },
    include: {
      categories: true,
    },
  });

  if (
    collection?.authorId !== session.user.id &&
    !collection?.users.some((user) => user.userId === session.user.id)
  ) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  return NextResponse.json(collection?.categories);
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  const session = await getServerSession(authOptions);
  const collectionId = request.nextUrl.searchParams.get("collectionId");

  if (!collectionId) {
    return new NextResponse("Collection ID not found", { status: 404 });
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
  const currentUser = collection?.users.find(
    (user) => user.userId === session.user.id
  );

  if (
    (collection?.authorId !== session.user.id && !currentUserAccess) ||
    currentUser?.role === Roles.Member
  ) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const { title, image } = req;

  if (!title || !image) {
    return new NextResponse("Missing Information", { status: 400 });
  }

  const savedCategory = await prisma.categories.create({
    data: {
      title,
      image,
      user: {
        connect: {
          id: session.user.id,
        },
      },
      collections: {
        connect: {
          id: collectionId,
        },
      },
    },
  });

  return NextResponse.json(savedCategory);
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const categoryId = request.nextUrl.searchParams.get("categoryId");
  const collectionId = request.nextUrl.searchParams.get("collectionId");

  if (!collectionId) {
    return new NextResponse("Collection ID not found", { status: 404 });
  }

  if (!categoryId) {
    return new NextResponse("Category ID not found", { status: 404 });
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

  const deletedCategory = await prisma.categories.delete({
    where: { id: categoryId },
  });

  return NextResponse.json(deletedCategory);
}
