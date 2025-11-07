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

	keperluan: z.string({ message: "Keperluan wajib diisi" }),

	jenis_tanah: z.string({ message: "Jenis tanah wajib diisi" }),
	luas_tanah: z.string({ message: "Luas tanah wajib diisi" }),
	bukti_kepemilikan_tanah: z.string({
		message: "Bukti kepemilikan tanah wajib diisi",
	}),
	nomor_bukti_kepemilikan: z.string({
		message: "Nomor bukti kepemilikan wajib diisi",
	}),
	atas_nama: z.string({ message: "Atas nama wajib diisi" }),
	asal_kepemilikan_tanah: z.string({
		message: "Asal kepemilikan tanah wajib diisi",
	}),
	bukti_kepemilikan_tanah_tanah: z.string({
		message: "Bukti kepemilikan tanah wajib diisi",
	}),
	batas_utara: z.string({ message: "Batas utara wajib diisi" }),
	batas_selatan: z.string({ message: "Batas selatan wajib diisi" }),
	batas_timur: z.string({ message: "Batas timur wajib diisi" }),
	batas_barat: z.string({ message: "Batas barat wajib diisi" }),

	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
