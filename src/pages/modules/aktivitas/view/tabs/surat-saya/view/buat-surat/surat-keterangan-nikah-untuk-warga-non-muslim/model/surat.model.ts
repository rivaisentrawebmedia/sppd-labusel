import { z } from "zod";

export const ResolverSurat = z.object({
	is_suami_warga_desa: z.boolean({ message: "wajib diisi" }),
	nik_suami: z
		.string({ message: "NIK suami wajib diisi" })
		.length(16, { message: "NIK suami harus terdiri dari 16 karakter" }),
	no_kk_suami: z.string({ message: "No KK Suami wajib diisi" }),
	nama_suami: z.string({ message: "Nama suami wajib diisi" }),
	tempat_lahir_suami: z.string({ message: "Tempat lahir suami wajib diisi" }),
	tanggal_lahir_suami: z.string({ message: "Tanggal lahir suami wajib diisi" }),
	kewarganegaraan_suami: z.string({
		message: "Kewarganegaraan suami wajib diisi",
	}),
	agama_suami_id: z.string({ message: "Agama suami wajib diisi" }),
	pekerjaan_suami: z.string({ message: "Pekerjaan suami wajib diisi" }),
	pendidikan_id_suami: z.string({ message: "Pendidikan suami wajib diisi" }),
	alamat_suami: z.string({ message: "Alamat suami wajib diisi" }),
	status_kawin_suami: z.string({ message: "Status kawin suami wajib diisi" }),
	perkawinan_ke_suami: z.string({
		message: " Perkawinan suami ke wajib diisi",
	}),
	paspor_suami: z.string().optional(),
	telepon_suami: z.string({ message: "No telepon suami wajib diisi" }),
	nama_organisasi_suami: z.string({
		message: "Nama organisasi suami wajib diisi",
	}),
	warga_negara_suami: z.string({ message: "Warga negara suami wajib diisi" }),
	istri_ke: z.string({ message: "Istri ke wajib diisi" }),
	anak_ke_suami: z.string({ message: "Anak ke wajib diisi" }),

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
	kewarganegaraan_ayah_suami: z.string({
		message: "Kewarganegaraan ayah suami wajib diisi",
	}),
	agama_ayah_suami_id: z.string({ message: "Agama ayah suami wajib diisi" }),
	pekerjaan_ayah_suami: z.string({
		message: "Pekerjaan ayah suami wajib diisi",
	}),
	alamat_ayah_suami: z.string({ message: "Alamat ayah suami wajib diisi" }),
	telepon_ayah_suami: z.string({
		message: "No telepon ayah suami wajib diisi",
	}),
	nama_organisasi_ayah_suami: z.string({
		message: "Nama organisasi ayah suami wajib diisi",
	}),
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
	kewarganegaraan_ibu_suami: z.string({
		message: "Kewarganegaraan ibu suami wajib diisi",
	}),
	agama_ibu_suami_id: z.string({ message: "Agama ibu suami wajib diisi" }),
	pekerjaan_ibu_suami: z.string({
		message: "Pekerjaan ibu suami wajib diisi",
	}),
	alamat_ibu_suami: z.string({ message: "Alamat ibu suami wajib diisi" }),
	telepon_ibu_suami: z.string({
		message: "No telepon ibu suami wajib diisi",
	}),
	nama_organisasi_ibu_suami: z.string({
		message: "Nama organisasi ibu suami wajib diisi",
	}),

	// ------------------------------------------------------------
	nik_istri_terdahulu: z.string().optional(),
	nama_istri_terdahulu: z.string().optional(),
	nama_ayah_istri_terdahulu: z.string().optional(),
	tempat_lahir_istri_terdahulu: z.string().optional(),
	tanggal_lahir_istri_terdahulu: z.string().optional(),
	kewarganegaraan_istri_terdahulu: z.string().optional(),
	agama_istri_terdahulu_id: z.string().optional(),
	pekerjaan_istri_terdahulu: z.string().optional(),
	alamat_istri_terdahulu: z.string().optional(),
	tanggal_meninggal_istri_terdahulu: z.string().optional(),
	tempat_meninggal_istri_terdahulu: z.string().optional(),

	// =============================================================
	is_istri_warga_desa: z.boolean({ message: "wajib diisi" }),
	nik_istri: z
		.string({ message: "NIK istri wajib diisi" })
		.length(16, { message: "NIK istri harus terdiri dari 16 karakter" }),
	no_kk_istri: z.string({ message: "No KK istri wajib diisi" }),
	nama_istri: z.string({ message: "Nama istri wajib diisi" }),
	tempat_lahir_istri: z.string({ message: "Tempat lahir istri wajib diisi" }),
	tanggal_lahir_istri: z.string({ message: "Tanggal lahir istri wajib diisi" }),
	kewarganegaraan_istri: z.string({
		message: "Kewarganegaraan istri wajib diisi",
	}),
	agama_istri_id: z.string({ message: "Agama istri wajib diisi" }),
	pekerjaan_istri: z.string({ message: "Pekerjaan istri wajib diisi" }),
	pendidikan_id_istri: z.string({ message: "Pendidikan istri wajib diisi" }),
	alamat_istri: z.string({ message: "Alamat istri wajib diisi" }),
	status_kawin_istri: z.string({ message: "Status kawin istri wajib diisi" }),
	perkawinan_ke_istri: z.string({
		message: " Perkawinan istri ke wajib diisi",
	}),
	paspor_istri: z.string().optional(),
	telepon_istri: z.string({ message: "No telepon istri wajib diisi" }),
	nama_organisasi_istri: z.string({
		message: "Nama organisasi istri wajib diisi",
	}),
	warga_negara_istri: z.string({ message: "Warga negara istri wajib diisi" }),
	anak_ke_istri: z.string({ message: "Anak ke wajib diisi" }),

	// --------------------------------------------------------------
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
	kewarganegaraan_ayah_istri: z.string({
		message: "Kewarganegaraan ayah istri wajib diisi",
	}),
	agama_ayah_istri_id: z.string({ message: "Agama ayah istri wajib diisi" }),
	pekerjaan_ayah_istri: z.string({
		message: "Pekerjaan ayah istri wajib diisi",
	}),
	alamat_ayah_istri: z.string({ message: "Alamat ayah istri wajib diisi" }),
	telepon_ayah_istri: z.string({
		message: "No telepon ayah istri wajib diisi",
	}),
	nama_organisasi_ayah_istri: z.string({
		message: "Nama organisasi ayah istri wajib diisi",
	}),
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
	kewarganegaraan_ibu_istri: z.string({
		message: "Kewarganegaraan ibu istri wajib diisi",
	}),
	agama_ibu_istri_id: z.string({ message: "Agama ibu istri wajib diisi" }),
	pekerjaan_ibu_istri: z.string({
		message: "Pekerjaan ibu istri wajib diisi",
	}),
	alamat_ibu_istri: z.string({ message: "Alamat ibu istri wajib diisi" }),
	telepon_ibu_istri: z.string({
		message: "No telepon ibu istri wajib diisi",
	}),
	nama_organisasi_ibu_istri: z.string({
		message: "Nama organisasi ibu istri wajib diisi",
	}),

	// ------------------------------------------------------------
	nik_suami_terdahulu: z.string().optional(),
	nama_suami_terdahulu: z.string().optional(),
	nama_ayah_suami_terdahulu: z.string().optional(),
	tempat_lahir_suami_terdahulu: z.string().optional(),
	tanggal_lahir_suami_terdahulu: z.string().optional(),
	kewarganegaraan_suami_terdahulu: z.string().optional(),
	agama_suami_terdahulu_id: z.string().optional(),
	pekerjaan_suami_terdahulu: z.string().optional(),
	alamat_suami_terdahulu: z.string().optional(),
	tanggal_meninggal_suami_terdahulu: z.string().optional(),
	tempat_meninggal_suami_terdahulu: z.string().optional(),

	// ========================================================
	is_saksi1_warga_desa: z.boolean({
		message: "Saksi 1 warga desa wajib diisi",
	}),
	nik_saksi1: z.string().optional(),
	nama_saksi1: z.string().optional(),
	nama_ayah_saksi1: z.string().optional(),
	tempat_lahir_saksi1: z.string().optional(),
	tanggal_lahir_saksi1: z.string().optional(),
	kewarganegaraan_saksi1: z.string().optional(),
	agama_saksi1_id: z.string().optional(),
	pekerjaan_saksi1: z.string().optional(),
	alamat_saksi1: z.string().optional(),
	nama_organisasi_saksi1: z.string().optional(),

	is_saksi2_warga_desa: z.boolean({
		message: "Saksi 2 warga desa wajib diisi",
	}),
	nik_saksi2: z.string().optional(),
	nama_saksi2: z.string().optional(),
	nama_ayah_saksi2: z.string().optional(),
	tempat_lahir_saksi2: z.string().optional(),
	tanggal_lahir_saksi2: z.string().optional(),
	kewarganegaraan_saksi2: z.string().optional(),
	agama_saksi2_id: z.string().optional(),
	pekerjaan_saksi2: z.string().optional(),
	alamat_saksi2: z.string().optional(),
	nama_organisasi_saksi2: z.string().optional(),

	tanggal_melapor_pernikahan: z.string({
		message: "Tanggal melapor pernikahan wajib diisi",
	}),
	tanggal_pemberkatan_pernikahan: z.string({
		message: "Tanggal pemberkatan pernikahan wajib diisi",
	}),
	agama_pernikahan_id: z.string({ message: "Agama pernikahan wajib diisi" }),
	badan_peradilan_pernikahan: z.string({
		message: "Badan peradilan pernikahan wajib diisi",
	}),
	nama_organisasi_pernikahan: z.string({
		message: "Nama organisasi pernikahan wajib diisi",
	}),
	nomor_putusan_pengadilan: z.string({
		message: "Nomor putusan pengadilan wajib diisi",
	}),
	tanggal_putusan_pengadilan: z.string({
		message: "Tanggal putusan pengadilan wajib diisi",
	}),
	nama_pemuka_agama: z.string({ message: "Nama pemukan agama wajib diisi" }),
	nomor_izin_perwakilan: z.string({
		message: "Nomor izin perwakilan wajib diisi",
	}),
	jumlah_anak_yang_diakui: z.string({
		message: "Jumlah anak yang diakui wajib diisi",
	}),

	anak: z.array(
		z.object({
			nama_anak: z.string("Nama anak wajib diisi"),
			tanggal_lahir_anak: z.string("Tanggal lahir anak wajib diisi"),
			no_akta_anak: z.string("No akta anak wajib diisi"),
		})
	),
	keperluan: z.string({
		message: "Keperluan yang diakui wajib diisi",
	}),
});

export type SuratPayload = z.infer<typeof ResolverSurat>;
