import AxiosClient from "@/provider/axios";
import type {
	LaporanResponse,
	LaporanStatusResponse,
	LaporanJenisResponse,
	LaporanDetailResponse,
	LaporanPayload,
} from "./laporan.model";

export async function getLaporan(
	page: number,
	limit: number | undefined,
	search: string,
	status?: string,
	jenis_laporan_id?: string,
	start?: string,
	end?: string
): Promise<LaporanResponse> {
	const { data } = await AxiosClient.get<LaporanResponse>(
		"/portal-warga/laporan",
		{
			params: {
				page,
				limit,
				search,
				status,
				jenis_laporan_id,
				start,
				end,
			},
		}
	);
	return data;
}

export async function getLaporanByStatus(): Promise<LaporanStatusResponse> {
	const { data } = await AxiosClient.get<LaporanStatusResponse>(
		"/portal-warga/laporan/group-by-status"
	);
	return data;
}

export async function getLaporanByJenis(
	start: string | undefined,
	end: string | undefined
): Promise<LaporanJenisResponse> {
	const { data } = await AxiosClient.get<LaporanJenisResponse>(
		"/portal-warga/laporan/group-by-jenis",
		{
			params: { start, end },
		}
	);
	return data;
}

export async function getLaporanByID(
	id: string | undefined
): Promise<LaporanDetailResponse> {
	const { data } = await AxiosClient.get<LaporanDetailResponse>(
		`/portal-warga/laporan/${id}`
	);
	return data;
}

export async function laporan(
	payload: LaporanPayload
): Promise<LaporanResponse> {
	const { data } = await AxiosClient.post("/portal-warga/laporan", payload);
	return data;
}
