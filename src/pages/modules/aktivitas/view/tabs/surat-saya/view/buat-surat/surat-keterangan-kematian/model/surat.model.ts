import { z } from "zod";

export const ResolverSurat = z.object({
	nama: z.string({ message: "Nama wajib diisi" }),
	alamat: z.string({ message: "Alamat wajib diisi" }),
	hubungan_id: z.string({ message: "Hubungan wajib diisi" }),

	nik_mendiang: z
		.string({ message: "NIK mendiang wajib diisi" })
		.length(16, { message: "NIK mendiang harus terdiri dari 16 karakter" }),
	nama_mendiang: z.string({ message: "Nama mendiang wajib diisi" }),
	tempat_lahir_mendiang: z.string({ message: "Tempat lahir wajib diisi" }),
	tanggal_lahir_mendiang: z.string({ message: "Tanggal lahir wajib diisi" }), // ISO date string
	jenis_kelamin_mendiang: z.string({ message: "Jenis kelamin wajib diisi" }),
	alamat_mendiang: z.string({ message: "Alamat mendiang wajib diisi" }),
	hari_meninggal: z.string()?.optional(),
	tanggal_meninggal: z.string({ message: "Tanggal meninggal wajib diisi" }), // ISO date string
	tempat_meninggal: z.string({ message: "Tempat meninggal wajib diisi" }),
	sebab_meninggal: z.string({ message: "Sebab meninggal wajib diisi" }),
	keperluan: z.string({ message: "Keperluan wajib diisi" }),
	jam_meninggal: z.string({ message: "Jam meninggal wajib diisi" }),
	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
