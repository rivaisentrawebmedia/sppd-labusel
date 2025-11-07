import { z } from "zod";

export const ResolverSurat = z.object({
	is_warga_desa_1: z.boolean({ message: "Penjual warga desa wajib diisi" }),
	nik_1: z.string({ message: "NIK penjual wajib diisi" }).length(16, {
		message: "NIK penjual harus terdiri dari 16 karakter",
	}),
	nama_1: z.string({ message: "Nama penjual wajib diisi" }),
	alamat_1: z.string({ message: "Alamat penjual wajib diisi" }),
	tempat_lahir_1: z.string({ message: "Tempat lahir penjual wajib diisi" }),
	tanggal_lahir_1: z.string({ message: "Tanggal lahir penjual wajib diisi" }),
	pekerjaan_1: z.string({ message: "Pekerjaan penjual wajib diisi" }),
	daftar_saksi_1: z.array(
		z.object({
			nama: z.string("Nama saksi penjual wajib diisi"),
			nik: z.string({ message: "NIK saksi penjual wajib diisi" }).length(16, {
				message: "NIK saksi penjual harus terdiri dari 16 karakter",
			}),
		})
	),

	is_warga_desa_2: z.boolean({ message: "Pembeli wargaa desa wajib diisi" }),
	nik_2: z.string({ message: "NIK pembeli wajib diisi" }).length(16, {
		message: "NIK pembeli harus terdiri dari 16 karakter",
	}),
	nama_2: z.string({ message: "Nama pembeli wajib diisi" }),
	alamat_2: z.string({ message: "Alamat pembeli wajib diisi" }),
	tempat_lahir_2: z.string({ message: "Tempat lahir pembeli wajib diisi" }),
	tanggal_lahir_2: z.string({ message: "Tanggal lahir pembeli wajib diisi" }),
	pekerjaan_2: z.string({ message: "Pekerjaan pembeli wajib diisi" }),
	daftar_saksi_2: z.array(
		z.object({
			nama: z.string("Nama saksi pembeli wajib diisi"),
			nik: z.string({ message: "NIK saksi pembeli wajib diisi" }).length(16, {
				message: "NIK saksi pembeli harus terdiri dari 16 karakter",
			}),
		})
	),

	informasi_tanah: z.string({ message: "Informasi tanah wajib diisi" }),
	batas_utara: z.string({ message: "Batas utara wajib diisi" }),
	batas_selatan: z.string({ message: "Batas selatan wajib diisi" }),
	batas_barat: z.string({ message: "Batas barat wajib diisi" }),
	batas_timur: z.string({ message: "Batas timur wajib diisi" }),
	luas_tanah: z.string({ message: "Luas tanah wajib diisi" }), // numeric(21,3)
	keliling: z.string({ message: "Keliling wajib diisi" }), // numeric(21,3)
	saksi_pemda: z.array(
		z.object({
			nama: z.string("Nama saksi pemda wajib diisi"),
			nik: z.string({ message: "NIK saksi pemda wajib diisi" }).length(16, {
				message: "NIK saksi pemda harus terdiri dari 16 karakter",
			}),
		})
	),

	sketch: z.string({ message: "Sketsa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
