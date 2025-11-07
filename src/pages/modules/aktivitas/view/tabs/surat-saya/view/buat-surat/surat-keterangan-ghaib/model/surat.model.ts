import { z } from "zod";

export const ResolverSurat = z.object({
	keperluan: z.string({ message: "Keperluan wajib diisi" }),
	nik: z
		.string({ message: "NIK wajib diisi" })
		.length(16, { message: "NIK harus terdiri dari 16 karakter" }),
	nama: z.string({ message: "Nama wajib diisi" }),
	hubungan_id: z.string({ message: "wajib diisi" }),

	nama_orang_hilang: z.string({ message: "wajib diisi" }),
	jenis_kelamin: z.string({ message: "wajib diisi" }),
	usia: z.string({ message: "Nama wajib diisi" }),
	alamat: z.string({ message: "wajib diisi" }),
	hilang_sejak: z.string({ message: "wajib diisi" }),
	is_warga_desa: z.boolean({ message: "Nama wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
