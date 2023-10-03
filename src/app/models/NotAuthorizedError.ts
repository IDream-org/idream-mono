import { NextResponse } from "next/server";
import { CustomError } from "./CustomError";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Unauthorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  send() {
    return new NextResponse(this.message, { status: this.statusCode });
  }
}
