import AxiosClient from "@/provider/axios";
import type { SuratPayload } from "./surat.model";
import type { SuratSayaResponse } from "../../../../model";

export async function Surat(payload: SuratPayload): Promise<SuratSayaResponse> {
	const finalPayload = {
		...payload,
		jumlah_anggota: payload?.jumlah_anggota
			? Number(payload.jumlah_anggota)
			: 0,
	};
	const { data } = await AxiosClient.post(
		"/portal-warga/surat/pindah-domisili",
		finalPayload
	);
	return data;
}
