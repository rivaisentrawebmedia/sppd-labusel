import type { Meta } from "@/layouts/model";
import type { ResKotakSuratDetailType } from "./surat.model";
import type { ResKopSuratType } from "./kop-surat.model";
import type { ResProfilDesaType } from "./profil-desa.model";

export type SuratSaya = {
	id: string;
	tanggal_diajukan: string;
	jenis_surat: string;
	nama_surat: string;
	status: string;
	detail: ResKotakSuratDetailType;
	kop_surat: ResKopSuratType;
	profil_desa: ResProfilDesaType;
};

export type SuratSayaResponse = {
	data: SuratSaya[];
	meta: Meta;
};

export type SuratSayaStatus = {
	menunggu: number;
	diproses: number;
	selesai: number;
	dibatalkan: number;
};

export type SuratSayaStatusResponse = {
	data: SuratSayaStatus;
};

export type SuratSayaJenis = {
	jenis_keterangan: string;
	total: number;
	list_nama_surat: {
		nama_surat: string;
		total: number;
	}[];
};

export type SuratSayaJenisResponse = {
	data: SuratSayaJenis[];
};

export type CetakSuratPayload = {
	surat_id: string;
};
