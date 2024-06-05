import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { prisma } from "../../utils/prisma";
import { generateEmailVerificationCode } from "../utils/emailVerificationCode";
import { sendVerificationEmail } from "../utils/emailServices";

export default defineEventHandler(async (event) => {
  const formData = await readBody(event);
  const ipAddress =
    event.node.req.headers["x-forwarded-for"] ||
    event.node.req.connection.remoteAddress ||
    "";
  const {
    email,
    given_name: firstName,
    family_name: lastName,
    password,
  } = formData;

  // Check for missing required fields
  if (!email || !firstName || !lastName || !password) {
    throw createError({
      message:
        "Missing required fields: email, given_name, family_name, or password",
      statusCode: 400,
    });
  }

  // Validate password
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    throw createError({
      message:
        "Invalid password. It must be a string between 6 and 255 characters.",
      statusCode: 400,
    });
  }

  // Hash the password
  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  // Generate a user ID
  const userId = generateIdFromEntropySize(10); // 16 characters long

  // Check if email is already used
  const emailRegistered = await prisma.user.findUnique({
    where: {
      email: email.toString(),
    },
  });
  if (emailRegistered) {
    throw createError({
      message: "A user with this email address already exists",
      statusCode: 400,
    });
  }

  // Create the user in the database
  await prisma.user.create({
    data: {
      id: userId,
      email: email.toString(),
      given_name: firstName.toString(),
      family_name: lastName.toString(),
      name: `${firstName} ${lastName}`,
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

  // Generate and send verification code
  const verificationCode = await generateEmailVerificationCode(
    userId,
    email,
    ipAddress.toString()
  );
  await sendVerificationEmail(email, verificationCode, user as any);

  // Create a session
  const session = await lucia.createSession(userId, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});
