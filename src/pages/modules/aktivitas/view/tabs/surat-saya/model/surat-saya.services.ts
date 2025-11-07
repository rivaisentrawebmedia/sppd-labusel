import AxiosClient from "@/provider/axios";
import type {
	SuratSayaResponse,
	SuratSayaStatusResponse,
	SuratSayaJenisResponse,
	CetakSuratPayload,
} from "./surat-saya.model";

export async function getSuratSaya(
	page: number,
	limit: number | undefined,
	search: string,
	status?: string,
	jenis_surat?: string,
	nama_surat?: string,
	start?: string,
	end?: string
): Promise<SuratSayaResponse> {
	const { data } = await AxiosClient.get<SuratSayaResponse>(
		"/portal-warga/surat",
		{
			params: {
				page,
				limit,
				search,
				status,
				jenis_surat,
				nama_surat,
				start,
				end,
			},
		}
	);
	return data;
}

export async function getSuratSayaByStatus(): Promise<SuratSayaStatusResponse> {
	const { data } = await AxiosClient.get<SuratSayaStatusResponse>(
		"/portal-warga/surat/group-by-status"
	);
	return data;
}

export async function getSuratSayaByJenis(
	start: string | undefined,
	end: string | undefined
): Promise<SuratSayaJenisResponse> {
	const { data } = await AxiosClient.get<SuratSayaJenisResponse>(
		"/portal-warga/surat/group-by-jenis",
		{
			params: { start, end },
		}
	);
	return data;
}

export async function surat(
	payload: CetakSuratPayload
): Promise<CetakSuratPayload> {
	const { data } = await AxiosClient.post(
		"/portal-warga/surat/keabsahan",
		payload
	);
	return data;
}
