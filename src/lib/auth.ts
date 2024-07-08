import db from "@/utils/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession } from "next-auth";
import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
export const authConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.user.findUnique({
        where: {
          email: token.email as string,
        },
      });
      if (!dbUser) {
        throw new Error("no user with email found");
      }
      return {
        id: dbUser.id as string,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name,
          email: token.email,
          image: token.picture,
        };
      }

      return session;
    },
  },
} satisfies AuthOptions;
export function getSession() {
  return getServerSession(authConfig);
}
