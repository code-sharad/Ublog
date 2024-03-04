import z, { boolean, string } from "zod";

export const signUpInput = z.object({
  username: z.string().min(3).max(16),
  email: z.string().email(),
  password: z.string().min(3).max(15),
  name: z.string().optional(),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(15),
});

export const createBlogInput = z.object({
  title: string(),
  content: string(),
  published: boolean(),
});

export const updateBlogInput = z.object({
  title: string(),
  content: string(),
  id: string(),
});

// type inference in zod
export type SignupInput = z.infer<typeof signUpInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
