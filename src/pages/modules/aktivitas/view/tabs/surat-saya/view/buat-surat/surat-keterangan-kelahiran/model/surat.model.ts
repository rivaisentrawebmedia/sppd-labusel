import { z } from "zod";

export const ResolverSurat = z.object({
	nama: z.string({ message: "Nama wajib diisi" }),
	tempat_lahir: z.string({ message: "Tempat lahir wajib diisi" }),
	tanggal_lahir: z.string({ message: "Tanggal lahir wajib diisi" }),

	jam_lahir: z.string({ message: "Jam lahir wajib diisi" }),
	keperluan: z.string({ message: "Keperluan wajib diisi" }),
	jenis_kelamin: z.string({ message: "Jenis kelamin wajib diisi" }),
	anak_ke: z.string({ message: "Anak ke wajib diisi" }),

	nama_ayah: z.string({ message: "Nama ayah wajib diisi" }),
	nik_ayah: z
		.string({ message: "NIK ayah wajib diisi" })
		.length(16, { message: "NIK ayah harus terdiri dari 16 karakter" }),
	tempat_lahir_ayah: z.string({ message: "Tempat lahir ayah wajib diisi" }),
	tanggal_lahir_ayah: z.string({ message: "Tanggal lahir ayah wajib diisi" }),
	alamat_ayah: z.string({ message: "Alamat ayah wajib diisi" }),

	nama_ibu: z.string({ message: "Nama ibu wajib diisi" }),
	nik_ibu: z
		.string({ message: "NIK ibu wajib diisi" })
		.length(16, { message: "NIK ibu harus terdiri dari 16 karakter" }),
	tempat_lahir_ibu: z.string({ message: "Tempat lahir wajib diisi" }),
	tanggal_lahir_ibu: z.string({ message: "Tanggal lahir wajib diisi" }),
	alamat_ibu: z.string({ message: "Alamat ibu wajib diisi" }),

	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
