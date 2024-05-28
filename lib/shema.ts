import { z } from "zod";

export const signupValidationSchema = z.object({
  first_name: z.string().min(1, "First name field is required!"),
  last_name: z.string().min(1, "Last name field is required!"),
  email: z.string().email("Oops! You need to type your email here"),
  password: z.string().min(8, "Password must be at least 8 characters long!"),
});
