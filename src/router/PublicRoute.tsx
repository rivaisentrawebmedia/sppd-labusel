// src/routes/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthLayout } from "@/layouts/auth-layout/AuthLayout";

export default function PublicRoute() {
	const token = Cookies.get("token");

	if (token) {
		return <Navigate to="/modules/dashboard" replace />;
	}

	return <AuthLayout />;
}
