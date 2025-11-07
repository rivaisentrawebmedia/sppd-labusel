import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResolverLogin, type LoginPayload } from "../model/auth.model";
import { login } from "../model/auth.service"; // ✅ panggil service, bukan axios langsung

export function usePostLogin() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const [num1, setNum1] = useState<number>();
	const [num2, setNum2] = useState<number>();
	const [isRemember, setIsRemember] = useState(false);
	const [loading, setLoading] = useState(false);
	const nik = searchParams.get("nik") || null;
	const no_telp = searchParams.get("no_telp") || null;

	const form = useForm<LoginPayload>({
		resolver: zodResolver(ResolverLogin),
	});

	// 🔢 Captcha generator
	const getRandomNumberBelow20 = (): number => Math.floor(Math.random() * 20);
	const generateCaptchaNumbers = () => {
		setNum1(getRandomNumberBelow20());
		setNum2(getRandomNumberBelow20());
	};

	useEffect(() => {
		generateCaptchaNumbers();
	}, []);

	function handleCheckedIsRemember(value: boolean) {
		setIsRemember(value);
	}

	// 🔐 Handler submit login
	const onSubmitLogin = async () => {
		const values = form.getValues();

		const payload: LoginPayload = {
			nik: values.nik,
			no_telp: values.no_telp,
			captcha: values?.captcha,
		};

		setLoading(true);

		if ((num1 || 0) + (num2 || 0) !== Number(values?.captcha)) {
			setLoading(false);
			return toast.error("Hasil penjumlahan salah");
		}

		try {
			// ✅ panggil service layer
			const res = await login(payload);

			toast.success("Login berhasil");

			// Simpan token di cookie
			Cookies.set("token", res.token, {
				expires: isRemember ? 7 : undefined, // 7 hari jika Remember Me aktif
				secure: true,
				sameSite: "strict",
			});

			// Redirect ke dashboard
			navigate("/modules/dashboard");
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

	useEffect(() => {
		if (nik) {
			form.setValue("nik", nik);
		}
	}, [nik]);

	useEffect(() => {
		if (no_telp) {
			form.setValue("no_telp", no_telp);
		}
	}, [no_telp]);

	return {
		form,
		handleSave: onSubmitLogin,
		handleCheckedIsRemember,
		isRemember,
		num1,
		num2,
		loading,
	};
}
