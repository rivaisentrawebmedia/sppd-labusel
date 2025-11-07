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
	alamat_pindah: z.string({ message: "Alamat pindah wajib diisi" }),
	alasan_pindah: z.string({ message: "Alasan pundah wajib diisi" }),
	jumlah_anggota: z.string({ message: "Jumlah anggota wajib diisi" }),

	keperluan: z.string({ message: "Keperluan wajib diisi" }),

	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
