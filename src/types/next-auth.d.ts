import { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      uuid: string;
      userType: number;
      expires: string;
    } & DefaultSession["user"];
    accessToken?: string;
    refreshToken?: string;
    expires: string;
  }
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    uuid: string;
    user_type: number;
    access_token: string;
    refresh_token: string;
    sessionToken: string;
    expires: string;
  }
  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  // interface Account {}
  /** The OAuth profile returned from your provider */
  // interface Profile {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: {
      uuid: string;
      userType: number;
      expires: string;
    } & DefaultSession["user"];
    accessToken?: string;
    refreshToken?: string;
    expires: string;
  }
}
