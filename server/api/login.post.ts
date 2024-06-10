import { verify } from "@node-rs/argon2";
import { prisma } from "../../utils/prisma";

export default eventHandler(async (event) => {
  const formData = await readBody(event);
  const email = formData.email;
  const password = formData.password;

  if (!email || !password) {
    return;
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email.toString(),
    },
  });
  if (!existingUser) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If usernames are public, you may outright tell the user that the username is invalid.
    throw createError({
      message:
        "The log in details provided do not math our records, please try again. After 5 incorrect attempts we will lock your account and send you an email advising you what to do next.",
      statusCode: 400,
    });
  }

  if (existingUser.password_hash === null) {
    throw createError({
      message:
        "The log in details provided do not math our records, please try again. After 5 incorrect attempts we will lock your account and send you an email advising you what to do next.",
      statusCode: 400,
    });
  }

  const validPassword = await verify(existingUser.password_hash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!validPassword) {
    throw createError({
      message:
        "The log in details provided do not math our records, please try again. After 5 incorrect attempts we will lock your account and send you an email advising you what to do next.",
      statusCode: 400,
    });
  }

  const session = await lucia.createSession(existingUser.id, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});
