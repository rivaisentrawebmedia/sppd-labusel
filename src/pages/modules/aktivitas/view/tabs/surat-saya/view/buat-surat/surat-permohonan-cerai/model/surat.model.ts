import { z } from "zod";

export const ResolverSurat = z.object({
	nama_suami: z.string({ message: "Nama suami wajib diisi" }),
	nik_suami: z
		.string({ message: "NIK suami wajib diisi" })
		.length(16, { message: "NIK suami harus terdiri dari 16 karakter" }),
	tempat_lahir_suami: z.string({ message: "Tempat lahir suami wajib diisi" }),
	tanggal_lahir_suami: z.string({ message: "Tanggal lahir suami wajib diisi" }),
	agama_id_suami: z.string({ message: "Agama suami wajib diisi" }),
	pekerjaan_suami: z.string({ message: "Pekerjaan suami wajib diisi" }),
	alamat_suami: z.string({ message: "Alamat suami wajib diisi" }),

	nama_istri: z.string({ message: "Nama istri wajib diisi" }),
	nik_istri: z
		.string({ message: "NIK istri wajib diisi" })
		.length(16, { message: "NIK istri harus terdiri dari 16 karakter" }),
	tempat_lahir_istri: z.string({ message: "Tempat lahir istri wajib diisi" }),
	tanggal_lahir_istri: z.string({ message: "Tanggal lahir istri wajib diisi" }),
	agama_id_istri: z.string({ message: "Agama istri wajib diisi" }),
	pekerjaan_istri: z.string({ message: "Pekerjaan istri wajib diisi" }),
	alamat_istri: z.string({ message: "Alamat istri wajib diisi" }),

	sebab_cerai: z.string({ message: "Sebab cerai wajib diisi" }),
	keperluan: z.string({ message: "Keperluan wajib diisi" }),
	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
