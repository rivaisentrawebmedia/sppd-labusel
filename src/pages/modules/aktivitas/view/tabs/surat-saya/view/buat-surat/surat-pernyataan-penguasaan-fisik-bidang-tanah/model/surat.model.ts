import { z } from "zod";

export const ResolverSurat = z.object({
	is_pemohon_warga_desa: z.boolean({
		message: "Pemohon warga desa wajib diisi",
	}),
	nik_pemohon: z
		.string({ message: "NIK pemohon wajib diisi" })
		.length(16, { message: "NIK pemohon harus terdiri dari 16 karakter" }),
	nama_pemohon: z.string({ message: "Nama pemohon wajib diisi" }),
	tanggal_lahir_pemohon: z.string({
		message: "Tanggal lahir pemohon wajib diisi",
	}),
	tempat_lahir_pemohon: z.string({
		message: "Tempat lahir pemohon wajib diisi",
	}),
	alamat: z.string({ message: "wajib diisi" }),
	pekerjaan: z.string({ message: "wajib diisi" }),

	is_saksi1_warga_desa: z.boolean({
		message: "Saksi 1 warga desa wajib diisi",
	}),
	nik_1: z
		.string({ message: "NIK saksi 1 wajib diisi" })
		.length(16, { message: "NIK saksi 1 harus terdiri dari 16 karakter" }),
	nama_1: z.string({ message: "Nama saksi 1 wajib diisi" }),
	pekerjaan_1: z.string({ message: "Pekerjaan saksi 1 wajib diisi" }),
	alamat_1: z.string({ message: "Alamat saksi 1 wajib diisi" }),

	is_saksi2_warga_desa: z.boolean({
		message: "Saksi 2 warga desa wajib diisi",
	}),
	nik_2: z
		.string({ message: "NIK saksi 1 wajib diisi" })
		.length(16, { message: "NIK saksi 2 harus terdiri dari 16 karakter" }),
	nama_2: z.string({ message: "Nama saksi 2 wajib diisi" }),
	pekerjaan_2: z.string({ message: "Pekerjaan saksi 2 wajib diisi" }),
	alamat_2: z.string({ message: "Alamat saksi 2 wajib diisi" }),

	jalan: z.string({ message: "Jalan wajib diisi" }),
	rt_rw: z.string({ message: "RT RW wajib diisi" }),
	desa: z.string({ message: "Desa wajib diisi" }),
	kecamatan: z.string({ message: "Kecamatan wajib diisi" }),
	kabupaten: z.string({ message: "Kabupaten wajib diisi" }),
	nib: z.string({ message: "NIB wajib diisi" }),
	luas_tanah: z.string({ message: "Luas tanah wajib diisi" }),
	status_tanah: z.string({ message: "Status tanah wajib diisi" }),
	diperoleh_dari: z.string({ message: "Diperoleh dari wajib diisi" }),
	diperoleh_sejak: z.string({ message: "Diperoleh sejak wajib diisi" }),
	diperoleh_dengan: z.string({ message: "Diperoleh dengan wajib diisi" }),

	dipergunakan: z.string({ message: "Dipergunakan wajib diisi" }),

	batas_utara: z.string({ message: "Batas utara wajib diisi" }),
	batas_selatan: z.string({ message: "Batas selatan wajib diisi" }),
	batas_barat: z.string({ message: "Batas barat wajib diisi" }),
	batas_timur: z.string({ message: "Batas timur wajib diisi" }),

	keperluan: z.string({ message: "Keperluan wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
