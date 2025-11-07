import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { bukuTamu, ResolverBukuTamu, type BukuTamuPayload } from "../model";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useGetBukuTamu } from "./useGetBukuTamuByID";
import dayjs from "dayjs";

export function usePostBukuTamu() {
	const navigate = useNavigate();

	const { bukuTamu: bowo } = useGetBukuTamu();

	const queryClient = useQueryClient();

	const [loading, setLoading] = useState<boolean>(false);
	const [isShow, setIsShow] = useState<boolean>(false);

	const form = useForm<BukuTamuPayload>({
		resolver: zodResolver(ResolverBukuTamu),
	});

	const onSubmitBukuTamu = async () => {
		const values = form.getValues();

		const payload: BukuTamuPayload = {
			jenis_keperluan_id: values?.jenis_keperluan_id,
			kota_atau_lembaga: values?.kota_atau_lembaga,
			tanggal_kunjungan: values?.tanggal_kunjungan,
			photo: values?.photo,
			tujuan_bertamu_id: values?.tujuan_bertamu_id,
			id: "",
		};

		setLoading(true);

		if (!isShow) {
			toast.error("Terdapat kesalahan.");
			setLoading(false);
			return;
		}

		try {
			const res = await bukuTamu(payload);

			await queryClient.invalidateQueries({ queryKey: ["buku-tamu"] });

			toast.success("Tambah buku tamu berhasil.");
			navigate(`${res?.data?.id}/isi-kuesioner`);
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
		if (bowo) {
			form.setValue("kota_atau_lembaga", bowo?.kota_atau_lembaga);
			form.setValue("photo", bowo?.photo || "");
			form.setValue(
				"tanggal_kunjungan",
				bowo?.tanggal_kunjungan
					? dayjs(bowo?.tanggal_kunjungan).locale("id").format("YYYY-MM-DD")
					: ""
			);
		}
	}, [bowo]);

	return {
		form,
		handleSave: onSubmitBukuTamu,
		loading: loading,
		isShow,
		setIsShow,
		bowo,
	};
}
