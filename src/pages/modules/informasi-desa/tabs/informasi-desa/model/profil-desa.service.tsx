import AxiosClient from "@/provider/axios";
import type { ProfilDesaResponse } from "./profil-desa.model";

export async function getProfilDesa(): Promise<ProfilDesaResponse> {
	const { data } = await AxiosClient.get<ProfilDesaResponse>(
		"/portal-warga/informasi-desa/profil-desa"
	);
	return data;
}
