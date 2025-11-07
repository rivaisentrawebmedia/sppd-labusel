import AxiosClient from "@/provider/axios";
import type { ReferensiResponse } from "./referensi.model";

export async function getPekerjaan(): Promise<ReferensiResponse> {
	const { data } = await AxiosClient.get<ReferensiResponse>(
		"/portal-warga/referensi/pekerjaan"
	);
	return data;
}

export async function getPendidikan(): Promise<ReferensiResponse> {
	const { data } = await AxiosClient.get<ReferensiResponse>(
		"/portal-warga/referensi/pendidikan"
	);
	return data;
}

export async function getSuku(): Promise<ReferensiResponse> {
	const { data } = await AxiosClient.get<ReferensiResponse>(
		"/portal-warga/referensi/suku"
	);
	return data;
}

export async function getStatusKawin(): Promise<ReferensiResponse> {
	const { data } = await AxiosClient.get<ReferensiResponse>(
		"/portal-warga/referensi/status-kawin"
	);
	return data;
}

export async function getDisabilitas(): Promise<ReferensiResponse> {
	const { data } = await AxiosClient.get<ReferensiResponse>(
		"/portal-warga/referensi/disabilitas"
	);
	return data;
}

export async function getAgama(): Promise<ReferensiResponse> {
	const { data } = await AxiosClient.get<ReferensiResponse>(
		"/portal-warga/referensi/agama"
	);
	return data;
}

export async function getJenisLaporan(): Promise<ReferensiResponse> {
	const { data } = await AxiosClient.get<ReferensiResponse>(
		"/portal-warga/referensi/jenis-laporan"
	);
	return data;
}

export async function getReferensi(
	referensi: string
): Promise<ReferensiResponse> {
	const { data } = await AxiosClient.get<ReferensiResponse>(
		`/portal-warga/referensi/${referensi}`
	);
	return data;
}
