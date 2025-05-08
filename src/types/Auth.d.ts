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
  error?: string;
}

export interface ILogin {
  identifier: string;
  password: string;
}

export interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface IActivation {
  code: string; // Matches the backend's auth.controller.ts expectation
}