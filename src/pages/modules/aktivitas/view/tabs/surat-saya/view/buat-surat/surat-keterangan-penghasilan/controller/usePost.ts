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
			keperluan: values?.keperluan,

			is_warga_desa: values?.is_warga_desa,
			alamat_ortu: values?.alamat_ortu,
			jenis_kelamin_anak: values?.jenis_kelamin_anak,
			jenis_kelamin_ortu: values?.jenis_kelamin_ortu,
			kelas_anak: values?.kelas_anak,
			nama_anak: values?.nama_anak,
			nama_ortu: values?.nama_ortu,
			nama_sekolah_anak: values?.nama_sekolah_anak,
			nik_anak: values?.nik_anak,
			nik_ortu: values?.nik_ortu,
			pekerjaan_ortu: values?.pekerjaan_ortu,
			penghasilan_ortu: values?.penghasilan_ortu,
			tanggal_lahir_anak: values?.tanggal_lahir_anak,
			tanggal_lahir_ortu: values?.tanggal_lahir_ortu,
			tanggungan_ortu: values?.tanggungan_ortu,
			tempat_lahir_anak: values?.tempat_lahir_anak,
			tempat_lahir_ortu: values?.tempat_lahir_ortu,
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
