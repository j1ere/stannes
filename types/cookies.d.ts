// types/cookies.d.ts

export type ParsedCookie = {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  expires?: Date;
  maxAge?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
};