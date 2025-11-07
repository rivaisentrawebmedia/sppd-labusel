import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ResolverSurat, Surat, type SuratPayload } from "../model";
import { useGetProfil } from "@/pages/modules/profil/controller";

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
			nik_1: values?.nik_1,
			nama_1: values?.nama_1,
			tempat_lahir_1: values?.tempat_lahir_1,
			tanggal_lahir_1: values?.tanggal_lahir_1,
			alamat_1: values?.alamat_1,
			pekerjaan_1: values?.pekerjaan_1,

			nik_2: values?.nik_2,
			nama_2: values?.nama_2,
			tempat_lahir_2: values?.tempat_lahir_2,
			tanggal_lahir_2: values?.tanggal_lahir_2,
			alamat_2: values?.alamat_2,
			pekerjaan_2: values?.pekerjaan_2,

			batas_barat: values?.batas_barat,
			batas_selatan: values?.batas_selatan,
			batas_timur: values?.batas_timur,
			batas_utara: values?.batas_utara,
			daftar_saksi_1: values?.daftar_saksi_1,
			daftar_saksi_2: values?.daftar_saksi_2,
			informasi_tanah: values?.informasi_tanah,
			is_warga_desa_1: values?.is_warga_desa_1,
			is_warga_desa_2: values?.is_warga_desa_2,
			keliling: values?.keliling,
			luas_tanah: values?.luas_tanah,
			saksi_pemda: values?.saksi_pemda,
			sketch: values?.sketch,
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
