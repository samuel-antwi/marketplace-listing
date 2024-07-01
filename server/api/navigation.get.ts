import { prisma } from "@/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subCategories: true,
      },
    });

    return categories;
  } catch (error) {
    return {
      status: 500,
      message: "An error occurred while fetching categories.",
    };
  }
});
