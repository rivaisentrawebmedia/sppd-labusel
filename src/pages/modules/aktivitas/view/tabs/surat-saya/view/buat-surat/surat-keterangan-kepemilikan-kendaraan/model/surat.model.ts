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

	merk: z.string({ message: "Merk wajib diisi" }),
	tahun_pembuatan: z.string({ message: "Tahun pembuatan wajib diisi" }),
	warna: z.string({ message: "Warna wajib diisi" }),
	nomor_polisi: z.string({ message: "Nomor polisi wajib diisi" }),
	nomor_mesin: z.string({ message: "Nomor mesin wajib diisi" }),
	nomor_rangka: z.string({ message: "Nomor rangka wajib diisi" }),
	nomor_bpkb: z.string({ message: "Nomor bpkb wajib diisi" }),
	bahan_bakar: z.string({ message: "Bahan bakar wajib diisi" }),
	isi_silinder: z.string({ message: "Isi silinder wajib diisi" }),
	atas_nama: z.string({ message: "Atas nama wajib diisi" }),

	keperluan: z.string({ message: "Keperluan wajib diisi" }),
	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
