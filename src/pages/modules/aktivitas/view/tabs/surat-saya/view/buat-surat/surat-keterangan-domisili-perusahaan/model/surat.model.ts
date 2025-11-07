import { z } from "zod";

export const ResolverSurat = z.object({
	nik: z
		.string({ message: "NIK wajib diisi" })
		.length(16, { message: "NIK harus terdiri dari 16 karakter" }),
	nama: z.string({ message: "Nama wajib diisi" }),
	tempat_lahir: z.string({ message: "Tempat lahir wajib diisi" }),
	tanggal_lahir: z.string({ message: "Tanggal lahir wajib diisi" }),
	alamat: z.string({ message: "Alamat wajib diisi" }),
	agama_id: z.string({ message: "Agama wajib diisi" }),
	jenis_kelamin: z.string({ message: "Jenis Kelamin wajib diisi" }),
	pekerjaan: z.string({ message: "Pekerjaan wajib diisi" }),

	nama_perusahaan: z.string({ message: "Nama perusahaan wajib diisi" }),
	nomor_akta_pendirian: z.string({
		message: "Nomor akta pendirian wajib diisi",
	}),
	nib: z.string({ message: "NIB wajib diisi" }),
	jenis_usaha_id: z.string({ message: "Jenis usaha wajib diisi" }),
	bidang_usaha_id: z.string({ message: "Bidang usaha wajib diisi" }),
	status_kepemilikan_bangunan: z.string({
		message: "Status kepemilikan bangnan wajib diisi",
	}),
	jumlah_karyawan: z.string({ message: "jumlah karyawan wajib diisi" }),
	alamat_perusahaan: z.string({ message: "Alamat perusahaan wajib diisi" }),

	// wajib jika bukan warga desa
	warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
	peruntukan_bangunan: z.string({ message: "Peruntukan bangunan wajib diisi" }),
	luas_tanah: z.string({ message: "Luas tanah wajib diisi" }),
	luas_bangunan: z.string({ message: "Luas bangunan wajib diisi" }),
	npwp: z.string({ message: "NPWP wajib diisi" }),
	keperluan: z.string({ message: "Keperluan wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
