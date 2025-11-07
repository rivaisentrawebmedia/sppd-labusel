import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { pesanan, ResolverPesanan, type PesananPayload } from "../model";
import { usePathname } from "@/utils/usePathname";

export function usePostPesanan() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { fourthPathname } = usePathname();
	const produkID = fourthPathname || "";
	const [loading, setLoading] = useState<boolean>(false);
	const [isShow, setIsShow] = useState<boolean>(false);

	const form = useForm<PesananPayload>({
		resolver: zodResolver(ResolverPesanan),
	});

	const onSubmitPesanan = async () => {
		const values = form.getValues();

		// "batal" | "pesan-ulang" | "ulasan"
		const isBatal = values?.jenis === "batal";
		const isPesanUlang = values?.jenis === "pesan-ulang";
		const isUlasan = values?.jenis === "ulasan";
		const isLacak = values?.jenis === "lacak";

		const payload: PesananPayload = {
			jenis: values?.jenis,
			ulasan: isUlasan ? values?.ulasan : undefined,
		};

		setLoading(true);

		if (!isShow) {
			toast.error("Terdapat kesalahan.");
			setLoading(false);
			return;
		}

		try {
			await pesanan(produkID, payload);

			await queryClient.invalidateQueries({ queryKey: ["pesanan-saya"] });
			toast.success(
				isBatal
					? "Pesanan berhasil dibatalkan"
					: isPesanUlang
					? "Pesanan berhasil di pesan ulang"
					: isUlasan
					? "Ulasan telah disimpan"
					: isLacak
					? "Lacak pesanan berhasil"
					: "Pesanan berhasil"
			);

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

	return {
		form,
		handleSave: onSubmitPesanan,
		loading: loading,
		isShow,
		setIsShow,
	};
}
