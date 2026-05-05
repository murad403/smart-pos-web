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


export const paymentSchema = z.object({
  paymentMethod: z.enum(["cash", "transfer", "card"]),
  amountReceived: z.number().min(0),
  printer: z.string().optional(),
});

export type FormValues = z.infer<typeof paymentSchema>;