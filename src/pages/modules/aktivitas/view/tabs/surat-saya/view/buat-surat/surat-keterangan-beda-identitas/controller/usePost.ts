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
	});

	const onSubmitSurat = async () => {
		const values = form.getValues();

		const payload: SuratPayload = {
			alamat_1: values?.alamat_1,
			alamat_2: values?.alamat_2,
			keperluan: values?.keperluan,
			nama_1: values?.nama_1,
			nama_2: values?.nama_2,
			nomor_1: values?.nomor_1,
			nomor_2: values?.nomor_2,
			perbedaan_id: values?.perbedaan_id,
			tanggal_lahir_1: values?.tanggal_lahir_1,
			tanggal_lahir_2: values?.tanggal_lahir_2,
			tempat_lahir_1: values?.tempat_lahir_1,
			tempat_lahir_2: values?.tempat_lahir_2,
			tercantum_id: values?.tercantum_id,
			tercantum_id_2: values?.tercantum_id_2,
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
			form.setValue("nama_1", data?.nama_warga);
			form.setValue("tempat_lahir_1", data?.tempat_lahir);
			form.setValue(
				"tanggal_lahir_1",
				data?.tanggal_lahir
					? dayjs(data?.tanggal_lahir).locale("id").format("YYYY-MM-DD")
					: ""
			);
			form.setValue("alamat_1", data?.alamat);
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
