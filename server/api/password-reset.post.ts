import { prisma } from "../../utils/prisma";
import { createPasswordResetToken } from "../utils/passwordResetToken";
import { sendPasswordResetToken } from "../../services/email/transactional/sendPasswordResetToken";
import { User } from "lucia";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email } = body;

  const ipAddress =
    event.node.req.headers["x-forwarded-for"] ||
    event.node.req.socket.remoteAddress ||
    "";

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    // return password_rset_token relation
    include: {
      password_reset_token: true,
    },
  });

  if (user?.password_reset_token.length) {
    // Delete existing password reset tokens for the user
    await prisma.password_reset_token.deleteMany({
      where: {
        userId: user.id,
      },
    });
  }

  if (!user || !user.email_verified) {
    return new Response("Invalid email", {
      status: 400,
    });
  }

  // Only send password reset email if the user is using email/password auth
  if (user.auth_method !== "email") {
    return;
  }

  const verificationToken = await createPasswordResetToken(
    user as User,
    ipAddress.toString()
  );
  const prodUrl = "https://marketplace-listing.vercel.app/reset-password";
  const devUrl = "http://localhost:3000/reset-password";
  const verificationLink =
    process.env.NODE_ENV === "production"
      ? `${prodUrl}/${verificationToken}`
      : `${devUrl}/${verificationToken}`;

  await sendPasswordResetToken(email, verificationLink, user as User);

  return new Response(null, {
    status: 200,
  });
});
