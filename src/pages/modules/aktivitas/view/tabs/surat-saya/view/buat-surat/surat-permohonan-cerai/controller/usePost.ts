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
			agama_id_istri: values?.agama_id_istri,
			agama_id_suami: values?.agama_id_suami,
			alamat_istri: values?.alamat_istri,
			alamat_suami: values?.alamat_suami,
			is_warga_desa: values?.is_warga_desa,
			keperluan: values?.keperluan,
			nama_istri: values?.nama_istri,
			nama_suami: values?.nama_suami,
			nik_istri: values?.nik_istri,
			nik_suami: values?.nik_suami,
			pekerjaan_istri: values?.pekerjaan_istri,
			pekerjaan_suami: values?.pekerjaan_suami,
			sebab_cerai: values?.sebab_cerai,
			tanggal_lahir_istri: values?.tanggal_lahir_istri,
			tanggal_lahir_suami: values?.tanggal_lahir_suami,
			tempat_lahir_istri: values?.tempat_lahir_istri,
			tempat_lahir_suami: values?.tempat_lahir_suami,
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
