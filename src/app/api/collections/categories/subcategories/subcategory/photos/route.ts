import { NextRequest, NextResponse } from "next/server";
import {
  addSubCategoryPhoto,
  removeSubCategoryPhoto,
} from "@/app/lib/SubCategoryServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await addSubCategoryPhoto(req, res);
  },
  DELETE: async (req: NextRequest) => {
    return await removeSubCategoryPhoto(req);
  },
};

export const { PUT, DELETE } = apiHandler;
