import AxiosClient from "@/provider/axios";
import type { ProfilPayload, ProfilResponse } from "./profil.model";

export async function getProfil(): Promise<ProfilResponse> {
	const { data } = await AxiosClient.get<ProfilResponse>(
		"/portal-warga/profil-saya"
	);
	return data;
}

export async function profil(payload: ProfilPayload): Promise<ProfilResponse> {
	const { data } = await AxiosClient.post("/portal-warga/profil-saya", payload);
	return data;
}
