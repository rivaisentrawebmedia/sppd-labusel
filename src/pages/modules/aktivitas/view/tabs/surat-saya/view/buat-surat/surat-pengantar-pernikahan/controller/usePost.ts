import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ResolverSurat, Surat, type SuratPayload } from "../model";
import { useGetProfil } from "@/pages/modules/profil/controller";
import dayjs from "dayjs";

export function usePostSurat() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { data } = useGetProfil();

	const [loading, setLoading] = useState<boolean>(false);
	const [isShow, setIsShow] = useState<boolean>(false);

	const form = useForm<SuratPayload>({
		resolver: zodResolver(ResolverSurat),
	});

	const onSubmitSurat = async () => {
		const values = form.getValues();

		const payload: SuratPayload = {
			nik_suami: values?.nik_suami,
			nama_suami: values?.nama_suami,
			tempat_lahir_suami: values?.tempat_lahir_suami,
			tanggal_lahir_suami: values?.tanggal_lahir_suami,
			kewarganegaraan_suami: values?.kewarganegaraan_suami,
			agama_suami_id: values?.agama_suami_id,
			pekerjaan_suami: values?.pekerjaan_suami,
			alamat_suami: values?.alamat_suami,
			status_kawin_suami: values?.status_kawin_suami,

			nik_ayah_suami: values?.nik_ayah_suami,
			nama_ayah_suami: values?.nama_ayah_suami,
			tempat_lahir_ayah_suami: values?.tempat_lahir_ayah_suami,
			tanggal_lahir_ayah_suami: values?.tanggal_lahir_ayah_suami,
			kewarganegaraan_ayah_suami: values?.kewarganegaraan_ayah_suami,
			agama_ayah_suami_id: values?.agama_ayah_suami_id,
			pekerjaan_ayah_suami: values?.pekerjaan_ayah_suami,
			alamat_ayah_suami: values?.alamat_ayah_suami,

			nik_ibu_suami: values?.nik_ibu_suami,
			nama_ibu_suami: values?.nama_ibu_suami,
			tempat_lahir_ibu_suami: values?.tempat_lahir_ibu_suami,
			tanggal_lahir_ibu_suami: values?.tanggal_lahir_ibu_suami,
			kewarganegaraan_ibu_suami: values?.kewarganegaraan_ibu_suami,
			agama_ibu_suami_id: values?.agama_ibu_suami_id,
			pekerjaan_ibu_suami: values?.pekerjaan_ibu_suami,
			alamat_ibu_suami: values?.alamat_ibu_suami,

			nik_istri: values?.nik_istri,
			nama_istri: values?.nama_istri,
			tempat_lahir_istri: values?.tempat_lahir_istri,
			tanggal_lahir_istri: values?.tanggal_lahir_istri,
			kewarganegaraan_istri: values?.kewarganegaraan_istri,
			agama_istri_id: values?.agama_istri_id,
			pekerjaan_istri: values?.pekerjaan_istri,
			alamat_istri: values?.alamat_istri,
			status_kawin_istri: values?.status_kawin_istri,

			nik_ayah_istri: values?.nik_ayah_istri,
			nama_ayah_istri: values?.nama_ayah_istri,
			tempat_lahir_ayah_istri: values?.tempat_lahir_ayah_istri,
			tanggal_lahir_ayah_istri: values?.tanggal_lahir_ayah_istri,
			kewarganegaraan_ayah_istri: values?.kewarganegaraan_ayah_istri,
			agama_ayah_istri_id: values?.agama_ayah_istri_id,
			pekerjaan_ayah_istri: values?.pekerjaan_ayah_istri,
			alamat_ayah_istri: values?.alamat_ayah_istri,

			nik_ibu_istri: values?.nik_ibu_istri,
			nama_ibu_istri: values?.nama_ibu_istri,
			tempat_lahir_ibu_istri: values?.tempat_lahir_ibu_istri,
			tanggal_lahir_ibu_istri: values?.tanggal_lahir_ibu_istri,
			kewarganegaraan_ibu_istri: values?.kewarganegaraan_ibu_istri,
			agama_ibu_istri_id: values?.agama_ibu_istri_id,
			pekerjaan_ibu_istri: values?.pekerjaan_ibu_istri,
			alamat_ibu_istri: values?.alamat_ibu_istri,

			hari: dayjs(values?.hari).locale("id").format("dddd"),
			is_warga_desa: values?.is_warga_desa,
			jam: values?.jam,
			tanggal: values?.tanggal,
			tempat: values?.tempat,
			jumlah_istri: values?.jumlah_istri,
			nama_istri_sebelumnya: values?.nama_istri_sebelumnya,
			nama_suami_sebelumnya: values?.nama_suami_sebelumnya,
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
		data,
	};
}
