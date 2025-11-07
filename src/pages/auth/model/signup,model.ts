import { z } from "zod";

export const ResolverSignUp = z
	.object({
		nik: z
			.string({ message: "NIK wajib diisi" })
			.min(16, { message: "NIK harus terdiri dari 16 karakter" })
			.max(16, { message: "NIK harus terdiri dari 16 karakter" }),

		no_telp: z
			.string({ message: "No. Telp wajib diisi" })
			.min(10, { message: "No. Telp minimal 10 karakter" }),

		konfirmasi_no_telp: z
			.string({ message: "Konfirmasi No. Telp wajib diisi" })
			.min(10, { message: "Konfirmasi No. Telp minimal 10 karakter" }),

		nama_warga: z.string({ message: "Nama warga wajib diisi" }),

		no_kk: z
			.string({ message: "No. KK wajib diisi" })
			.min(16, { message: "No. KK harus terdiri dari 16 karakter" })
			.max(16, { message: "No. KK harus terdiri dari 16 karakter" }),

		email: z
			.string({ message: "Email wajib diisi" })
			.email({ message: "Format email tidak valid" }),

		tempat_lahir: z.string({ message: "Tempat lahir wajib diisi" }),
		tanggal_lahir: z.string({ message: "Tanggal lahir wajib diisi" }),

		scan_ktp: z.string().optional().nullable().nullish(),
		scan_kk: z.string().optional().nullable().nullish(),
		selfie_ktp: z.string().optional().nullable().nullish(),
	})
	.refine((data) => data.konfirmasi_no_telp === data.no_telp, {
		message: "Harus sama dengan No. Handphone",
		path: ["konfirmasi_no_telp"],
	});

export type SignUpPayload = z.infer<typeof ResolverSignUp>;

export type SignUpResponse = {
	data: SignUpPayload;
};
