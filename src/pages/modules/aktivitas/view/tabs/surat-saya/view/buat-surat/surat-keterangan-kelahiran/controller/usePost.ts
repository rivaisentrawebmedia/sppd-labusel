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

	const [loading, setLoading] = useState<boolean>(false);
	const [isShow, setIsShow] = useState<boolean>(false);

	const { data } = useGetProfil();

	const form = useForm<SuratPayload>({
		resolver: zodResolver(ResolverSurat),
		defaultValues: {
			is_warga_desa: true,
		},
	});

	const onSubmitSurat = async () => {
		const values = form.getValues();

		const payload: SuratPayload = {
			alamat_ayah: values?.alamat_ayah,
			alamat_ibu: values?.alamat_ibu,
			anak_ke: values?.anak_ke,
			is_warga_desa: values?.is_warga_desa,
			jam_lahir: values?.jam_lahir,
			jenis_kelamin: values?.jenis_kelamin,
			keperluan: values?.keperluan,
			nama_ayah: values?.nama_ayah,
			nama_ibu: values?.nama_ibu,
			nik_ayah: values?.nik_ayah,
			nik_ibu: values?.nik_ibu,
			tanggal_lahir_ayah: values?.tanggal_lahir_ayah,
			tanggal_lahir_ibu: values?.tanggal_lahir_ibu,
			tempat_lahir_ayah: values?.tempat_lahir_ayah,
			tempat_lahir_ibu: values?.tempat_lahir_ibu,

			nama: values?.nama,
			tanggal_lahir: values?.tanggal_lahir,
			tempat_lahir: values?.tempat_lahir,
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
			form.setValue("nama", data?.nama_warga);
			form.setValue("tempat_lahir", data?.tempat_lahir);
			form.setValue(
				"tanggal_lahir",
				data?.tanggal_lahir
					? dayjs(data?.tanggal_lahir).locale("id").format("YYYY-MM-DD")
					: ""
			);
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
