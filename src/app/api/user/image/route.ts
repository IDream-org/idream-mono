import { NextRequest, NextResponse } from "next/server";
import { updateUserAvatar } from "@/app/lib/UsersServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await updateUserAvatar(req, res);
  },
};

export const { PUT } = apiHandler;
