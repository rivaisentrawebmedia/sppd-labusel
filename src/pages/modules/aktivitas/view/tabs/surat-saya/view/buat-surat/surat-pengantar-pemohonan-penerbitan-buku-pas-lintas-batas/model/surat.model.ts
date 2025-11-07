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
	status_kawin_id: z.string({ message: "Status kawin wajib diisi" }),
	kewarganegaraan: z.string({ message: "Kewarganegaraan wajib diisi" }),
	agama_id: z.string({ message: "Agama wajib diisi" }),
	no_kk: z.string({ message: "No KK wajib diisi" }),
	kepala_keluarga: z.string({ message: "Kepala keluarga wajib diisi" }),

	anggota_keluarga: z.array(
		z.object({
			nama: z.string("Nama wajib diisi"),
			nik: z.string({ message: "NIK wajib diisi" }).length(16, {
				message: "NIK harus terdiri dari 16 karakter",
			}),
			jenis_kelamin: z.string("Jenis kelamin wajib diisi"),
			hubungan: z.string("Hubungan wajib diisi"),
			tempat_lahir: z.string("Tempat lahir wajib diisi"),
			tanggal_lahir: z.string("Tanggal lahir wajib diisi"),
			no_kk: z.string("No KK wajib diisi"),
			keterangan: z.string("Keterangan wajib diisi"),
		})
	),

	keperluan: z.string({ message: "Keperluan wajib diisi" }),
	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
