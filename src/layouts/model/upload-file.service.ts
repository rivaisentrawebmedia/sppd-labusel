import AxiosClient from "@/provider/axios";
import type { UploadFileResponse } from "./upload-file.model";

export async function uploadFile(file: File): Promise<UploadFileResponse> {
	const formData = new FormData();
	formData.append("file", file);

	const { data } = await AxiosClient.post("/portal-warga/file", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
}
