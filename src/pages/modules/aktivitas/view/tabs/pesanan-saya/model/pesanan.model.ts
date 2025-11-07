import type { Meta } from "@/layouts/model";
import { z } from "zod";

export type PesananSaya = {
	id: string;
	created_at: string;
	status: string;
	jenis_produk: string;
	detail: Detail[];
};

export type Detail = {
	photo: string;
	qty: number;
	nama_produk: string;
	harga: string;
	id?: string;
	potogan?: string;
};

export type PesananSayaResponse = {
	data: PesananSaya[];
	meta: Meta;
};

export type PesananSayaDetail = {
	id: string;
	created_at: string;
	no_telp: string;
	detail: Detail[];
	metode_pembayaran: string;
	biaya_ongkir: string;
	serial_number: string;
	invoice: string;
	status: string;
	pengiriman: Pengiriman | undefined;
	jenis: string;
};

export type Pengiriman = {
	alamat: string;
	kurir: string;
	no_resi: string;
	tgl_tiba: string;
};

export type PesananSayaDetailResponse = {
	data: PesananSayaDetail;
	meta: Meta;
};

export type PesananSayaStatus = {
	status: string;
	total: number;
};

export type PesananSayaStatusResponse = {
	data: PesananSayaStatus[];
};

export type PesananSayaJenis = {
	id: string;
	jenis_produk: string;
	total: number;
	sub_jenis: {
		id: string;
		sub_jenis: string;
		total: number;
	}[];
};

export type PesananSayaJenisResponse = {
	data: PesananSayaJenis[];
};

export const ResolverPesanan = z.object({
	ulasan: z.string().optional(),
	jenis: z.string().optional(),
});

export type PesananPayload = z.infer<typeof ResolverPesanan>;
