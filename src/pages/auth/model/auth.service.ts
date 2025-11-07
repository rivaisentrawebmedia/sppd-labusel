import AxiosClient from "@/provider/axios";
import type { LoginPayload, LoginResponse } from "./auth.model";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
	const { data } = await AxiosClient.post("/portal-warga/auth/login", payload);
	return data;
}
