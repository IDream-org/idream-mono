import { NextRequest, NextResponse } from "next/server";
import { getCollectionById } from "@/app/lib/CollectionsServices";

const apiHandler = {
  GET: async (req: NextRequest, res: NextResponse) => {
    return await getCollectionById(req, res);
  },
};

export const { GET } = apiHandler;
