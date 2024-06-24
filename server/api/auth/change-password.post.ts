import { hash, verify } from "@node-rs/argon2";
import { prisma } from "../../../utils/prisma";
import { sendPasswordChangedNotification } from "../../../services/email/transactional/passwordChanged";
import { User } from "lucia";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id, current_password, new_password } = body;

  if (!id || !current_password || !new_password) {
    throw createError({
      message: "Missing required fields: id, current_password, or new_password",
      statusCode: 400,
    });
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw createError({
      message: "User not found",
      statusCode: 404,
    });
  }

  if (!user.password_hash) {
    throw createError({
      message: "Password hash is missing",
      statusCode: 400,
    });
  }

  const validPassword = await verify(user.password_hash, current_password);

  if (!validPassword) {
    throw createError({
      message: "Current password is incorrect",
      statusCode: 400,
    });
  }

  const newPasswordHash = await hash(new_password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  await prisma.user.update({
    where: { id },
    data: { password_hash: newPasswordHash },
  });

  await sendPasswordChangedNotification(user as User);

  return {
    message: "Password changed successfully",
  };
});
