import {
  addSubSubCategoryPhoto,
  removeSubSubCategoryPhoto,
} from "@/app/lib/SubSubCategoryServices";
import { NextRequest, NextResponse } from "next/server";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await addSubSubCategoryPhoto(req, res);
  },
  DELETE: async (req: NextRequest) => {
    return await removeSubSubCategoryPhoto(req);
  },
};

export const { PUT, DELETE } = apiHandler;
