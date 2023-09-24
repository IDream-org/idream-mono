import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "../../../../server/db/client";

export async function POST(request: Request) {
  const req = await request.json();
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return new NextResponse("Missing credentials", { status: 400 });
  }

  const userExists = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (userExists)
    return new NextResponse("User already exists", { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      firstName,
      lastName,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
