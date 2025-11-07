import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { laporan, ResolverLaporan, type LaporanPayload } from "../model";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function usePostLaporan() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const [loading, setLoading] = useState<boolean>(false);
	const [isShow, setIsShow] = useState<boolean>(false);

	const form = useForm<LaporanPayload>({
		resolver: zodResolver(ResolverLaporan),
	});

	const onSubmitLaporan = async () => {
		const values = form.getValues();

		const payload: LaporanPayload = {
			dampak: values?.dampak?.map((item) => {
				return item;
			}),
			id_jenis_laporan: values?.id_jenis_laporan,
			isi: values?.isi,
			lokasi: values?.lokasi,
			perihal: values?.perihal,
			tindakan_diharapkan: values?.tindakan_diharapkan?.map((item) => {
				return item;
			}),
			photo_bukti: values?.photo_bukti,
		};

		setLoading(true);

		if (!isShow) {
			toast.error("Terdapat kesalahan.");
			setLoading(false);
			return;
		}

		try {
			await laporan(payload);

			await queryClient.invalidateQueries({ queryKey: ["laporan"] });
			toast.success("Buat laporan berhasil.");

			navigate(-1);
		} catch (err: any) {
			const message =
				err?.response?.data?.message ||
				err?.response?.data?.errors?.email ||
				"Terjadi kesalahan, silakan coba lagi.";
			toast.error(message);
		} finally {
			setLoading(false);
			setIsShow(false);
		}
	};

	return {
		form,
		handleSave: onSubmitLaporan,
		loading: loading,
		isShow,
		setIsShow,
	};
}
