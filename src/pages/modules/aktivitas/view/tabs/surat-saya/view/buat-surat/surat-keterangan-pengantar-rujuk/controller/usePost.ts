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
			pekerjaan: values?.pekerjaan,

			agama_id: values?.agama_id,

			is_warga_desa: values?.is_warga_desa,

			agama_id_pasangan: values?.agama_id_pasangan,
			alamat_pasangan: values?.alamat_pasangan,
			kewarganegaraan: values?.kewarganegaraan,
			kewarganegaraan_pasangan: values?.kewarganegaraan_pasangan,
			nama_ayah: values?.nama_ayah,
			nama_ayah_pasangan: values?.nama_ayah_pasangan,
			nama_pasangan: values?.nama_pasangan,
			nik_ayah: values?.nik_ayah,
			nik_ayah_pasangan: values?.nik_ayah_pasangan,
			nik_pasangan: values?.nik_pasangan,
			pekerjaan_pasangan: values?.pekerjaan_pasangan,
			tanggal_lahir_pasangan: values?.tanggal_lahir_pasangan,
			tempat_lahir_pasangan: values?.tempat_lahir_pasangan,
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
