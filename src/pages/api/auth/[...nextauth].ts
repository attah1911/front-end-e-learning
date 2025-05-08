import environment from "../../../config/environment";
import NextAuth, { DefaultSession, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { UserExtended } from "../../../types/Auth";
import authServices from "../../../services/auth.service";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: UserExtended;
    accessToken?: string;
    error?: "TokenExpired";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserExtended;
  }
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60 * 12,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined
      ): Promise<UserExtended | null> {
        try {
          const { identifier, password } = credentials as {
            identifier: string;
            password: string;
          };
          const result = await authServices.login({
            identifier,
            password,
          });

          const accessToken = result.data.data;
          const me = await authServices.getProfileWithToken(accessToken);
          const user = me.data.data;

          if (
            accessToken &&
            result.status === 200 &&
            user._id &&
            me.status === 200
          ) {
            return {
              id: user._id,
              _id: user._id,
              email: user.email,
              fullName: user.fullName,
              role: user.role,
              accessToken: accessToken,
            } as UserExtended;
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | undefined }) {
      if (user) {
        token.user = user as UserExtended;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token.user) {
        session.user = token.user;
        session.accessToken = token.user.accessToken;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);