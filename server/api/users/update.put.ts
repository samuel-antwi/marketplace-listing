import { prisma } from "~/utils/prisma";

export default defineEventHandler(async (event) => {
  const formData = await readBody(event);
  const { id, ...updateFields } = formData;

  console.log("formData", formData);

  if (
    formData.given_name === "" ||
    formData.family_name === "" ||
    formData.email === ""
  ) {
    return createError({
      status: 400,
      message: "All fields marked with * are required!",
    });
  }

  try {
    const user = await prisma.user.updateMany({
      where: {
        id: id,
      },
      data: {
        ...updateFields,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
});
