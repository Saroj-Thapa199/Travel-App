import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import { UserInterface } from "@/model/User";
import { Types } from "mongoose";

declare module "next-auth" {
  interface User extends Pick<UserInterface, "name" | "email"> {}
  interface Session {
    user: User & DefaultSession["user"];
  }
  interface JWT extends DefaultJWT {
    id?: string;
    name?: string;
  }
}
