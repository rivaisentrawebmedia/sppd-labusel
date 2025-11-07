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
			alamat: values?.alamat,
			alamat_mendiang: values?.alamat_mendiang,
			hari_meninggal: dayjs(values?.tanggal_meninggal)
				.locale("id")
				.format("dddd"),
			hubungan_id: values?.hubungan_id,
			is_warga_desa: values?.is_warga_desa,
			jam_meninggal: values?.jam_meninggal,
			jenis_kelamin_mendiang: values?.jenis_kelamin_mendiang,
			keperluan: values?.keperluan,
			nama: values?.nama,
			nama_mendiang: values?.nama_mendiang,
			nik_mendiang: values?.nik_mendiang,
			sebab_meninggal: values?.sebab_meninggal,
			tanggal_lahir_mendiang: values?.tanggal_lahir_mendiang,
			tanggal_meninggal: values?.tanggal_meninggal,
			tempat_lahir_mendiang: values?.tempat_lahir_mendiang,
			tempat_meninggal: values?.tempat_meninggal,
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
			form.setValue("alamat", data?.alamat);
			form.setValue("nama", data?.nama_warga);
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
