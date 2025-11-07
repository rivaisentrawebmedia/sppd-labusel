import { z } from "zod";

export const ResolverSurat = z.object({
	nik: z
		.string({ message: "NIK wajib diisi" })
		.length(16, { message: "NIK harus terdiri dari 16 karakter" }),
	nama: z.string({ message: "Nama wajib diisi" }),
	tempat_lahir: z.string({ message: "Tempat lahir wajib diisi" }),
	tanggal_lahir: z.string({ message: "Tanggal lahir wajib diisi" }),
	alamat: z.string({ message: "Alamat wajib diisi" }),

	nik_ibu: z
		.string({ message: "NIK ibu wajib diisi" })
		.length(16, { message: "NIK ibu harus terdiri dari 16 karakter" }),
	nama_ibu: z.string({ message: "Nama ibu wajib diisi" }),
	tempat_lahir_ibu: z.string({ message: "Tempat lahir ibu wajib diisi" }),
	tanggal_lahir_ibu: z.string({ message: "Tanggal lahir ibu wajib diisi" }),
	agama_ibu_id: z.string({ message: "Agama ibu wajib diisi" }),
	kewarganegaraan_ibu_id: z.string({
		message: "Kewarganegaraan ibu wajib diisi",
	}),
	pekerjaan_ibu: z.string({ message: "Pekerjaan ibu wajib diisi" }),
	alamat_ibu: z.string({ message: "Alamat ibu wajib diisi" }),

	lama_dikandung: z.string({ message: "Lama dikandung wajib diisi" }),
	tanggal_meninggal: z.string({ message: "Tanggal meninggal wajib diisi" }),
	tempat_meninggal: z.string({ message: "Tempat meninggal wajib diisi" }),
	hubungan_id: z.string({ message: "Hubungan wajib diisi" }),

	keperluan: z.string({ message: "Keperluan wajib diisi" }),

	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
