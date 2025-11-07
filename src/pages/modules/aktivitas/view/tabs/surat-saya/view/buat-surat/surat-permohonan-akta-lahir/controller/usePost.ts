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
			jenis_kelamin: values?.jenis_kelamin,
			pekerjaan: values?.pekerjaan,

			is_warga_desa: values?.is_warga_desa,

			alamat_anak: values?.alamat_anak,
			alamat_orang_tua: values?.alamat_orang_tua,
			nama_anak: values?.nama_anak,
			nama_ayah: values?.nama_ayah,
			nama_ibu: values?.nama_ibu,
			nik_ayah: values?.nik_ayah,
			nik_ibu: values?.nik_ibu,
			tanggal_lahir_anak: values?.tanggal_lahir_anak,
			tempat_lahir_anak: values?.tempat_lahir_anak,
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
