import AxiosClient from "@/provider/axios";
import type { SuratPayload } from "./surat.model";
import type { SuratSayaResponse } from "../../../../model";

export async function Surat(payload: SuratPayload): Promise<SuratSayaResponse> {
	const { data } = await AxiosClient.post(
		"/portal-warga/surat/kematian",
		payload
	);
	return data;
}
