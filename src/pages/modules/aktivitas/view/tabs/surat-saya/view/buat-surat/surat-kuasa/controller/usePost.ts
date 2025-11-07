import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ResolverSurat, Surat, type SuratPayload } from "../model";

export function usePostSurat() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const [loading, setLoading] = useState<boolean>(false);
	const [isShow, setIsShow] = useState<boolean>(false);

	const form = useForm<SuratPayload>({
		resolver: zodResolver(ResolverSurat),
		defaultValues: {
			is_warga_desa: true,
		},
	});

	const onSubmitSurat = async () => {
		const values = form.getValues();

		const payload: SuratPayload = {
			disposisi_kuasa_sebagai: values?.disposisi_kuasa_sebagai,
			disposisi_kuasa_untuk: values?.disposisi_kuasa_untuk,
			jabatan_pemberi: values?.jabatan_pemberi,
			jabatan_penerima: values?.jabatan_penerima,
			nama_pemberi: values?.nama_pemberi,
			nama_penerima: values?.nama_penerima,
			nik_pemberi: values?.nik_pemberi,
			nik_penerima: values?.nik_penerima,

			is_warga_desa: values?.is_warga_desa,
		};

		setLoading(true);

		if (!isShow) {
			toast.error("Terdapat kesalahan.");
			setLoading(false);
			return;
		}

		try {
			await Surat(payload);

			await queryClient.invalidateQueries({ queryKey: ["surat-saya"] });
			toast.success("Buat Surat berhasil.");

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
		handleSave: onSubmitSurat,
		loading: loading,
		isShow,
		setIsShow,
	};
}
