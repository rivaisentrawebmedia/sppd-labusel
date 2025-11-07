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
			alamat: values?.alamat,
			alamat_1: values?.alamat_1,
			alamat_2: values?.alamat_2,
			batas_barat: values?.batas_barat,
			batas_selatan: values?.batas_selatan,
			batas_timur: values?.batas_timur,
			batas_utara: values?.batas_utara,
			desa: values?.desa,
			dipergunakan: values?.dipergunakan,
			diperoleh_dari: values?.diperoleh_dari,
			diperoleh_dengan: values?.diperoleh_dengan,
			diperoleh_sejak: values?.diperoleh_sejak,
			is_pemohon_warga_desa: values?.is_pemohon_warga_desa,
			is_saksi1_warga_desa: values?.is_saksi1_warga_desa,
			is_saksi2_warga_desa: values?.is_saksi2_warga_desa,
			jalan: values?.jalan,
			kabupaten: values?.kabupaten,
			kecamatan: values?.kecamatan,
			keperluan: values?.keperluan,
			luas_tanah: values?.luas_tanah,
			nama_1: values?.nama_1,
			nama_2: values?.nama_2,
			nama_pemohon: values?.nama_pemohon,
			nib: values?.nib,
			nik_1: values?.nik_1,
			nik_2: values?.nik_2,
			nik_pemohon: values?.nik_pemohon,
			pekerjaan: values?.pekerjaan,
			pekerjaan_1: values?.pekerjaan_1,
			pekerjaan_2: values?.pekerjaan_2,
			rt_rw: values?.rt_rw,
			status_tanah: values?.status_tanah,
			tanggal_lahir_pemohon: values?.tanggal_lahir_pemohon,
			tempat_lahir_pemohon: values?.tempat_lahir_pemohon,
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
