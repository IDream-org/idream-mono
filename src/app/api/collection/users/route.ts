import { NextRequest, NextResponse } from "next/server";
import {
  addUserToCollection,
  removeUserFromCollection,
} from "@/app/lib/CollectionsServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await addUserToCollection(req, res);
  },
  DELETE: async (req: NextRequest, res: NextResponse) => {
    return await removeUserFromCollection(req, res);
  },
};

export const { PUT, DELETE } = apiHandler;
