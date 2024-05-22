import { JWT, DefaultJWT } from "next-auth/jwt"
import { DefaultSession, DefaultUser } from "next-auth"


declare module "next-auth"{
  interface Session {
    user?: {
      access_token: string;
    } & DefaultSession
  }

  interface User extends DefaultUser {
    id: string,
    username: string,
    email?: string | null,
    role: string,
    access_token: string;
  }

}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT{
    access_token: string | undefined;
    role: string | undefined;
  }
}