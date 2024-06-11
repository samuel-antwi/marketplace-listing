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
    await handleFailedAttempt(email);
    throw createError({
      message:
        "The log in details provided do not match our records, please try again. After 5 incorrect attempts we will lock your account and send you an email advising you what to do next.",
      statusCode: 400,
    });
  }

  // if (existingUser.account_locked) {
  //   throw createError({
  //     message:
  //       "Your account has been locked due to too many failed login attempts.",
  //     statusCode: 403,
  //   });
  // }

  if (existingUser.password_hash === null) {
    await handleFailedAttempt(email);
    throw createError({
      message:
        "The log in details provided do not match our records, please try again. After 5 incorrect attempts we will lock your account and send you an email advising you what to do next.",
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
    await handleFailedAttempt(email);
    throw createError({
      message:
        "The log in details provided do not match our records, please try again. After 5 incorrect attempts we will lock your account and send you an email advising you what to do next.",
      statusCode: 400,
    });
  }

  // Reset failed attempts on successful login
  await prisma.user.update({
    where: { email: email.toString() },
    data: { failed_attempts: 0 },
  });

  const session = await lucia.createSession(existingUser.id, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});

async function handleFailedAttempt(email: string) {
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) return;

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      failed_attempts: { increment: 1 },
    },
  });

  if (updatedUser.failed_attempts >= 5) {
    await prisma.user.update({
      where: { email },
      data: {
        account_locked: true,
      },
    });
    // Here you can add code to send an email notification to the user
  }
}
