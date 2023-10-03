import { NextRequest, NextResponse } from "next/server";
import { addCategoryItemNote } from "@/app/lib/CategoryItemsServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await addCategoryItemNote(req, res);
  },
};

export const { PUT } = apiHandler;
