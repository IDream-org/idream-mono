import { NextRequest, NextResponse } from "next/server";

import {
  getCollections,
  createCollection,
  deleteCollection,
} from "@/app/lib/CollectionsServices";

const apiHandler = {
  GET: async (req: NextRequest, res: NextResponse) => {
    return await getCollections(req, res);
  },
  POST: async (req: NextRequest, res: NextResponse) => {
    return await createCollection(req, res);
  },
  DELETE: async (req: NextRequest, res: NextResponse) => {
    return await deleteCollection(req, res);
  },
};

export const { GET, POST, DELETE } = apiHandler;
