import { z } from "zod";

export const ResolverSurat = z.object({
	nik_pemberi: z
		.string({ message: "NIK pemberi wajib diisi" })
		.length(16, { message: "NIK pemberi harus terdiri dari 16 karakter" }),
	nama_pemberi: z.string({ message: "Nama pemberi wajib diisi" }),
	jabatan_pemberi: z.string({ message: "Jabatan pemberi wajib diisi" }),

	disposisi_kuasa_sebagai: z.string({
		message: "Disposisi kuasa sebagai wajib diisi",
	}),
	disposisi_kuasa_untuk: z.string({
		message: "Disposisi kuasa untuk wajib diisi",
	}),

	nik_penerima: z
		.string({ message: "NIK penerima wajib diisi" })
		.length(16, { message: "NIK penerima harus terdiri dari 16 karakter" }),
	nama_penerima: z.string({ message: "Nama penerima wajib diisi" }),
	jabatan_penerima: z.string({ message: "Jabatan penerima wajib diisi" }),

	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
