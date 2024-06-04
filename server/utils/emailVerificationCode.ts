import { generateRandomString, alphabet } from "oslo/crypto";
import { prisma } from "../../utils/prisma";
import { TimeSpan, createDate } from "oslo";
import { generateIdFromEntropySize } from "lucia";

export async function generateEmailVerificationCode(
  userId: string,
  email: string,
  ipAddress: string
): Promise<string> {
  // Check if a record exists for the given userId
  const existingRecord = await prisma.email_verification_code.findUnique({
    where: {
      id: userId,
    },
  });

  // If a record exists, delete it
  if (existingRecord) {
    await prisma.email_verification_code.delete({
      where: {
        id: userId,
      },
    });
  }

  // Generate a new verification code
  const code = generateRandomString(6, alphabet("0-9"));
  const id = generateIdFromEntropySize(10);

  // Create a new record with the new verification code
  await prisma.email_verification_code.create({
    data: {
      id: id,
      userId: userId,
      email: email,
      code: code,
      expiresAt: createDate(new TimeSpan(15, "m")),
      ipAddress: ipAddress,
      createdAt: new Date(),
    },
  });

  return code;
}
