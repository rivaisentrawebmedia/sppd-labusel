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
	nik_ayah: z
		.string({ message: "NIK ayah wajib diisi" })
		.length(16, { message: "NIK ayah harus terdiri dari 16 karakter" }),
	nama_ayah: z.string({ message: "Nama ayah wajib diisi" }),

	nik_pasangan: z
		.string({ message: "NIK pasangan wajib diisi" })
		.length(16, { message: "NIK pasangan harus terdiri dari 16 karakter" }),
	nama_pasangan: z.string({ message: "Nama pasangan wajib diisi" }),
	tempat_lahir_pasangan: z.string({
		message: "Tempat lahir pasangan wajib diisi",
	}),
	tanggal_lahir_pasangan: z.string({
		message: "Tanggal lahir pasangan wajib diisi",
	}),
	alamat_pasangan: z.string({ message: "Alama pasangant wajib diisi" }),
	pekerjaan_pasangan: z.string({ message: "Pekerjaan pasangan wajib diisi" }),
	agama_id_pasangan: z.string({ message: "Agama pasangan wajib diisi" }),
	kewarganegaraan_pasangan: z.string({
		message: "Kewarganegaraan pasangan wajib diisi",
	}),
	nik_ayah_pasangan: z
		.string({ message: "NIK ayah pasangan wajib diisi" })
		.length(16, {
			message: "NIK ayah pasangan harus terdiri dari 16 karakter",
		}),
	nama_ayah_pasangan: z.string({ message: "Nama ayah pasangan wajib diisi" }),

	keperluan: z.string({ message: "Keperluan wajib diisi" }),
	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
