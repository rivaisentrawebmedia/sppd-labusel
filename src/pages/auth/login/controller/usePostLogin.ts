import AxiosClient from "@/provider/axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ResolverLogin, type LoginInterface } from "../model";
import { zodResolver } from "@hookform/resolvers/zod";

export function usePostLogin() {
	const navigate = useNavigate();
	const [num1, setNum1] = useState<number>();
	const [num2, setNum2] = useState<number>();

	const form = useForm<LoginInterface>({
		resolver: zodResolver(ResolverLogin),
	});

	const [isRemember, setIsRemember] = useState(false);
	const [loading, setLoading] = useState(false);

	const getRandomNumberBelow20 = (): number => {
		return Math.floor(Math.random() * 20); // hasil 0–19
	};

	const generateCaptchaNumbers = () => {
		const a = getRandomNumberBelow20();
		const b = getRandomNumberBelow20();
		setNum1(a);
		setNum2(b);
	};

	useEffect(() => {
		generateCaptchaNumbers();
	}, []);

	function handleCheckedIsRemember(value: boolean) {
		setIsRemember(value);
	}

	const onSubmitLogin = async () => {
		const values = form.watch();

		const payload: LoginInterface = {
			captcha: values?.captcha,
			email: values?.email,
			password: values?.password,
		};

		setLoading(true);

		if ((num1 || 0) + (num2 || 0) !== Number(values?.captcha)) {
			setLoading(false);
			return toast.error("Hasil penjumlahan salah");
		}

		try {
			const res = await AxiosClient.post("/auth/login", payload);

			if (res.status === 200) {
				toast.success("Login berhasil ");

				Cookies.set("token", res?.data?.token);

				setTimeout(() => {
					navigate("/modules/dashboard");
				}, 3000);
			}
		} catch (err: any) {
			toast.error(
				err?.response?.data?.errors?.email ||
					"Terjadi kesalahan, silakan coba lagi."
			);
		} finally {
			setLoading(false);
		}
	};

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
