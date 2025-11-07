import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { kuesioner, ResolverKuesioner, type KuesionerPayload } from "../model";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { usePathname } from "@/utils/usePathname";
import { useGetKuisioner } from "./useGetKuisioner";

export function usePostKuesioner() {
	const navigate = useNavigate();
	const { fivethPathname } = usePathname();
	const buku_tamu_id = fivethPathname;

	const { kuesioner: bowo, loading: loadingKueioner } = useGetKuisioner();
	const [idx, setIdx] = useState<number>(0);

	const queryClient = useQueryClient();

	const [loading, setLoading] = useState<boolean>(false);
	const [isShow, setIsShow] = useState<boolean>(false);

	const form = useForm<KuesionerPayload>({
		resolver: zodResolver(ResolverKuesioner),
	});

	const onSubmitKuesioner = async () => {
		const values = form.getValues();

		const isKuantitatif = bowo?.[idx]?.jenis_kuisioner === "kuantitatif";

		const payload: KuesionerPayload = {
			jawaban: values?.jawaban?.map((item) => {
				return {
					jawaban: isKuantitatif ? undefined : item?.jawaban,
					opsi: !isKuantitatif ? undefined : item?.opsi,
					soal_kuisioner_id: item?.soal_kuisioner_id,
				};
			}),
			buku_tamu_id: buku_tamu_id || "",
			kuisioner_id: values?.kuisioner_id,
		};

		setLoading(true);

		if (!isShow) {
			toast.error("Terdapat kesalahan.");
			setLoading(false);
			return;
		}

		try {
			await kuesioner(payload);

			await queryClient.invalidateQueries({ queryKey: ["kuesioner"] });
			toast.success("Isi kuesioner berhasil.");
			if (idx < bowo?.length - 1) {
				setIdx(idx + 1);
			} else {
				navigate("/modules/layanan/buku-tamu");
			}
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
			const data = bowo?.[idx];
			form.setValue("kuisioner_id", data?.id);
			form.setValue(
				"jawaban",
				data?.soal?.map((item) => {
					return {
						jawaban: item?.jawaban || "",
						opsi: item?.opsi ? Number(item?.selected_opsi) : undefined,
						soal_kuisioner_id: item?.id || "",
					};
				})
			);
		}
	}, [bowo, idx]);

	return {
		form,
		handleSave: onSubmitKuesioner,
		loading: loading,
		isShow,
		setIsShow,
		setIdx,
		idx,
		data: bowo?.[idx],
		buku_tamu_id,
		loadingKueioner,
	};
}
