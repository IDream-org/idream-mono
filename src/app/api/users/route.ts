import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../server/db/client";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("Not Authorized", { status: 401 });
  }

  const users = await prisma.users.findMany();
  return NextResponse.json(users);
}
