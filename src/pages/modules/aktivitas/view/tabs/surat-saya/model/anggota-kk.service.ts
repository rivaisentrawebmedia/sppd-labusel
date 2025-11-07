import AxiosClient from "@/provider/axios";
import type { AnggotaKKResponse } from "./anggota-kk.model";

export async function getAnggotaKK(): Promise<AnggotaKKResponse> {
	const { data } = await AxiosClient.get<AnggotaKKResponse>(
		"/portal-warga/referensi/anggota-kk?page=1"
	);
	return data;
}
