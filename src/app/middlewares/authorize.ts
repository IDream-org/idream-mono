import { NextRequest, NextResponse } from "next/server";
import { NotAuthorizedError } from "../models/NotAuthorizedError";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

const authorize = (handler: any) => {
  return async (req: NextRequest, res: NextResponse) => {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NotAuthorizedError().send();
    }
    return handler(req, res);
  };
};

export default authorize;
