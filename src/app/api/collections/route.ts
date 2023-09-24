import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const collections = await prisma.collections.findMany({
    where: {
      OR: [
        { authorId: session.user.id },
        {
          users: {
            some: {
              userId: session.user.id,
            },
          },
        },
      ],
    },
  });

  return NextResponse.json(collections);
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const { title, image, private: privateKey = true } = req;

  if (!title || !image) {
    return new NextResponse("Missing Information", { status: 400 });
  }

  const savedCollection = await prisma.collections.create({
    data: {
      title,
      image,
      private: privateKey,
      author: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  return NextResponse.json(savedCollection);
}

export async function DELETE(request: NextRequest) {
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

  if (collection?.authorId !== session.user.id) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const deletedCollection = await prisma.collections.delete({
    where: { id: collectionId },
  });

  return NextResponse.json(deletedCollection);
}
