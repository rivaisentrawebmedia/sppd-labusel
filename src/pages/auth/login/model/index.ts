import { z } from "zod";
export const ResolverLogin = z.object({
	email: z.string({ message: "Email wajib diisi" }),
	password: z.string({ message: "Password wajib diisi" }),
	captcha: z.string({ message: "Captcha wajib diisi" }),
});

export type LoginInterface = z.infer<typeof ResolverLogin>;
