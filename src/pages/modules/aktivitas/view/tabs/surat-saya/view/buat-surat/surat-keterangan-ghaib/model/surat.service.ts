import AxiosClient from "@/provider/axios";
import type { SuratPayload } from "./surat.model";
import type { SuratSayaResponse } from "../../../../model";

export async function Surat(payload: SuratPayload): Promise<SuratSayaResponse> {
	const finalPayload = {
		...payload,
		usia: payload?.usia ? Number(payload.usia) : 0,
	};

	const { data } = await AxiosClient.post(
		"/portal-warga/surat/ghaib",
		finalPayload
	);
	return data;
}
