import type { Meta } from "@/layouts/model";
import { z } from "zod";

export type BukuTamu = {
	id: string;
	tanggal_kunjungan: string;
	jenis_keperluan_id: string;
	jenis_keperluan: string;
	tujuan_bertamu_id: string;
	tujuan_bertamu: string;
};

export type BukuTamuResponse = {
	data: BukuTamu[];
	meta: Meta;
};

export type BukuTamuByID = {
	id: string;
	created_at: string;
	updated_at: string;

	photo?: string | null;
	tanggal_kunjungan: string;
	nik: string;
	nama: string;
	no_hp: string;
	asal_tamu: string; // warga_desa | luar_desa | perwakilan_lembaga
	kota_atau_lembaga: string;
	alamat: string;
	jenis_keperluan_id: string;
	tujuan_betamu_id: string;

	jenis_keperluan: string;
	tujuan_bertamu: string;
	list_kuiosioner: DetailKuesioner[];
};

export type BukuTamuByIDResponse = {
	data: BukuTamuByID;
};

export type DetailKuesioner = {
	id: string;
	created_at: string;
	updated_at: string;
	jawaban: DetailJawaban[];
	judul: string;
	jenis_kuisioner: string; // "kuantitatif" | "kualitatif"
};

export type DetailJawaban = {
	id: string;
	created_at: string;
	updated_at: string;

	buku_tamu_id: string;
	kuisioner_id: string;
	soal_kuiosioner_id: string;
	jawaban: string; // ini label yg lu tampilin
	opsi: number; // 1–5
	jenis_kuisioner: string; // "kuantitatif" | "kualitatif"
	pertanyaan: string;
};

export type Kuesioner = {
	id: string;
	judul: string;
	jenis_kuisioner: "kualitatif" | "kuantitatif";
	soal: Soal[];
};
export type Soal = {
	id: string;
	pertanyaan: string;
	opsi?: {
		opsi_1: string;
		opsi_2: string;
		opsi_3: string;
		opsi_4: string;
		opsi_5: string;
	};

	jawaban?: string;
	selected_opsi?: 1 | 2 | 3 | 4 | 5;
};

export type KuesionerResponse = {
	data: Kuesioner[];
};

export const ResolverBukuTamu = z.object({
	tanggal_kunjungan: z.string({ message: "Tanggal kunjungan wajib diisi" }),
	jenis_keperluan_id: z.string({ message: "Jenis keperluan wajib diisi" }),
	tujuan_bertamu_id: z.string({ message: "Tujuan bertamu wajib diisi" }),
	kota_atau_lembaga: z.string().optional(),
	photo: z.string().optional(),
	id: z.string().optional(),
});

export type BukuTamuPayload = z.infer<typeof ResolverBukuTamu>;

export const ResolverKuesioner = z.object({
	jawaban: z.array(
		z.object({
			soal_kuisioner_id: z.string().optional(),
			opsi: z.number().optional(),
			jawaban: z.string().optional(),
		})
	),
	buku_tamu_id: z.string().optional(),
	kuisioner_id: z.string().optional(),
});

export type KuesionerPayload = z.infer<typeof ResolverKuesioner>;
