import { TimeSpan, createDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { generateIdFromEntropySize } from "lucia";
import { prisma } from "../../utils/prisma";
import { User } from "lucia";

export async function createPasswordResetToken(
  user: User,
  ipAddress: string
): Promise<string> {
  const tokenId = generateIdFromEntropySize(25);
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));
  const id = generateIdFromEntropySize(10);
  await prisma.password_reset_token.create({
    data: {
      id: id,
      token_hash: tokenHash,
      userId: user.id,
      expiresAt: createDate(new TimeSpan(12, "h")),
      createdAt: new Date(),
      ipAddress: ipAddress,
    },
  });
  return tokenId;
}
