import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function usePostLogout() {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const onSubmitLogout = async () => {
		setLoading(true);

		try {
			Cookies.remove("token");
			navigate("/login");
		} catch (err: any) {
			toast.error(
				err?.response?.data?.error || "Terjadi kesalahan, silakan coba lagi."
			);
		} finally {
			setLoading(false);
		}
	};

	return {
		handleLogout: onSubmitLogout,
		loading,
	};
}
