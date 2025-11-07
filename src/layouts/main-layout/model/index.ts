export type Profil = {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: string;
	created_by_id: string;
	updated_by_id: string;
	deleted_by_id: string;
	nama: string;
	email: string;
	password: string;
	photo: string;
	hp: string;
	jenis_kelamin: string;
	tanggal_nonactive: string;
	is_active: true;
	aplikasi: string;
};

export type ReferensiType = {
	label: string;
	value: string;
};
