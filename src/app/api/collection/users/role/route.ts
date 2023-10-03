import { NextRequest, NextResponse } from "next/server";
import { updateUserRole } from "@/app/lib/CollectionsServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await updateUserRole(req, res);
  },
};

export const { PUT } = apiHandler;
