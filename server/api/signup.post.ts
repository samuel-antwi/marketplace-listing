// server/api/signup.post.ts
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { prisma } from "../../utils/prisma";

export default eventHandler(async (event) => {
  const formData = await readFormData(event);
  const email = formData.get("email");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email.toString())) {
    throw createError({
      message: "Invalid email",
      statusCode: 400,
    });
  }
  const password = formData.get("password");
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

  //check if username is already used
  const user = await prisma.user.findUnique({
    where: {
      email: email.toString(),
    },
  });
  if (user) {
    throw createError({
      message: "Email already in use",
      statusCode: 400,
    });
  }

  await prisma.user.create({
    data: {
      id: userId,
      email: email.toString(),
      password_hash: passwordHash,
    },
  });

  const session = await lucia.createSession(userId, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});
