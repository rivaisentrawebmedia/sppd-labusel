import { z } from "zod";

export const ResolverSurat = z.object({
	nik_1: z.string({ message: "NIK pihak pertama wajib diisi" }).length(16, {
		message: "NIK pihak pertama harus terdiri dari 16 karakter",
	}),
	nama_1: z.string({ message: "Nama pihak pertama wajib diisi" }),
	tempat_lahir_1: z.string({
		message: "Tempat lahir pihak pertama wajib diisi",
	}),
	tanggal_lahir_1: z.string({
		message: "Tanggal lahir pihak pertama wajib diisi",
	}),
	alamat_1: z.string({ message: "Alamat pihak pertama wajib diisi" }),
	jenis_kelamin_1: z.string({
		message: "Jenis pihak pertama kelamin wajib diisi",
	}),
	pekerjaan_1: z.string({ message: "Pekerjaan pihak pertama wajib diisi" }),

	nik_2: z.string({ message: "NIK pihak kedua wajib diisi" }).length(16, {
		message: "NIK pihak kedua harus terdiri dari 16 karakter",
	}),
	nama_2: z.string({ message: "Nama pihak kedua wajib diisi" }),
	tempat_lahir_2: z.string({
		message: "Tempat lahir pihak kedua wajib diisi",
	}),
	tanggal_lahir_2: z.string({
		message: "Tanggal lahir pihak kedua wajib diisi",
	}),
	alamat_2: z.string({ message: "Alamat pihak kedua wajib diisi" }),
	jenis_kelamin_2: z.string({
		message: "Jenis pihak kedua kelamin wajib diisi",
	}),
	pekerjaan_2: z.string({ message: "Pekerjaan pihak kedua wajib diisi" }),

	jenis_barang: z.string({ message: "Jenis barang wajib diisi" }),
	rincian_barang: z.string({ message: "Rincian barang wajib diisi" }),

	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
