import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { uploadFile } from "../model/upload-file.service";
import { useQueryClient } from "@tanstack/react-query";

export function usePostUploadFile() {
	const [loading, setLoading] = useState(false);
	const queryClient = useQueryClient();

	const onSubmitUploadFile = async ({
		form,
		fields,
		file,
	}: {
		form: UseFormReturn<any>;
		fields: string;
		file: File;
	}) => {
		if (!file) {
			toast.error("Tidak ada file yang dipilih");
			return;
		}

		setLoading(true);
		const toastId = toast.loading("Mengunggah file...");

		try {
			const res = await uploadFile(file);

			// ✅ invalidate query ['file'] agar data terbaru diambil ulang
			await queryClient.invalidateQueries({ queryKey: ["file"] });

			toast.update(toastId, {
				render: "Unggah file berhasil",
				type: "success",
				isLoading: false,
				autoClose: 2000,
				closeOnClick: true,
			});

			// Simpan hasil ke form
			form.setValue(fields, res?.data?.id);
		} catch (err: any) {
			console.error(err);

			toast.update(toastId, {
				render:
					err?.response?.data?.message ||
					"Terjadi kesalahan saat mengunggah file.",
				type: "error",
				isLoading: false,
				autoClose: 3000,
				closeOnClick: true,
			});
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		onSubmitUploadFile,
	};
}
