import { prisma } from "../../../utils/prisma";
import { isWithinExpirationDate } from "oslo";
import { hash } from "@node-rs/argon2";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { User } from "lucia";
import { sendPasswordChangedNotification } from "../../../services/email/transactional/passwordChanged";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { password, confirmPassword } = body;

  if (typeof password !== "string" || password.length < 8) {
    return createError({
      message: "Your password must contain 8 or more characters.",
      statusCode: 400,
    });
  }

  if (password !== confirmPassword) {
    return createError({
      message: "Passwords do not match",
      statusCode: 400,
    });
  }

  const verificationToken = getRouterParam(event, "token");

  const tokenHash = encodeHex(
    await sha256(new TextEncoder().encode(verificationToken))
  );
  const token = await prisma.password_reset_token.findFirst({
    where: {
      token_hash: tokenHash,
    },
  });

  if (token) {
    await prisma.password_reset_token.delete({
      where: {
        token_hash: tokenHash,
      },
    });
  }

  if (!token || !isWithinExpirationDate(token.expiresAt)) {
    return new Response(null, {
      status: 400,
    });
  }

  await lucia.invalidateUserSessions(token.userId);
  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  await prisma.user.update({
    where: {
      id: token.userId,
    },
    data: {
      password_hash: passwordHash,
    },
  });
  // Send password changed notification
  const user = await prisma.user.findUnique({
    where: {
      id: token.userId,
    },
  });
  if (!user) {
    return new Response(null, {
      status: 400,
    });
  }
  await sendPasswordChangedNotification(user as User);
  const session = await lucia.createSession(token.userId, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});
