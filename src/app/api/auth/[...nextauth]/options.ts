import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { access } from "fs";


export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: { // 
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/cloud-healthcare",
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = { id: "1", username: "john_doe", password: "123", email: "exam", role: "patient", access_token: "123" };
        if (user) {
          return user;
        }
        return null;
      },
    })
    
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      token.role = user?.role;
      console.log("jwt", account)
      if (account?.provider === "google" && account.id_token) {
        // console.log("account", account)
        token.access_token = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      if(session.user)
      session.user.access_token = token.access_token ?? '';
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