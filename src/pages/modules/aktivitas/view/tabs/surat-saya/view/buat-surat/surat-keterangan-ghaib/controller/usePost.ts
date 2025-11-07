import { useEffect, useState } from "react";
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
			alamat: values?.alamat,
			hilang_sejak: values?.hilang_sejak,
			hubungan_id: values?.hubungan_id,
			is_warga_desa: values?.is_warga_desa,
			jenis_kelamin: values?.jenis_kelamin,
			keperluan: values?.keperluan,
			nama_orang_hilang: values?.nama_orang_hilang,
			usia: values?.usia,
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

			form.setValue("alamat", data?.alamat);
			form.setValue("jenis_kelamin", data?.jenis_kelamin);
			form.setValue("hubungan_id", data?.status_hubungan);
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
