import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { facebook } from "../../../utils/auth";
import { prisma } from "../../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, "facebook_oauth_state") ?? null;

  if (!code || !storedState || state !== storedState) {
    throw createError({
      status: 400,
      message: "Invalid state or code verifier",
    });
  }

  try {
    const tokens = await facebook.validateAuthorizationCode(code);
    const facebookResponse = await fetch("https://graph.facebook.com/me", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const facebookUser: FacebookUser = await facebookResponse.json();

    const existingUser = await prisma.user.findFirst({
      where: {
        email: facebookUser.email,
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
        email: facebookUser.email,
        name: facebookUser.name,
        given_name: facebookUser.first_name,
        family_name: facebookUser.last_name,
        picture: facebookUser.picture,
        email_verified: facebookUser.email_verified,
        auth_method: "facebook",
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

interface FacebookUser {
  id: string;
  login: string;
  email: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  picture: string;
  email_verified: boolean;
  auth_method: string;
}
