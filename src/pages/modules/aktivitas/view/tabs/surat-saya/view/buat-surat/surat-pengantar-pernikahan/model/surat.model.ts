import { z } from "zod";

export const ResolverSurat = z.object({
	nik_suami: z
		.string({ message: "NIK suami wajib diisi" })
		.length(16, { message: "NIK suami harus terdiri dari 16 karakter" }),
	nama_suami: z.string({ message: "Nama suami wajib diisi" }),
	tempat_lahir_suami: z.string({ message: "Tempat lahir suami wajib diisi" }),
	tanggal_lahir_suami: z.string({ message: "Tanggal lahir suami wajib diisi" }),
	alamat_suami: z.string({ message: "Alamat suami wajib diisi" }),
	pekerjaan_suami: z.string({ message: "Pekerjaan suami wajib diisi" }),
	kewarganegaraan_suami: z.string({
		message: "Kewarganegaraan suami wajib diisi",
	}),
	agama_suami_id: z.string({ message: "Agama suami wajib diisi" }),
	status_kawin_suami: z.string({ message: "Status kawin suami wajib diisi" }),
	jumlah_istri: z.string().optional(),
	nama_istri_sebelumnya: z.string().optional(),

	// --------------------------------------------------------------------
	nik_ayah_suami: z
		.string({ message: "NIK ayah suami wajib diisi" })
		.length(16, { message: "NIK ayah suami harus terdiri dari 16 karakter" }),
	nama_ayah_suami: z.string({ message: "Nama ayah suami wajib diisi" }),
	tempat_lahir_ayah_suami: z.string({
		message: "Tempat lahir ayah suami wajib diisi",
	}),
	tanggal_lahir_ayah_suami: z.string({
		message: "Tanggal lahir ayah suami wajib diisi",
	}),
	alamat_ayah_suami: z.string({ message: "Alamat ayah suami wajib diisi" }),
	pekerjaan_ayah_suami: z.string({
		message: "Pekerjaan ayah suami wajib diisi",
	}),
	kewarganegaraan_ayah_suami: z.string({
		message: "Kewarganegaraan ayah suami wajib diisi",
	}),
	agama_ayah_suami_id: z.string({ message: "Agama ayah suami wajib diisi" }),

	// -----------------------------------------------------------------
	nik_ibu_suami: z
		.string({ message: "NIK ibu suami wajib diisi" })
		.length(16, { message: "NIK ibu suami harus terdiri dari 16 karakter" }),
	nama_ibu_suami: z.string({ message: "Nama ibu suami wajib diisi" }),
	tempat_lahir_ibu_suami: z.string({
		message: "Tempat lahir ibu suami wajib diisi",
	}),
	tanggal_lahir_ibu_suami: z.string({
		message: "Tanggal lahir ibu suami wajib diisi",
	}),
	alamat_ibu_suami: z.string({ message: "Alamat ibu suami wajib diisi" }),
	pekerjaan_ibu_suami: z.string({
		message: "Pekerjaan ibu suami wajib diisi",
	}),
	kewarganegaraan_ibu_suami: z.string({
		message: "Kewarganegaraan ibu suami wajib diisi",
	}),
	agama_ibu_suami_id: z.string({ message: "Agama ibu suami wajib diisi" }),

	// =============================================================================-
	nik_istri: z
		.string({ message: "NIK istri wajib diisi" })
		.length(16, { message: "NIK istri harus terdiri dari 16 karakter" }),
	nama_istri: z.string({ message: "Nama istri wajib diisi" }),
	tempat_lahir_istri: z.string({ message: "Tempat lahir istri wajib diisi" }),
	tanggal_lahir_istri: z.string({ message: "Tanggal lahir istri wajib diisi" }),
	alamat_istri: z.string({ message: "Alamat istri wajib diisi" }),
	pekerjaan_istri: z.string({ message: "Pekerjaan istri wajib diisi" }),
	kewarganegaraan_istri: z.string({
		message: "Kewarganegaraan istri wajib diisi",
	}),
	agama_istri_id: z.string({ message: "Agama istri wajib diisi" }),
	status_kawin_istri: z.string({ message: "Status kawin istri wajib diisi" }),

	nama_suami_sebelumnya: z.string().optional(),

	// --------------------------------------------------------------------
	nik_ayah_istri: z
		.string({ message: "NIK ayah istri wajib diisi" })
		.length(16, { message: "NIK ayah istri harus terdiri dari 16 karakter" }),
	nama_ayah_istri: z.string({ message: "Nama ayah istri wajib diisi" }),
	tempat_lahir_ayah_istri: z.string({
		message: "Tempat lahir ayah istri wajib diisi",
	}),
	tanggal_lahir_ayah_istri: z.string({
		message: "Tanggal lahir ayah istri wajib diisi",
	}),
	alamat_ayah_istri: z.string({ message: "Alamat ayah istri wajib diisi" }),
	pekerjaan_ayah_istri: z.string({
		message: "Pekerjaan ayah istri wajib diisi",
	}),
	kewarganegaraan_ayah_istri: z.string({
		message: "Kewarganegaraan ayah istri wajib diisi",
	}),
	agama_ayah_istri_id: z.string({ message: "Agama ayah istri wajib diisi" }),

	// -----------------------------------------------------------------
	nik_ibu_istri: z
		.string({ message: "NIK ibu istri wajib diisi" })
		.length(16, { message: "NIK ibu istri harus terdiri dari 16 karakter" }),
	nama_ibu_istri: z.string({ message: "Nama ibu istri wajib diisi" }),
	tempat_lahir_ibu_istri: z.string({
		message: "Tempat lahir ibu istri wajib diisi",
	}),
	tanggal_lahir_ibu_istri: z.string({
		message: "Tanggal lahir ibu istri wajib diisi",
	}),
	alamat_ibu_istri: z.string({ message: "Alamat ibu istri wajib diisi" }),
	pekerjaan_ibu_istri: z.string({
		message: "Pekerjaan ibu istri wajib diisi",
	}),
	kewarganegaraan_ibu_istri: z.string({
		message: "Kewarganegaraan ibu istri wajib diisi",
	}),
	agama_ibu_istri_id: z.string({ message: "Agama ibu istri wajib diisi" }),

	// ==============================================================================
	hari: z.string().optional(),
	tanggal: z.string({
		message: "Tanggal wajib diisi",
	}),
	jam: z.string({
		message: "Jam wajib diisi",
	}),
	tempat: z.string({
		message: "Tempat wajib diisi",
	}),

	is_warga_desa: z.boolean({
		message: "Warga desa wajib diisi",
	}),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
