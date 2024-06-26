import { z } from "zod";

export const signupSchema = z.object({
  given_name: z.string().min(1, "First name field is required!"),
  family_name: z.string().min(1, "Last name field is required!"),
  email: z.string().email("Oops! Enter a valid email address!"),
  password: z
    .string()
    .min(8, "Your password must contain 8 or more characters."),
});

export const signinSchema = z.object({
  email: z.string().email("Oops! Enter a valid email address!"),
  password: z.string().min(1, "Please enter your password!"),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Your password must contain 8 or more characters."),
  confirmPassword: z.string().min(1, "Please confirm your password!"),
});

export const edituserSchema = z.object({
  given_name: z.string().min(1, "First name field is required!"),
  family_name: z.string().min(1, "Last name field is required!"),
  email: z.string().email("Oops! Enter a valid email address!"),
});
