import AxiosClient from "@/provider/axios";
import type { SuratPayload } from "./surat.model";
import type { SuratSayaResponse } from "../../../../model";

export async function Surat(payload: SuratPayload): Promise<SuratSayaResponse> {
	const finalPayload = {
		...payload,
		jumlah_pengikut: payload?.jumlah_pengikut
			? Number(payload.jumlah_pengikut)
			: 0,
	};
	const { data } = await AxiosClient.post(
		"/portal-warga/surat/domisili",
		finalPayload
	);
	return data;
}
