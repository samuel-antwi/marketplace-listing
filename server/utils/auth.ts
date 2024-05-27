// server/utils/auth.ts
import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

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
      first_name: attributes.first_name,
      last_name: attributes.last_name,
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
  first_name: string;
  last_name: string;
}
