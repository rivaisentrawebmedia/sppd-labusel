import { z } from "zod";

export const ResolverSurat = z.object({
	keperluan: z.string({ message: "Keperluan wajib diisi" }),

	// signature
	perbedaan_id: z.string({ message: "Perbedaan wajib diisi" }),
	tercantum_id: z.string({ message: "Tercantum 1 wajib diisi" }),
	tercantum_id_2: z.string({ message: "Tercantum 2 wajib diisi" }),

	nomor_1: z.string({ message: "Nomor 1 wajib diisi" }),
	nomor_2: z.string({ message: "Nomor 2 wajib diisi" }),

	nama_1: z.string({ message: "Nama 1 wajib diisi" }),
	nama_2: z.string({ message: "Nama 2 wajib diisi" }),

	tempat_lahir_1: z.string({ message: "Tempat lahir 1 wajib diisi" }),
	tempat_lahir_2: z.string({ message: "Tempat lahir 2 wajib diisi" }),

	tanggal_lahir_1: z.string({ message: "Tanggal lahir 1 wajib diisi" }),
	tanggal_lahir_2: z.string({ message: "Tanggal lahir 2 wajib diisi" }),

	alamat_1: z.string({ message: "Alamat 1 wajib diisi" }),
	alamat_2: z.string({ message: "Alamat 2 wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
