import { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { surat, type CetakSuratPayload } from "../model";

export function usePostCetakSurat() {
	const queryClient = useQueryClient();

	const [loading, setLoading] = useState<boolean>(false);

	const onSubmitCetakSurat = async (surat_id: string) => {
		const payload: CetakSuratPayload = {
			surat_id: surat_id,
		};

		setLoading(true);

		try {
			await surat(payload);

			await queryClient.invalidateQueries({ queryKey: ["surat-saya"] });
		} catch (err: any) {
			const message =
				err?.response?.data?.message ||
				err?.response?.data?.errors?.email ||
				"Terjadi kesalahan, silakan coba lagi.";
			toast.error(message);
		} finally {
			setLoading(false);
		}
	};

	return {
		handleSave: onSubmitCetakSurat,
		loading: loading,
	};
}
