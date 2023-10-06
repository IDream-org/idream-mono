import { NextRequest, NextResponse } from "next/server";
import {
  addSubCategoryNote,
  removeSubCategoryNote,
} from "@/app/lib/SubCategoryServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await addSubCategoryNote(req, res);
  },
  DELETE: async (req: NextRequest) => {
    return await removeSubCategoryNote(req);
  },
};

export const { PUT, DELETE } = apiHandler;
