import { z } from "zod";

export const authSchema = z.object({
  given_name: z.string().min(1, "First name field is required!"),
  family_name: z.string().min(1, "Last name field is required!"),
  email: z.string().email("Oops! Enter a valid email address!"),
  password: z
    .string()
    .min(8, "Your password must contain 8 or more characters."),
});

export const loginSchema = z.object({
  email: z.string().email("Oops! Enter a valid email address!"),
  password: z.string().min(1, "Please enter your password!"),
});
