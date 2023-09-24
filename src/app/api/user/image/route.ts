import { getServerSession } from "next-auth";
import { prisma } from "../../../../server/db/client";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function PUT(request: NextRequest) {
  const req = await request.json();
  const session = await getServerSession(authOptions);
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return new NextResponse("User ID not found", { status: 404 });
  }

  if (!session?.user) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const { avatar } = req;

  if (!avatar) {
    return new NextResponse("Missing Information", { status: 400 });
  }

  const updatedUserImage = await prisma?.users.update({
    where: { id: userId },
    data: {
      avatar,
    },
  });

  return NextResponse.json(updatedUserImage);
}
