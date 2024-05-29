// server/utils/auth.ts
import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { Google } from "arctic";

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // IMPORTANT!
    attributes: {
      // set to `true` when using HTTPS
      secure: !process.dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      email: attributes.email,
      avatar_url: attributes.avatar,
      mobile: attributes.mobile,
      given_name: attributes.given_name,
      family_name: attributes.family_name,
      google_id: attributes.google_id,
      email_verified: attributes.email_verified,
      name: attributes.name,
      picture: attributes.picture,
    };
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
  email: string;
  password_hash: string;
  avatar: string;
  mobile: string;
  given_name: string;
  family_name: string;
  google_id: string;
  email_verified: boolean;
  name: string;
  picture: string;
}

const runtimeConfig = useRuntimeConfig();
const redirectURI =
  process.env.NODE_ENV === "production"
    ? process.env.GOOGLE_REDIRECT_URI_PROD
    : process.env.GOOGLE_REDIRECT_URI_DEV;

const GOOGLE_CLIENT_ID = runtimeConfig.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = runtimeConfig.GOOGLE_CLIENT_SECRET;
export const google = new Google(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  redirectURI as string
);
