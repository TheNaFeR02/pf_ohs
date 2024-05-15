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
      console.log("jwt", account)
      if (account?.provider === "google" && account.id_token) {
        console.log("account", account)
        token.access_token = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.access_token = token.access_token;
      return session;
    },

    async redirect({ url, baseUrl }) {
      console.log("redirect", url, baseUrl)


      return baseUrl;
    }
  },

  pages: {
    signIn: "/signin",
    error: "/error",
  },
}