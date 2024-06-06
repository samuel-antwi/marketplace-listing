import { TimeSpan, createDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { generateIdFromEntropySize } from "lucia";
import { prisma } from "../../utils/prisma";

export async function createPasswordResetToken(
  userId: string,
  ipAddress: string
): Promise<string> {
  const existingRecord = await prisma.password_reset_token.findUnique({
    where: {
      id: userId,
    },
  });

  if (existingRecord) {
    await prisma.password_reset_token.delete({
      where: {
        id: userId,
      },
    });
  }

  const tokenId = generateIdFromEntropySize(25);
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));
  const id = generateIdFromEntropySize(10);
  await prisma.password_reset_token.create({
    data: {
      id: id,
      token_hash: tokenHash,
      userId: userId,
      expiresAt: createDate(new TimeSpan(12, "h")),
      createdAt: new Date(),
      ipAddress: ipAddress,
    },
  });
  return tokenId;
}
