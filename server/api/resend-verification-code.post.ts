import { prisma } from "./../../utils/prisma";
import { generateEmailVerificationCode } from "../utils/emailVerificationCode";
import { sendVerificationEmail } from "../utils/emailServices";

const RATE_LIMIT_TIME_FRAME = 60 * 1000; // 1 minute
const MAX_EMAILS_PER_TIME_FRAME = 1;

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const ipAddress =
    event.node.req.headers["x-forwarded-for"] ||
    event.node.req.connection.remoteAddress ||
    "";

  if (!user) {
    throw createError({
      message: "No user found with this email address",
      statusCode: 404,
    });
  }

  if (user.email_verified) {
    throw createError({
      message: "Your email is already verified",
      statusCode: 401,
    });
  }

  const now = new Date();

  // Fetch requests from the database within the rate limit time frame for both user ID and IP address
  const recentRequests = await prisma.email_verification_code.findMany({
    where: {
      OR: [
        {
          userId: user.id,
          createdAt: { gte: new Date(now.getTime() - RATE_LIMIT_TIME_FRAME) },
        },
        {
          ipAddress: ipAddress?.toString(),
          createdAt: { gte: new Date(now.getTime() - RATE_LIMIT_TIME_FRAME) },
        },
      ],
    },
  });

  if (recentRequests.length >= MAX_EMAILS_PER_TIME_FRAME) {
    throw createError({
      message: "Too many requests. Please try again later.",
      statusCode: 429,
    });
  }

  // Clean up old requests (optional but recommended)
  await prisma.email_verification_code.deleteMany({
    where: {
      createdAt: { lt: new Date(now.getTime() - RATE_LIMIT_TIME_FRAME) },
    },
  });

  // Generate a new verification code
  const verificationCode = await generateEmailVerificationCode(
    user.id,
    user.email,
    ipAddress?.toString()
  );

  // Send the verification email
  await sendVerificationEmail(user.email, verificationCode, user as any);

  // Respond to the client
  return {
    message: "Verification email has been resent",
  };
});
