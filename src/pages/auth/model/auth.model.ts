import { z } from "zod";

export const ResolverLogin = z.object({
	nik: z.string({ message: "NIK wajib diisi" }),
	no_telp: z.string({ message: "No Handphone wajib diisi" }),
	captcha: z.string({ message: "Captcha wajib diisi" }),
});

export type LoginPayload = z.infer<typeof ResolverLogin>;

export type LoginResponse = {
	token: string;
};
