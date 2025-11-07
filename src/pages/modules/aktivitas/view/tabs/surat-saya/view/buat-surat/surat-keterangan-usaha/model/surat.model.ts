import { z } from "zod";

export const ResolverSurat = z.object({
	nik: z
		.string({ message: "NIK wajib diisi" })
		.length(16, { message: "NIK harus terdiri dari 16 karakter" }),
	nama: z.string({ message: "Nama wajib diisi" }),
	tempat_lahir: z.string({ message: "Tempat lahir wajib diisi" }),
	tanggal_lahir: z.string({ message: "Tanggal lahir wajib diisi" }),
	alamat: z.string({ message: "Alamat wajib diisi" }),
	pekerjaan: z.string({ message: "Pekerjaan wajib diisi" }),

	nama_usaha: z.string({ message: "Nama usaha wajib diisi" }),
	jenis_usaha_id: z.string({ message: "Jenis usaha wajib diisi" }),
	bidang_usaha_id: z.string({ message: "Bidang usaha wajib diisi" }),
	npwp: z.string({ message: "NPWP wajib diisi" }),
	alamat_usaha: z.string({ message: "Alamat usaha wajib diisi" }),
	usaha_berdiri_sejak: z.string({ message: "Usaha berdiri sejak wajib diisi" }),

	keperluan: z.string({ message: "Keperluan wajib diisi" }),
	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
