export type Referensi = {
	id: string;
	nama: string;
};

export type ReferensiResponse = {
	data: Referensi[];
};

export type Meta = {
	total: number;
	last_page: number;
};
