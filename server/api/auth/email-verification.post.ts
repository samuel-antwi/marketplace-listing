import { lucia } from "../../utils/auth";
import { isWithinExpirationDate } from "oslo";
import type { User } from "lucia";
import { prisma } from "../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;

  if (!sessionId) {
    return new Response(null, {
      status: 401,
      statusText: "Session ID not found",
    });
  }

  const { user } = await lucia.validateSession(sessionId);
  if (!user) {
    return new Response(null, {
      status: 401,
      statusText: "Invalid session",
    });
  }

  const code = body.code;
  if (typeof code !== "string") {
    return new Response(null, {
      status: 400,
      statusText: "Invalid verification code",
    });
  }

  const validCode = await verifyVerificationCode(user, code);
  if (!validCode) {
    return new Response(null, {
      status: 400,
      statusText: "Verification code is invalid or expired",
    });
  }

  await lucia.invalidateUserSessions(user.id);
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      email_verified: true,
    },
  });

  const session = await lucia.createSession(user.id, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );

  async function verifyVerificationCode(
    user: User,
    code: string
  ): Promise<boolean> {
    const transaction = await prisma.$transaction(async (prisma) => {
      const databaseCode = await prisma.email_verification_code.findFirst({
        where: { userId: user.id },
      });
      if (!databaseCode || databaseCode.code !== code) {
        return false;
      }
      await prisma.email_verification_code.delete({
        where: { id: databaseCode.id },
      });

      if (!isWithinExpirationDate(databaseCode.expiresAt)) {
        return false;
      }
      if (databaseCode.email !== user.email) {
        return false;
      }
      return true;
    });

    return transaction;
  }
});
