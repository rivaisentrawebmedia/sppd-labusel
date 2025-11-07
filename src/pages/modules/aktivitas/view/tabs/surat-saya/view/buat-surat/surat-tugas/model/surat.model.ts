import { z } from "zod";

export const ResolverSurat = z.object({
	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),

	ditugaskan_untuk: z.string({ message: "wajib diisi" }),
	deskripsi: z.string({ message: "wajib diisi" }),
	penerima: z.array(
		z.object({
			nama: z.string("Nama wajib diisi"),
			jabatan: z.string("Jabatan wajib diisi"),
			nik: z
				.string({ message: "NIK saksi pihak kedua wajib diisi" })
				.length(16, {
					message: "NIK saksi pihak kedua harus terdiri dari 16 karakter",
				}),
		})
	),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
