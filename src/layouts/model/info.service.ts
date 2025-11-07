import AxiosClient from "@/provider/axios";
import type { PublikInfoResponse } from "./info.model";

export async function getPublikInfo(): Promise<PublikInfoResponse> {
	const { data } = await AxiosClient.get<PublikInfoResponse>(
		"/portal-warga/auth/publik-info"
	);
	return data;
}
