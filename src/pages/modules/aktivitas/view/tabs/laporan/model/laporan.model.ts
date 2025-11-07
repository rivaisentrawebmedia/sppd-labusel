import type { Meta } from "@/layouts/model";
import { z } from "zod";

export type Laporan = {
	id: string;
	tanggal_laporan: string;
	jenis_laporan: string;
	id_jenis_laporan: string;
	isi: string;
	status: string;
};

export type LaporanResponse = {
	data: Laporan[];
	meta: Meta;
};

export type LaporanStatus = {
	status: string;
	total: number;
};

export type LaporanStatusResponse = {
	data: LaporanStatus[];
};

export type LaporanJenis = {
	id: string;
	jenis_laporan: string;
	total: number;
};

export type LaporanJenisResponse = {
	data: LaporanJenis[];
};

export type LaporanDetail = {
	id: string;
	tanggal_laporan: string;
	jenis_laporan: string;
	id_jenis_laporan: string;
	status: string;
	perihal: string;
	lokasi: string;
	isi: string;
	dampak: string[];
	tindakan_diharapkan: string[];
	photo_bukti: string[];

	photo_pelapor: string;
	nama: string;
	alamat: string;
	no_telp: string;
	created_at: string;
};

export type LaporanDetailResponse = {
	data: LaporanDetail;
};

export const ResolverLaporan = z.object({
	id_jenis_laporan: z.string({ message: "Jenis Laporan wajib diisi" }),
	perihal: z.string({ message: "Perihal wajib diisi" }),
	lokasi: z.string({ message: "Lokasi wajib diisi" }),
	isi: z.string({ message: "Isi wajib diisi" }),
	dampak: z.array(z.string({ message: "Dampak wajib diisi" })),
	tindakan_diharapkan: z.array(z.string({ message: "Tindakan wajib diisi" })),
	photo_bukti: z.array(z.string()).optional(),
});

export type LaporanPayload = z.infer<typeof ResolverLaporan>;
