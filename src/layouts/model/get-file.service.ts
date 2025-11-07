import AxiosClient from "@/provider/axios";

export async function getFile(id: string): Promise<string> {
	const response = await AxiosClient.get(`/portal-warga/file/${id}`, {
		responseType: "blob", // <--- penting
	});
	const blobUrl = URL.createObjectURL(response.data); // ubah ke blob URL
	return blobUrl;
}
