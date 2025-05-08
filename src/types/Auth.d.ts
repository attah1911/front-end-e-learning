import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILogin {
    identifier: string;
    password: string;
}

interface IActivation {
  code: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
  _id?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
  error?: string;
  user?: UserExtended;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
  iat?: number;
  error?: string;
}

export type {
  IRegister,
  IActivation,
  JWTExtended,
  SessionExtended,
  UserExtended,
  ILogin,
};
