declare module "react-cookies" {
  interface CookieAttributes {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "strict" | "lax" | "none";
    encode?: (val: string) => string;
  }

  interface CookieJar {
    load(name: string): string | undefined;
    save(name: string, value: string, options?: CookieAttributes): void;
    remove(name: string, options?: CookieAttributes): void;
  }

  const cookie: CookieJar;
  export default cookie;
}
