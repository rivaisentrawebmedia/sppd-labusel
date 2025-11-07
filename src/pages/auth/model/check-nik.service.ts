import AxiosClient from "@/provider/axios";
import type { CheckNIKPayload, CheckNIKResponse } from "./check-nik.model";

export async function checknik(
	payload: CheckNIKPayload
): Promise<CheckNIKResponse> {
	const { data } = await AxiosClient.post(
		"/portal-warga/auth/cek-duplikat-nik",
		payload
	);
	return data;
}
