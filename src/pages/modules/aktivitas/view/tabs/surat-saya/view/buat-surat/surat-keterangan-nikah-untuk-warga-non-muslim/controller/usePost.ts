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
			is_suami_warga_desa: values?.is_suami_warga_desa,
			nik_suami: values?.nik_suami,
			no_kk_suami: values?.no_kk_suami,
			nama_suami: values?.nama_suami,
			tempat_lahir_suami: values?.tempat_lahir_suami,
			tanggal_lahir_suami: values?.tanggal_lahir_suami,
			kewarganegaraan_suami: values?.kewarganegaraan_suami,
			agama_suami_id: values?.agama_suami_id,
			pekerjaan_suami: values?.pekerjaan_suami,
			pendidikan_id_suami: values?.pendidikan_id_suami,
			alamat_suami: values?.alamat_suami,
			status_kawin_suami: values?.status_kawin_suami,
			istri_ke: values?.istri_ke,
			anak_ke_suami: values?.anak_ke_suami,
			perkawinan_ke_suami: values?.perkawinan_ke_suami,
			paspor_suami: values?.paspor_suami,
			telepon_suami: values?.telepon_suami,
			nama_organisasi_suami: values?.nama_organisasi_suami,
			warga_negara_suami: values?.warga_negara_suami,

			nik_ayah_suami: values?.nik_ayah_suami,
			nama_ayah_suami: values?.nama_ayah_suami,
			tempat_lahir_ayah_suami: values?.tempat_lahir_ayah_suami,
			tanggal_lahir_ayah_suami: values?.tanggal_lahir_ayah_suami,
			kewarganegaraan_ayah_suami: values?.kewarganegaraan_ayah_suami,
			agama_ayah_suami_id: values?.agama_ayah_suami_id,
			pekerjaan_ayah_suami: values?.pekerjaan_ayah_suami,
			alamat_ayah_suami: values?.alamat_ayah_suami,
			telepon_ayah_suami: values?.telepon_ayah_suami,
			nama_organisasi_ayah_suami: values?.nama_organisasi_ayah_suami,

			nik_ibu_suami: values?.nik_ibu_suami,
			nama_ibu_suami: values?.nama_ibu_suami,
			tempat_lahir_ibu_suami: values?.tempat_lahir_ibu_suami,
			tanggal_lahir_ibu_suami: values?.tanggal_lahir_ibu_suami,
			kewarganegaraan_ibu_suami: values?.kewarganegaraan_ibu_suami,
			agama_ibu_suami_id: values?.agama_ibu_suami_id,
			pekerjaan_ibu_suami: values?.pekerjaan_ibu_suami,
			alamat_ibu_suami: values?.alamat_ibu_suami,
			telepon_ibu_suami: values?.telepon_ibu_suami,
			nama_organisasi_ibu_suami: values?.nama_organisasi_ibu_suami,

			nik_istri_terdahulu: values?.nik_istri_terdahulu,
			nama_istri_terdahulu: values?.nama_istri_terdahulu,
			nama_ayah_istri_terdahulu: values?.nama_ayah_istri_terdahulu,
			tempat_lahir_istri_terdahulu: values?.tempat_lahir_istri_terdahulu,
			tanggal_lahir_istri_terdahulu: values?.tanggal_lahir_istri_terdahulu,
			kewarganegaraan_istri_terdahulu: values?.kewarganegaraan_istri_terdahulu,
			agama_istri_terdahulu_id: values?.agama_istri_terdahulu_id,
			pekerjaan_istri_terdahulu: values?.pekerjaan_istri_terdahulu,
			alamat_istri_terdahulu: values?.alamat_istri_terdahulu,
			tanggal_meninggal_istri_terdahulu:
				values?.tanggal_meninggal_istri_terdahulu,
			tempat_meninggal_istri_terdahulu:
				values?.tempat_meninggal_istri_terdahulu,

			is_istri_warga_desa: values?.is_istri_warga_desa,
			nik_istri: values?.nik_istri,
			no_kk_istri: values?.no_kk_istri,
			nama_istri: values?.nama_istri,
			tempat_lahir_istri: values?.tempat_lahir_istri,
			tanggal_lahir_istri: values?.tanggal_lahir_istri,
			kewarganegaraan_istri: values?.kewarganegaraan_istri,
			agama_istri_id: values?.agama_istri_id,
			pekerjaan_istri: values?.pekerjaan_istri,
			pendidikan_id_istri: values?.pendidikan_id_istri,
			alamat_istri: values?.alamat_istri,
			status_kawin_istri: values?.status_kawin_istri,
			anak_ke_istri: values?.anak_ke_istri,
			perkawinan_ke_istri: values?.perkawinan_ke_istri,
			paspor_istri: values?.paspor_istri,
			telepon_istri: values?.telepon_istri,
			nama_organisasi_istri: values?.nama_organisasi_istri,
			warga_negara_istri: values?.warga_negara_istri,

			nik_ayah_istri: values?.nik_ayah_istri,
			nama_ayah_istri: values?.nama_ayah_istri,
			tempat_lahir_ayah_istri: values?.tempat_lahir_ayah_istri,
			tanggal_lahir_ayah_istri: values?.tanggal_lahir_ayah_istri,
			kewarganegaraan_ayah_istri: values?.kewarganegaraan_ayah_istri,
			agama_ayah_istri_id: values?.agama_ayah_istri_id,
			pekerjaan_ayah_istri: values?.pekerjaan_ayah_istri,
			alamat_ayah_istri: values?.alamat_ayah_istri,
			telepon_ayah_istri: values?.telepon_ayah_istri,
			nama_organisasi_ayah_istri: values?.nama_organisasi_ayah_istri,

			nik_ibu_istri: values?.nik_ibu_istri,
			nama_ibu_istri: values?.nama_ibu_istri,
			tempat_lahir_ibu_istri: values?.tempat_lahir_ibu_istri,
			tanggal_lahir_ibu_istri: values?.tanggal_lahir_ibu_istri,
			kewarganegaraan_ibu_istri: values?.kewarganegaraan_ibu_istri,
			agama_ibu_istri_id: values?.agama_ibu_istri_id,
			pekerjaan_ibu_istri: values?.pekerjaan_ibu_istri,
			alamat_ibu_istri: values?.alamat_ibu_istri,
			telepon_ibu_istri: values?.telepon_ibu_istri,
			nama_organisasi_ibu_istri: values?.nama_organisasi_ibu_istri,

			nik_suami_terdahulu: values?.nik_suami_terdahulu,
			nama_suami_terdahulu: values?.nama_suami_terdahulu,
			nama_ayah_suami_terdahulu: values?.nama_ayah_suami_terdahulu,
			tempat_lahir_suami_terdahulu: values?.tempat_lahir_suami_terdahulu,
			tanggal_lahir_suami_terdahulu: values?.tanggal_lahir_suami_terdahulu,
			kewarganegaraan_suami_terdahulu: values?.kewarganegaraan_suami_terdahulu,
			agama_suami_terdahulu_id: values?.agama_suami_terdahulu_id,
			pekerjaan_suami_terdahulu: values?.pekerjaan_suami_terdahulu,
			alamat_suami_terdahulu: values?.alamat_suami_terdahulu,
			tanggal_meninggal_suami_terdahulu:
				values?.tanggal_meninggal_suami_terdahulu,
			tempat_meninggal_suami_terdahulu:
				values?.tempat_meninggal_suami_terdahulu,

			is_saksi1_warga_desa: values?.is_saksi1_warga_desa,
			nik_saksi1: values?.nik_saksi1,
			nama_saksi1: values?.nama_saksi1,
			nama_ayah_saksi1: values?.nama_ayah_saksi1,
			tempat_lahir_saksi1: values?.tempat_lahir_saksi1,
			tanggal_lahir_saksi1: values?.tanggal_lahir_saksi1,
			kewarganegaraan_saksi1: values?.kewarganegaraan_saksi1,
			agama_saksi1_id: values?.agama_saksi1_id,
			pekerjaan_saksi1: values?.pekerjaan_saksi1,
			alamat_saksi1: values?.alamat_saksi1,
			nama_organisasi_saksi1: values?.nama_organisasi_saksi1,

			is_saksi2_warga_desa: values?.is_saksi2_warga_desa,
			nik_saksi2: values?.nik_saksi2,
			nama_saksi2: values?.nama_saksi2,
			nama_ayah_saksi2: values?.nama_ayah_saksi2,
			tempat_lahir_saksi2: values?.tempat_lahir_saksi2,
			tanggal_lahir_saksi2: values?.tanggal_lahir_saksi2,
			kewarganegaraan_saksi2: values?.kewarganegaraan_saksi2,
			agama_saksi2_id: values?.agama_saksi2_id,
			pekerjaan_saksi2: values?.pekerjaan_saksi2,
			alamat_saksi2: values?.alamat_saksi2,
			nama_organisasi_saksi2: values?.nama_organisasi_saksi2,

			anak: values?.anak,
			keperluan: values?.keperluan,

			tanggal_melapor_pernikahan: values?.tanggal_melapor_pernikahan,
			tanggal_pemberkatan_pernikahan: values?.tanggal_pemberkatan_pernikahan,
			agama_pernikahan_id: values?.agama_pernikahan_id,
			badan_peradilan_pernikahan: values?.badan_peradilan_pernikahan,
			nama_organisasi_pernikahan: values?.nama_organisasi_pernikahan,
			nomor_putusan_pengadilan: values?.nomor_putusan_pengadilan,
			tanggal_putusan_pengadilan: values?.tanggal_putusan_pengadilan,
			nama_pemuka_agama: values?.nama_pemuka_agama,
			nomor_izin_perwakilan: values?.nomor_izin_perwakilan,
			jumlah_anak_yang_diakui: values?.jumlah_anak_yang_diakui,
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
