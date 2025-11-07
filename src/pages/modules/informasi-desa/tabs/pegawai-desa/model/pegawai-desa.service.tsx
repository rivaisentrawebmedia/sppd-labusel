import AxiosClient from "@/provider/axios";
import type { PegawaiDesaResponse } from "./pegawai-desa.model";

export async function getPegawaiDesa(): Promise<PegawaiDesaResponse> {
	const { data } = await AxiosClient.get<PegawaiDesaResponse>(
		"/portal-warga/informasi-desa/pegawai-desa"
	);
	return data;
}
