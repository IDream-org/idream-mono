import { NextResponse } from "next/server";
import { CustomError } from "./CustomError";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor() {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  send() {
    return new NextResponse(this.message, { status: this.statusCode });
  }
}
