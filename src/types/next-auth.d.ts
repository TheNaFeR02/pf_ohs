import { JWT, DefaultJWT } from "next-auth/jwt"


declare module "next-auth"{
  interface Session {
    user?: {
      access_token: string;
    } & DefaultSession
  }

  interface User {
    access_token: string;
  }

}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT{
    access_token: string | undefined;
  }
}