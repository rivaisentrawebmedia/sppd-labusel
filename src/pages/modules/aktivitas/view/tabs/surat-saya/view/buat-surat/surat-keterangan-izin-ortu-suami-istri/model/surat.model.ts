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
	agama_id: z.string({ message: "Agama wajib diisi" }),
	kewarganegaraan: z.string({ message: "Kewarganegaraan wajib diisi" }),

	nik_2: z
		.string({ message: "NIK wajib diisi" })
		.length(16, { message: "NIK harus terdiri dari 16 karakter" }),
	nama_2: z.string({ message: "Nama wajib diisi" }),
	tempat_lahir_2: z.string({ message: "Tempat lahir wajib diisi" }),
	tanggal_lahir_2: z.string({ message: "Tanggal lahir wajib diisi" }),
	alamat_2: z.string({ message: "Alamat wajib diisi" }),
	pekerjaan_2: z.string({ message: "Pekerjaan wajib diisi" }),
	agama_2_id: z.string({ message: "Agama wajib diisi" }),
	kewarganegaraan_2: z.string({ message: "Kewarganegaraan wajib diisi" }),

	negara_tujuan: z.string({ message: "Negara tujuan wajib diisi" }),
	nama_perusahaan: z.string({ message: "Nama perusahaan wajib diisi" }),
	status_pekerjaan: z.string({ message: "Status pekerjaan wajib diisi" }),
	masa_kontrak: z.string({ message: "Masa kontrak wajib diisi" }),
	memberi_izin: z.string({ message: "Memberi izin wajib diisi" }),
	diberi_izin: z.string({ message: "Diberi izin wajib diisi" }),

	keperluan: z.string({ message: "Keperluan wajib diisi" }),
	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
