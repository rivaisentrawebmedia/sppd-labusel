import { z } from "zod";

export const ResolverSurat = z.object({
	nik: z
		.string({ message: "NIK wajib diisi" })
		.length(16, { message: "NIK harus terdiri dari 16 karakter" }),
	nama: z.string({ message: "Nama wajib diisi" }),
	tempat_lahir: z.string({ message: "Tempat lahir wajib diisi" }),
	tanggal_lahir: z.string({ message: "Tanggal lahir wajib diisi" }),
	alamat: z.string({ message: "Alamat wajib diisi" }),

	jenis_kelamin: z.string({ message: "Jenis kelamin wajib diisi" }),
	pekerjaan: z.string({ message: "Pekerjaan wajib diisi" }),
	keperluan: z.string({ message: "Keperluan wajib diisi" }),
	agama_id: z.string({ message: "Agama wajib diisi" }),

	nama_perusahaan: z.string({ message: "Nama perusahaan wajib diisi" }),
	jabatan: z.string({ message: "Jabatan wajib diisi" }),
	lama: z.string({ message: "Lama wajib diisi" }),
	terhitung_dari: z.string({ message: "Terhitung dari wajib diisi" }), // ISO date string (yyyy-mm-dd)
	alasan_izin: z.string({ message: "Alasan izin wajib diisi" }),
	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
