import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { profil, ResolverProfil, type ProfilPayload } from "../model";
import { useGetProfil } from "./useGetProfil";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

export function usePostProfil() {
	const queryClient = useQueryClient();
	const { data, loading: loadingProfil } = useGetProfil();

	const [loading, setLoading] = useState<boolean>(false);
	const [isShow, setIsShow] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);

	const form = useForm<ProfilPayload>({
		resolver: zodResolver(ResolverProfil),
	});

	const onSubmitProfil = async () => {
		const values = form.getValues();

		const payload: ProfilPayload = {
			nik: values.nik,
			no_telp: values.no_telp,
			email: values?.email,
			no_kk: values?.no_kk,
			tanggal_lahir: values?.tanggal_lahir,
			tempat_lahir: values?.tempat_lahir,
			agama_id: values?.agama_id,
			alamat: values?.alamat,
			disabilitas_id: values?.disabilitas_id,
			golongan_darah: values?.golongan_darah,
			is_kepala_keluarga: values?.is_kepala_keluarga,
			kewarganegaraan: values?.kewarganegaraan,
			pekerjaan_id: values?.pekerjaan_id,
			pendidikan_id: values?.pendidikan_id,
			status_hubungan: values?.status_hubungan,
			status_kawin_id: values?.status_kawin_id,
			suku_id: values?.suku_id,
			photo: values?.photo,
			jenis_kelamin: values?.jenis_kelamin,
			nama_warga: values?.nama_warga,
		};

		setLoading(true);

		if (!isShow && !isEdit) {
			toast.error("Terdapat kesalahan.");
			setLoading(false);
			return;
		}

		try {
			await profil(payload);

			await queryClient.invalidateQueries({ queryKey: ["profil"] });
			toast.success("Update akun berhasil.");
		} catch (err: any) {
			const message =
				err?.response?.data?.message ||
				err?.response?.data?.errors?.email ||
				"Terjadi kesalahan, silakan coba lagi.";
			toast.error(message);
		} finally {
			setLoading(false);
			setIsShow(false);
			setIsEdit(false);
		}
	};

	useEffect(() => {
		if (data) {
			form.setValue("agama_id", data?.agama_id);
			form.setValue("alamat", data?.alamat);
			form.setValue("jenis_kelamin", data?.jenis_kelamin);
			form.setValue("disabilitas_id", data?.disabilitas_id);
			form.setValue("email", data?.email);
			form.setValue("golongan_darah", data?.golongan_darah);
			form.setValue(
				"is_kepala_keluarga",
				data?.is_kepala_keluarga ? "Ya" : "Tidak"
			);
			form.setValue("kewarganegaraan", data?.kewarganegaraan);
			form.setValue("nama_warga", data?.nama_warga);
			form.setValue("nik", data?.nik);
			form.setValue("no_kk", data?.no_kk);
			form.setValue("no_telp", data?.no_telp);
			form.setValue("pekerjaan_id", data?.pekerjaan_id);
			form.setValue("pendidikan_id", data?.pendidikan_id);
			form.setValue("photo", data?.photo);
			form.setValue("status_hubungan", data?.status_hubungan);
			form.setValue("status_kawin_id", data?.status_kawin_id);
			form.setValue("suku_id", data?.suku_id);
			form.setValue(
				"tanggal_lahir",
				data?.tanggal_lahir
					? dayjs(data?.tanggal_lahir).locale("id").format("YYYY-MM-DD")
					: ""
			);
			form.setValue("tempat_lahir", data?.tempat_lahir);
		}
	}, [data]);

	return {
		form,
		handleSave: onSubmitProfil,
		loading: loading || loadingProfil,
		isShow,
		setIsShow,
		data,
		isEdit,
		setIsEdit,
	};
}
