import authorize from "../middlewares/authorize";
import { NextRequest, NextResponse } from "next/server";
import { Users } from "../providers/Users";
import { RequestValidationError } from "../models/RequestValidationError";

const UserServices = {
  getUsers: authorize(async () => {
    const users = await Users.getAll();
    return NextResponse.json(users);
  }),

  updateUserAvatar: authorize(async (request: NextRequest) => {
    const userId = request.nextUrl.searchParams.get("userId");
    const { avatar } = await request.json();

    if (!avatar || !userId) {
      return new RequestValidationError().send();
    }

    const updatedUserImage = await Users.updateAvatar(userId, avatar);
    return NextResponse.json(updatedUserImage);
  }),
};

export const { getUsers, updateUserAvatar } = UserServices;
