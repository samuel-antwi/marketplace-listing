import { prisma } from "../../../utils/prisma";
import { isWithinExpirationDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";

export default defineEventHandler(async (event) => {
  const verificationToken = getRouterParam(event, "token");

  const tokenHash = encodeHex(
    await sha256(new TextEncoder().encode(verificationToken))
  );
  const token = await prisma.password_reset_token.findFirst({
    where: {
      token_hash: tokenHash,
    },
  });

  if (!token || !isWithinExpirationDate(token.expiresAt)) {
    throw createError({
      message:
        "Verification token is invalid or has expired. Please request a new one.",
      statusCode: 400,
    });
  }

  return new Response(null, {
    status: 200,
  });
});
