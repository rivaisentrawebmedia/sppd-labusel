export type AnggotaKK = {
	id: string;
	created_at: string;
	updated_at: string;
	nama_warga: string;
	nik: string;
	email?: string | null;
	kepala_keluarga: string;
	alamat: string;
	no_telp: string;
	is_active: boolean;
	jenis_kelamin: string;
	agama_id: string;
	tanggal_lahir: string;
	tempat_lahir: string;
	pendidikan_id: string;
	pekerjaan_id: string;
	pekerjaan: string;
	suku_id: string;
	status_kawin_id: string;
	kewarganegaraan: string; // 'wni' | 'wna' | 'ganda'
	golongan_darah: string; // 'A' | 'B' | 'AB' | 'O'
	disabilitas_id?: string | null;
	no_kk: string;
	status_hubungan: string; // 'kepala_keluarga' | 'suami' | 'anak' | ...
	photo?: string | null;

	no_paspor: string;
	no_kitap: string;
	nama_ayah: string;
	nama_ibu: string;
	tanggal_perkawinan?: string | null;
	verified_at?: string | null;
	verified_by?: string | null;

	scan_ktp?: string | null;
	scan_kk?: string | null;
	selfie_ktp?: string | null;
};

export type AnggotaKKResponse = {
	data: AnggotaKK[];
};
