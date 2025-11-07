export type PegawaiDesa = {
	pegawai_id: string;
	jabatan: string;
	photo: string;
	nama: string;
	no_telp: string;
	email: string;
};

export type PegawaiDesaResponse = {
	data: PegawaiDesa[];
};
