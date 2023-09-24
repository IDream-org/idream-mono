import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    firstName: string;
    lastName: string;
    interests?: string;
    description?: string;
  }
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      interests?: string;
      description?: string;
      avatar?: string;
    } & DefaultSession["user"];
  }
}
