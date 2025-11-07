import AxiosClient from "@/provider/axios";
import type { SignUpPayload, SignUpResponse } from "./signup,model";

export async function signup(payload: SignUpPayload): Promise<SignUpResponse> {
	const { data } = await AxiosClient.post(
		"/portal-warga/auth/daftar-akun",
		payload
	);
	return data;
}
