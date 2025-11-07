import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { checknik, type CheckNIKPayload, type SignUpPayload } from "../model";

export function usePostCheckNIK({
	form,
	setMessage,
}: {
	form: UseFormReturn<SignUpPayload>;
	setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
	const [loading, setLoading] = useState<boolean>(false);

	const onSubmitCheckNIK = async () => {
		const values = form.getValues();

		const payload: CheckNIKPayload = {
			nik: values.nik,
		};

		setLoading(true);

		try {
			// ✅ panggil service layer
			const res = await checknik(payload);

			if (res?.data?.is_duplikat) {
				const msg = "NIK SUDAH DIGUNAKAN!";
				setMessage(msg);
				toast.error(msg);
			} else {
				const msg = "NIK Belum Digunakan! Silahkan mendaftar";
				setMessage(msg);
				toast.success(msg);
			}
		} catch (err: any) {
			const message =
				err?.response?.data?.message ||
				err?.response?.data?.errors?.email ||
				"Terjadi kesalahan, silakan coba lagi.";
			toast.error(message);
		} finally {
			setLoading(false);
		}
	};

	return {
		handleSave: onSubmitCheckNIK,
		loading,
	};
}
