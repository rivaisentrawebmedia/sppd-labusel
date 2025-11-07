import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResolverSignUp, signup, type SignUpPayload } from "../model";

export function usePostSignUp() {
	const navigate = useNavigate();

	const [loading, setLoading] = useState<boolean>(false);
	const [isShow, setIsShow] = useState<boolean>(false);

	const form = useForm<SignUpPayload>({
		resolver: zodResolver(ResolverSignUp),
	});

	const onSubmitSignUp = async () => {
		const values = form.getValues();

		const payload: SignUpPayload = {
			nik: values.nik,
			no_telp: values.no_telp,
			email: values?.email,
			nama_warga: values?.nama_warga,
			no_kk: values?.no_kk,
			tanggal_lahir: values?.tanggal_lahir,
			tempat_lahir: values?.tempat_lahir,
			scan_kk: values?.scan_kk,
			scan_ktp: values?.scan_ktp,
			selfie_ktp: values?.selfie_ktp,
			konfirmasi_no_telp: values?.konfirmasi_no_telp,
		};

		setLoading(true);

		if (!isShow) {
			toast.error("Terdapat kesalahan.");
			setLoading(false);
			return;
		}

		try {
			// ✅ panggil service layer
			const res = await signup(payload);

			toast.success("Daftar akun berhasil. Silahkan login");
			// Redirect ke dashboard
			navigate(`/login?nik=${res?.data?.nik}&no_telp=${res?.data?.no_telp}`);
			form.reset();
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
		handleSave: onSubmitSignUp,
		loading,
		isShow,
		setIsShow,
	};
}
