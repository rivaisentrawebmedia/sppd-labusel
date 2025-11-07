import AxiosClient from "@/provider/axios";
import type { SuratPayload } from "./surat.model";
import type { SuratSayaResponse } from "../../../../model";

export async function Surat(payload: SuratPayload): Promise<SuratSayaResponse> {
	const finalPayload = {
		...payload,
		penghasilan_ortu: payload?.penghasilan_ortu
			? Number(payload.penghasilan_ortu)
			: 0,
		tanggungan_ortu: payload?.tanggungan_ortu
			? Number(payload.tanggungan_ortu)
			: 0,
	};

	const { data } = await AxiosClient.post(
		"/portal-warga/surat/penghasilan",
		finalPayload
	);
	return data;
}
