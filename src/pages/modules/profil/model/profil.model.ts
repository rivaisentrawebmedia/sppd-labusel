import { z } from "zod";

export const ResolverProfil = z.object({
	photo: z.string().optional().nullable().nullish(),
	nama_warga: z.string().optional().nullable().nullish(),
	no_kk: z
		.string({ message: "No. KK wajib diisi" })
		.min(16, { message: "No. KK harus terdiri dari 16 karakter" })
		.max(16, { message: "No. KK harus terdiri dari 16 karakter" }),
	nik: z
		.string({ message: "NIK wajib diisi" })
		.min(16, { message: "NIK harus terdiri dari 16 karakter" })
		.max(16, { message: "NIK harus terdiri dari 16 karakter" }),
	tempat_lahir: z.string({ message: "Tempat lahir wajib diisi" }),
	tanggal_lahir: z.string({ message: "Tanggal lahir wajib diisi" }),
	agama_id: z.string({ message: "Agama wajib diisi" }),
	suku_id: z.string({ message: "Suku wajib diisi" }),
	golongan_darah: z.string({ message: "Golongan Darah wajib diisi" }),
	kewarganegaraan: z.string({ message: "Kewarganegaraan wajib diisi" }),
	disabilitas_id: z.string({ message: "Disabilitas wajib diisi" }),
	jenis_kelamin: z.string({ message: "Jenis kelamin wajib diisi" }),

	no_telp: z
		.string({ message: "No. Telp wajib diisi" })
		.min(10, { message: "No. Telp minimal 10 karakter" }),

	email: z
		.string({ message: "Email wajib diisi" })
		.email({ message: "Format email tidak valid" }),
	alamat: z.string({ message: "Alamat wajib diisi" }),

	status_kawin_id: z.string({ message: "Status kawin wajib diisi" }),
	pendidikan_id: z.string({ message: "Pendidikan wajib diisi" }),
	pekerjaan_id: z.string({ message: "Pekerjaan wajib diisi" }),
	status_hubungan: z.string({ message: "Status hubungan wajib diisi" }),
	is_kepala_keluarga: z.string({ message: "Kepala keluarga wajib diisi" }),
});

export type ProfilPayload = z.infer<typeof ResolverProfil>;

export type Profil = {
	id: string;
	nama_warga: string;
	photo?: string;
	no_kk: string;
	nik: string;
	tanggal_lahir: string;
	tempat_lahir: string;
	agama_id: string;
	agama: string;
	suku_id: string;
	suku: string;
	golongan_darah: string;
	kewarganegaraan: string;
	disabilitas_id: string;
	disabilitas: string;
	jenis_kelamin: string;

	is_warga_desa: boolean;

	no_telp: string;
	email: string;
	alamat: string;

	status_kawin_id: string;
	status_kawin: string;
	pendidikan_id: string;
	pendidikan: string;
	pekerjaan_id: string;
	pekerjaan: string;
	status_hubungan: string;
	is_kepala_keluarga: string;
	is_active: boolean;

	kepala_keluarga: string;
};

export type ProfilResponse = {
	data: Profil;
};
