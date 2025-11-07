export type ProfilDesa = {
	organisasi_id: string;
	kabupaten: string;
	kecamatan: string;
	alamat: string;
	kode_wilayah: string;
	kode_pos: string;
	no_telp: string;
	email: string;
	web_url: string;
	photo: string;
};

export type ProfilDesaResponse = {
	data: ProfilDesa;
};
