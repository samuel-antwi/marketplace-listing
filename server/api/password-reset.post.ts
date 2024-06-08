import { prisma } from "../../utils/prisma";
import { createPasswordResetToken } from "../utils/passwordResetToken";
import { sendPasswordResetToken } from "../../services/email/transactional/sendPasswordResetToken";
import { User } from "lucia";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email } = body;

  console.log("EMAIL", email);

  const ipAddress =
    event.node.req.headers["x-forwarded-for"] ||
    event.node.req.connection.remoteAddress ||
    "";

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!user || !user.email_verified) {
    return new Response("Invalid email", {
      status: 400,
    });
  }

  const verificationToken = await createPasswordResetToken(
    user.id,
    ipAddress.toString()
  );
  const verificationLink =
    "http://localhost:3000/reset-password/" + verificationToken;

  await sendPasswordResetToken(email, verificationLink, user as User);
  return new Response(null, {
    status: 200,
  });
});