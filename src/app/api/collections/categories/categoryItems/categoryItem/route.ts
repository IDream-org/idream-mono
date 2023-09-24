import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/authOptions";
import { Roles } from "@prisma/client";

export async function GET(request: NextRequest) {
  const collectionId = request.nextUrl.searchParams.get("collectionId");
  const categoryId = request.nextUrl.searchParams.get("categoryId");
  const categoryItemId = request.nextUrl.searchParams.get("categoryItemId");

  if (!collectionId) {
    return new NextResponse("Collection ID not found", { status: 404 });
  }

  if (!categoryId) {
    return new NextResponse("Category ID not found", { status: 404 });
  }

  if (!categoryItemId) {
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
  });

  if (
    collection?.authorId !== session.user.id &&
    !collection?.users.some((user) => user.userId === session.user.id)
  ) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const category = await prisma.categoryItems.findFirst({
    where: {
      AND: [{ categoryId: categoryId }, { id: categoryItemId }],
    },
  });

  if (!category) {
    return NextResponse.json("Item not found", { status: 404 });
  }

  return NextResponse.json(category);
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  const session = await getServerSession(authOptions);
  const collectionId = request.nextUrl.searchParams.get("collectionId");
  const categoryId = request.nextUrl.searchParams.get("categoryId");
  const categoryItemId = request.nextUrl.searchParams.get("categoryItemId");

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
    currentUser?.role === Roles.Member
  ) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const {
    title,
    image,
    video,
    description,
    subtitle,
    rating,
    icons,
    details,
    comments,
  } = req;

  if (!title || !image || !description || !subtitle) {
    return new NextResponse("Missing Information", { status: 400 });
  }

  if (!categoryItemId) {
    const savedCategoryItem = await prisma.categoryItems.create({
      data: {
        title,
        image,
        description,
        rating,
        subtitle,
        icons,
        details,
        video,
        comments,
        categories: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
    return NextResponse.json(savedCategoryItem);
  } else {
    const updatedCategoryItem = await prisma.categoryItems.update({
      where: { id: categoryItemId },
      data: {
        title,
        image,
        description,
        rating,
        subtitle,
        icons,
        details,
        video,
        comments,
      },
    });
    return NextResponse.json(updatedCategoryItem);
  }
}

export async function DELETE(request: NextRequest) {
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
  const currentUser = collection?.users.find(
    (user) => user.userId === session.user.id
  );

  if (
    (collection?.authorId !== session.user.id && !currentUserAccess) ||
    currentUser?.role === Roles.Member
  ) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const deletedCategoryItem = await prisma.categoryItems.delete({
    where: {
      id: categoryItemId,
    },
  });

  return NextResponse.json(deletedCategoryItem);
}
