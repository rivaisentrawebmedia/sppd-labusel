import { z } from "zod";

export const ResolverSurat = z.object({
	nik: z
		.string({ message: "NIK wajib diisi" })
		.length(16, { message: "NIK harus terdiri dari 16 karakter" }),
	nama: z.string({ message: "Nama wajib diisi" }),
	alamat: z.string({ message: "Alamat wajib diisi" }),
	keperluan: z.string({ message: "Keperluan wajib diisi" }),

	nik_ortu: z
		.string({ message: "NIK ortu wajib diisi" })
		.length(16, { message: "NIK ortu harus terdiri dari 16 karakter" }),
	nama_ortu: z.string({ message: "Nama ortu wajib diisi" }),
	tempat_lahir_ortu: z.string({ message: "Tempat lahir ortu wajib diisi" }),
	tanggal_lahir_ortu: z.string({ message: "Tanggal lahir ortu wajib diisi" }), // yyyy-mm-dd
	jenis_kelamin_ortu: z.string({ message: "Jenis kelamin ortu wajib diisi" }),
	pekerjaan_ortu: z.string({ message: "Pekerjaan ortu wajib diisi" }),
	alamat_ortu: z.string({ message: "Alamat ortu wajib diisi" }),
	penghasilan_ortu: z.string({ message: "Penghasilan ortu wajib diisi" }),
	tanggungan_ortu: z.string({ message: "Tanggungan ortu wajib diisi" }),

	nik_anak: z
		.string({ message: "NIK anak wajib diisi" })
		.length(16, { message: "NIK anak harus terdiri dari 16 karakter" }),
	nama_anak: z.string({ message: "Nama anak wajib diisi" }),
	tempat_lahir_anak: z.string({ message: "Tempat lahir anak wajib diisi" }),
	tanggal_lahir_anak: z.string({ message: "Tanggal lahir anak wajib diisi" }), // yyyy-mm-dd
	jenis_kelamin_anak: z.string({ message: "Jenis kelamin anak wajib diisi" }),
	nama_sekolah_anak: z.string({ message: "Nama sekolah anak wajib diisi" }),
	kelas_anak: z.string({ message: "Kelas anak wajib diisi" }),

	is_warga_desa: z.boolean({ message: "Warga desa wajib diisi" }),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
