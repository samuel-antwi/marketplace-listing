import { prisma } from "./../../utils/prisma";
import { generateEmailVerificationCode } from "../utils/emailVerificationCode";
import { sendVerificationEmail } from "../utils/emailServices";

export default defineEventHandler(async (event) => {
  const user = event.context.user;

  console.log("USER", user);
  console.log("NODE", event.node.req.headers);

  if (user?.email_verified) {
    throw createError({
      message: "Your email is already verified",
      statusCode: 401,
    });
  }

  if (!user) {
    throw createError({
      message: "No user found with this email address",
      statusCode: 404,
    });
  }

  // Check for missing required fields
  if (!user.email) {
    throw createError({
      message: "Missing email address",
      statusCode: 400,
    });
  }

  const databaseCode = await prisma.email_verification_code.findFirst({
    where: { userId: user.id },
  });

  if (!databaseCode) {
    return false;
  }

  await prisma.email_verification_code.delete({
    where: {
      id: databaseCode.id,
    },
  });

  // Generate a new verification code
  const verificationCode = await generateEmailVerificationCode(
    user.id,
    user.email
  );

  // Send the verification email
  await sendVerificationEmail(user.email, verificationCode, user as any);

  // Respond to the client
  return {
    message: "Verification email has been resent",
  };
});
