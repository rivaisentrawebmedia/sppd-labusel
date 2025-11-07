import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function usePostLogout() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const onSubmitLogout = async () => {
		// tampilkan loading toast agar UX lebih bagus
		const toastId = toast.loading("Sedang keluar dari akun...");

		setLoading(true);
		try {
			// const res = await logout(); // ✅ panggil service
			toast.update(toastId, {
				render: "Logout berhasil",
				type: "success",
				isLoading: false,
				autoClose: 2000,
			});

			// hapus token
			Cookies.remove("token");

			// redirect ke login page
			navigate("/login");
		} catch (err: any) {
			toast.update(toastId, {
				render:
					err?.response?.data?.message ||
					err?.response?.data?.errors?.email ||
					"Terjadi kesalahan, silakan coba lagi.",
				type: "error",
				isLoading: false,
				autoClose: 3000,
			});
		} finally {
			setLoading(false);
		}
	};

	return {
		handleLogout: onSubmitLogout,
		loading,
	};
}
