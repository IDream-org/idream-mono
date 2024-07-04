import { Session } from "next-auth";
import { NotAuthorizedError } from "./NotAuthorizedError";
import { NextResponse } from "next/server";

export class User {
  private session: Session;
  error = new NextResponse();
  constructor(session: Session | null) {
    if (!session?.user) {
      throw new NotAuthorizedError();
    }
    this.session = session;
  }

  getId() {
    return this.session.user.id;
  }
}
