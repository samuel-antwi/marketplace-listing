import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { google } from "../../../utils/auth";
import { prisma } from "../../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, "google_oauth_state") ?? null;
  const storedCodeVerifier = getCookie(event, "code_verifier") ?? null;

  if (!code || !storedCodeVerifier || !storedState || state !== storedState) {
    throw createError({
      status: 400,
      message: "Invalid state or code verifier",
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier
    );
    const googleResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser: GoogleUser = await googleResponse.json();

    const existingUser = await prisma.user.findFirst({
      where: {
        email: googleUser.email,
      },
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      appendHeader(
        event,
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize()
      );
      return sendRedirect(event, "/");
    }

    const userId = generateIdFromEntropySize(10);
    await prisma.user.create({
      data: {
        id: userId,
        email: googleUser.email,
        name: googleUser.name,
        given_name: googleUser.given_name,
        family_name: googleUser.family_name,
        picture: googleUser.picture,
        email_verified: googleUser.email_verified,
      },
    });

    const session = await lucia.createSession(userId, {});
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );
    return sendRedirect(event, "/");
  } catch (e) {
    console.error("Error during Google Auth:", e);
    if (e instanceof OAuth2RequestError) {
      // invalid code
      throw createError({
        status: 400,
        message: "Invalid authorization code",
      });
    }
    throw createError({
      status: 500,
      message: "Internal server error",
    });
  }
});

interface GoogleUser {
  id: string;
  login: string;
  email: string;
  username: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email_verified: boolean;
}
