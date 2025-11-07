import AxiosClient from "@/provider/axios";
import type {
	BukuTamu,
	BukuTamuByIDResponse,
	BukuTamuPayload,
	BukuTamuResponse,
	Kuesioner,
	KuesionerPayload,
	KuesionerResponse,
} from "./buku-tamu.model";

export async function getBukuTamu(
	page: number,
	limit: number | undefined,
	search: string
): Promise<BukuTamuResponse> {
	const { data } = await AxiosClient.get<BukuTamuResponse>(
		"/portal-warga/buku-tamu",
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

export async function getBukuTamuByID(
	buku_tamu_id: string
): Promise<BukuTamuByIDResponse> {
	const { data } = await AxiosClient.get<BukuTamuByIDResponse>(
		`/portal-warga/buku-tamu/${buku_tamu_id}`
	);
	return data;
}

export async function getKuesioner(
	buku_tamu_id: string
): Promise<KuesionerResponse> {
	const { data } = await AxiosClient.get<KuesionerResponse>(
		"/portal-warga/buku-tamu/kuisioner",
		{
			params: {
				buku_tamu_id,
			},
		}
	);
	return data;
}

export async function bukuTamu(
	payload: BukuTamuPayload
): Promise<{ data: BukuTamu }> {
	const { data } = await AxiosClient.post("/portal-warga/buku-tamu", payload);
	return data;
}

export async function kuesioner(
	payload: KuesionerPayload
): Promise<{ data: Kuesioner }> {
	const { data } = await AxiosClient.post(
		"/portal-warga/buku-tamu/kuisioner",
		payload
	);
	return data;
}
