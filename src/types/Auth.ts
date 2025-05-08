import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface UserExtended extends DefaultUser {
  id: string;
  _id: string;
  email: string;
  fullName: string;
  role: string;
  accessToken?: string;
}

export interface SessionExtended extends DefaultSession {
  user?: UserExtended;
  accessToken?: string;
  error?: "TokenExpired";
}

export interface JWTExtended extends JWT {
  user?: UserExtended;
  iat?: number;
}

export interface ILogin {
  identifier: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  fullName: string;
  role: string;
}

export interface IActivation {
  token: string;
}
