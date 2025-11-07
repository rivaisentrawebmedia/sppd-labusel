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

	nik_ayah: z
		.string({ message: "NIK ayah wajib diisi" })
		.length(16, { message: "NIK ayah harus terdiri dari 16 karakter" }),
	nama_ayah: z.string({ message: "Nama ayah wajib diisi" }),
	nik_ibu: z
		.string({ message: "NIK ibu wajib diisi" })
		.length(16, { message: "NIK ibu harus terdiri dari 16 karakter" }),
	nama_ibu: z.string({ message: "Nama ibu wajib diisi" }),
	alamat_orang_tua: z.string({ message: "Alamat orangtua wajib diisi" }),

	nama_anak: z.string({ message: "Nama anak wajib diisi" }),
	tempat_lahir_anak: z.string({ message: "Tempat lahir anak wajib diisi" }),
	tanggal_lahir_anak: z.string({ message: "Tanggal lahir anak wajib diisi" }),
	alamat_anak: z.string({ message: "Alamat anak wajib diisi" }),

	keperluan: z.string({ message: "Keperluan wajib diisi" }),

	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
