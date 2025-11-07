import AxiosClient from "@/provider/axios";
import type {
	AktivitasSayaResponse,
	BeritaResponse,
	PengumumanResponse,
} from "./dashboard.model";

export async function getBerita(
	page: number,
	limit: number | undefined,
	search: string
): Promise<BeritaResponse> {
	const { data } = await AxiosClient.get<BeritaResponse>("/portal-warga/blog", {
		params: {
			page,
			limit,
			search,
		},
	});
	return data;
}

export async function getPengumuman(
	page: number,
	limit: number | undefined,
	search: string
): Promise<PengumumanResponse> {
	const { data } = await AxiosClient.get<PengumumanResponse>(
		"/portal-warga/pengumuman",
		{
			params: {
				page,
				limit,
				search,
			},
		}
	);
	return data;
}

export async function getAktivitasSaya(
	page: number,
	limit: number | undefined,
	search: string
): Promise<AktivitasSayaResponse> {
	const { data } = await AxiosClient.get<AktivitasSayaResponse>(
		"/portal-warga/aktifitas-saya",
		{
			params: {
				page,
				limit,
				search,
			},
		}
	);
	return data;
}
