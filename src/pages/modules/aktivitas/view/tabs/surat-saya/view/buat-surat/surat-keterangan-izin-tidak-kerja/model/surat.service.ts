import AxiosClient from "@/provider/axios";
import type { SuratPayload } from "./surat.model";
import type { SuratSayaResponse } from "../../../../model";

export async function Surat(payload: SuratPayload): Promise<SuratSayaResponse> {
	const finalPayload = {
		...payload,

		lama: payload?.lama ? Number(payload.lama) : 0,
	};
	const { data } = await AxiosClient.post(
		"/portal-warga/surat/izin-tidak-kerja",
		finalPayload
	);
	return data;
}
