import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { prisma } from "../../utils/prisma";
import { generateEmailVerificationCode } from "../utils/emailVerificationCode";
import { sendVerificationEmail } from "../utils/emailServices";

export default eventHandler(async (event) => {
  const formData = await readBody(event);
  const email = formData.email;
  const firstName = formData.given_name;
  const lastName = formData.family_name;

  if (!email || !firstName || !lastName) {
    throw createError({
      message: "Missing required fields",
      statusCode: 400,
    });
  }
  const password = formData.password;
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    throw createError({
      message: "Invalid password",
      statusCode: 400,
    });
  }

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const userId = generateIdFromEntropySize(10); // 16 characters long

  //check if email is already used
  const emailRegistered = await prisma.user.findUnique({
    where: {
      email: email.toString(),
    },
  });
  if (emailRegistered) {
    throw createError({
      message: "Email already in use",
      statusCode: 400,
    });
  }

  await prisma.user.create({
    data: {
      id: userId,
      email: email.toString(),
      given_name: firstName.toString(),
      family_name: lastName.toString(),
      password_hash: passwordHash,
    },
  });

  // Fetch the user from the database
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw createError({
      message: "User creation failed",
      statusCode: 500,
    });
  }

  const verificationCode = await generateEmailVerificationCode(userId, email);

  await sendVerificationEmail(email, verificationCode, user as any);

  const session = await lucia.createSession(userId, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});
