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
	nama_acara: z.string({ message: "Nama acara wajib diisi" }),
	tempat_acara: z.string({ message: "Tempat acara wajib diisi" }),
	hari: z.string().optional(),
	tanggal: z.string({ message: "Tanggal wajib diisi" }), // ISO date string (yyyy-mm-dd)
	dimulai: z.string({ message: "Dimulai wajib diisi" }),
	selesai: z.string({ message: "Selesai wajib diisi" }),
	penanggung_jawab: z.string({ message: "Penanggung jawab wajib diisi" }),
	kontak: z.string({ message: "Kontak wajib diisi" }),
	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
