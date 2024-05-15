import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: { // 
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {

      if (account?.provider === "google" && account.id_token) {
        console.log("account", account)
        const id_token = account.id_token;
      }

      return token;
    },

    async redirect({ url, baseUrl }) {
      console.log("redirect", url, baseUrl)
      

      return '/something';
    }
  },

  pages: {
    signIn: "/signin",
    error: "/error",
  },
}