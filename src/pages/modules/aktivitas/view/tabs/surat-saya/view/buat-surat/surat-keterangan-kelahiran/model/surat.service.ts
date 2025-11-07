import AxiosClient from "@/provider/axios";
import type { SuratPayload } from "./surat.model";
import type { SuratSayaResponse } from "../../../../model";

export async function Surat(payload: SuratPayload): Promise<SuratSayaResponse> {
	const finalPayload = {
		...payload,
		anak_ke: payload?.anak_ke ? Number(payload.anak_ke) : 0,
	};

	const { data } = await AxiosClient.post(
		"/portal-warga/surat/kelahiran",
		finalPayload
	);
	return data;
}
