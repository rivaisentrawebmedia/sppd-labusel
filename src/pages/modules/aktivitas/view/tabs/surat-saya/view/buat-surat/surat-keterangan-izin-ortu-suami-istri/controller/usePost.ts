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
		defaultValues: {
			is_warga_desa: true,
		},
	});

	const onSubmitSurat = async () => {
		const values = form.getValues();

		const payload: SuratPayload = {
			nik: values?.nik,
			nama: values?.nama,
			tempat_lahir: values?.tempat_lahir,
			tanggal_lahir: values?.tanggal_lahir,
			alamat: values?.alamat,
			keperluan: values?.keperluan,
			pekerjaan: values?.pekerjaan,

			agama_id: values?.agama_id,

			is_warga_desa: values?.is_warga_desa,

			agama_2_id: values?.agama_2_id,
			alamat_2: values?.alamat_2,
			diberi_izin: values?.diberi_izin,
			kewarganegaraan: values?.kewarganegaraan,
			kewarganegaraan_2: values?.kewarganegaraan_2,
			masa_kontrak: values?.masa_kontrak,
			memberi_izin: values?.memberi_izin,
			nama_2: values?.nama_2,
			nama_perusahaan: values?.nama_perusahaan,
			negara_tujuan: values?.negara_tujuan,
			nik_2: values?.nik_2,
			pekerjaan_2: values?.pekerjaan_2,
			status_pekerjaan: values?.status_pekerjaan,
			tanggal_lahir_2: values?.tanggal_lahir_2,
			tempat_lahir_2: values?.tempat_lahir_2,
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
