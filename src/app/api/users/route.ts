import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "@/app/lib/UsersServices";

const apiHandler = {
  GET: async (req: NextRequest, res: NextResponse) => {
    return await getUsers(req, res);
  },
};

export const { GET } = apiHandler;
