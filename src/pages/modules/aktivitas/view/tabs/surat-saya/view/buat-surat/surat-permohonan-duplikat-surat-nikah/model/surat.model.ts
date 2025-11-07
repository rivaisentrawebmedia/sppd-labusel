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
	agama_id: z.string({ message: "Agama wajib diisi" }),
	pendidikan_id: z.string({ message: "Pendidikan wajib diisi" }),
	kewarganegaraan: z.string({ message: "Kewarganegaraan wajib diisi" }),
	no_kk: z.string({ message: "No KK wajib diisi" }),
	kepala_keluarga: z.string({ message: "Kepala keluarga wajib diisi" }),

	kecamatan_kua: z.string({ message: "Kecamatan KUA wajib diisi" }),
	tanggal_nikah: z.string({ message: "Tanggal nikah wajib diisi" }),
	nama_pasangan: z.string({ message: "Nama pasangan wajib diisi" }),

	keperluan: z.string({ message: "Keperluan wajib diisi" }),

	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
