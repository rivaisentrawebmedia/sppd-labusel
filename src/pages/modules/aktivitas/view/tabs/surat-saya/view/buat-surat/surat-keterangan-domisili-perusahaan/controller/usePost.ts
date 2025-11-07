import { useEffect, useState } from "react";
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
		defaultValues: {
			warga_desa: true,
		},
	});

	const onSubmitSurat = async () => {
		const values = form.getValues();

		const payload: SuratPayload = {
			agama_id: values?.agama_id,
			alamat: values?.alamat,
			alamat_perusahaan: values?.alamat_perusahaan,
			bidang_usaha_id: values?.bidang_usaha_id,
			jenis_kelamin: values?.jenis_kelamin,
			jenis_usaha_id: values?.jenis_usaha_id,
			jumlah_karyawan: values?.jumlah_karyawan,
			keperluan: values?.keperluan,
			luas_bangunan: values?.luas_bangunan,
			luas_tanah: values?.luas_tanah,
			nama: values?.nama,
			nama_perusahaan: values?.nama_perusahaan,
			nib: values?.nib,
			nik: values?.nik,
			nomor_akta_pendirian: values?.nomor_akta_pendirian,
			npwp: values?.npwp,
			pekerjaan: values?.pekerjaan,
			peruntukan_bangunan: values?.peruntukan_bangunan,
			status_kepemilikan_bangunan: values?.status_kepemilikan_bangunan,
			tanggal_lahir: values?.tanggal_lahir,
			tempat_lahir: values?.tempat_lahir,
			warga_desa: values?.warga_desa,
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

	useEffect(() => {
		if (data) {
			form.setValue("nik", data?.nik);
			form.setValue("nama", data?.nama_warga);
			form.setValue("tempat_lahir", data?.tempat_lahir);
			form.setValue(
				"tanggal_lahir",
				data?.tanggal_lahir
					? dayjs(data?.tanggal_lahir).locale("id").format("YYYY-MM-DD")
					: ""
			);
			form.setValue("alamat", data?.alamat);
			form.setValue("jenis_kelamin", data?.jenis_kelamin);
			form.setValue("pekerjaan", data?.pekerjaan_id);
			form.setValue("agama_id", data?.agama_id);
		}
	}, [data]);

	return {
		form,
		handleSave: onSubmitSurat,
		loading: loading,
		isShow,
		setIsShow,
		data,
	};
}
