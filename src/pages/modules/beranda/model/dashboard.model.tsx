import type { Meta } from "@/layouts/model";

export type Berita = {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	judul: string;
	gambar: Gambar[];
	isi: string;
	author: string;
	status: string;
	tanggal_publish: string;
	tanggal_arsip: string | null;
	view_count: number;
	kategori_berita_id: string;
	kategori_berita: string;
};

export type Gambar = {
	id: string;
	label: string;
};

export type BeritaResponse = {
	data: Berita[];
	meta: Meta;
};

export type Pengumuman = {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	kategori_pengumuman_id: string;
	nomor_pengumuman: string;
	isi: string;
	disahkan_oleh_id: string;
	disahkan_oleh: string;
	kategori_pengumuman: string;
};

export type PengumumanResponse = {
	data: Pengumuman[];
	meta: Meta;
};

export type AktivitasSaya = {
	id: string;
	created_at: string;
	warga_id: string;
	title: string;
	message: string;

	tipe_layanan: "surat" | "laporan" | "buku_tamu";

	// kalo tipe layanan persuratan
	surat_id?: string;
	jenis_surat?: string;

	// kalo tipe layanan laporan pemdes
	laporan_id?: string;
	jenis_laporan?: string;

	// kalo tipe layanan buku tamu
	buku_tamu_id?: string;
	tujuan_bertamu?: string;
	jenis_keperluan?: string;

	status: string;
};

export type AktivitasSayaResponse = {
	data: AktivitasSaya[];
	meta: Meta;
};
