import { z } from "zod";

export type SignInValidationMessages = {
  invalidEmail: string;
  passwordMin: string;
};

export const createSignInSchema = (
  messages: SignInValidationMessages,
) =>
  z.object({
    email: z.string().email(messages.invalidEmail),
    password: z.string().min(1, messages.passwordMin),
    rememberMe: z.boolean(),
  });

export type SignInFormValues = z.infer<ReturnType<typeof createSignInSchema>>;