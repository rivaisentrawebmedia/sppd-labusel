import AxiosClient from "@/provider/axios";
import type {
	PesananSayaResponse,
	PesananSayaStatusResponse,
	PesananSayaJenisResponse,
	PesananSayaDetailResponse,
	PesananPayload,
} from "./pesanan.model";

export async function getPesananSaya(
	page: number,
	limit: number | undefined,
	search: string,
	status?: string,
	jenis_produk_id?: string,
	sub_jenis_id?: string,
	start?: string,
	end?: string
): Promise<PesananSayaResponse> {
	const { data } = await AxiosClient.get<PesananSayaResponse>(
		"/portal-warga/pesanan-saya",
		{
			params: {
				page,
				limit,
				search,
				status,
				jenis_produk_id,
				sub_jenis_id,
				start,
				end,
			},
		}
	);
	return data;
}

export async function getPesananSayaByStatus(): Promise<PesananSayaStatusResponse> {
	const { data } = await AxiosClient.get<PesananSayaStatusResponse>(
		"/portal-warga/pesanan-saya/group-by-status"
	);
	return data;
}

export async function getPesananSayaByJenis(
	start: string | undefined,
	end: string | undefined
): Promise<PesananSayaJenisResponse> {
	const { data } = await AxiosClient.get<PesananSayaJenisResponse>(
		"/portal-warga/pesanan-saya/group-by-jenis",
		{
			params: { start, end },
		}
	);
	return data;
}

export async function getPesananSayaById(
	id: string
): Promise<PesananSayaDetailResponse> {
	const { data } = await AxiosClient.get<PesananSayaDetailResponse>(
		`/portal-warga/pesanan-saya/${id}`
	);
	return data;
}

export async function pesanan(
	id: string,
	payload?: PesananPayload
): Promise<PesananSayaStatusResponse> {
	const { data } = await AxiosClient.post(
		`/portal-warga/pesanan-saya/${id}/${payload?.jenis}`,
		payload
	);
	return data;
}
