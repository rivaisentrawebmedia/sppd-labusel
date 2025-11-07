import { z } from "zod";

export const ResolverCheckNik = z.object({
	nik: z.string({ message: "NIK wajib diisi" }),
});

export type CheckNIKPayload = z.infer<typeof ResolverCheckNik>;

export type CheckNIKResponse = {
	data: { is_duplikat: boolean };
};
