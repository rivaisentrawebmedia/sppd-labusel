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
	no_kk: z.string({ message: "No kk wajib diisi" }),
	kepala_keluarga: z.string({ message: "Kepala keluarga wajib diisi" }),
	golongan_darah: z.string({ message: "Golongan darah wajib diisi" }),
	agama_id: z.string({ message: "Agama wajib diisi wajib diisi" }),
	status_kawin_id: z.string({ message: "Status kawin wajib diisi" }),

	akta_lahir: z.string().optional(),
	akta_kawin: z.string().optional(),
	tanggal_kawin: z.string().optional(),
	akta_cerai: z.string().optional(),
	tanggal_cerai: z.string().optional(),
	hubungan: z.string().optional(),
	disabilitas_id: z.string().optional(),
	pendidikan_id: z.string({ message: "Pendidikan wajib diisi" }),
	pekerjaan: z.string({ message: "Pekerjaan wajib diisi" }),

	nik_ayah: z
		.string({ message: "NIK ayah wajib diisi" })
		.length(16, { message: "NIK ayah harus terdiri dari 16 karakter" }),
	nama_ayah: z.string({ message: "Nama ayah wajib diisi" }),

	nik_ibu: z
		.string({ message: "NIK ibu wajib diisi" })
		.length(16, { message: "NIK ibu harus terdiri dari 16 karakter" }),
	nama_ibu: z.string({ message: "Nama ibu wajib diisi" }),

	keperluan: z.string({ message: "Keperluan wajib diisi" }),

	is_warga_desa: z.boolean({ message: "wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
