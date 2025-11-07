import {
	DaftarAkunPage,
	LoginPage,
	LupaPasswordPage,
	ResetPasswordPassword,
} from "@/pages/auth";
import NotFoundPage from "@/pages/not-found";

export const authRoutes = [
	{
		path: "login",
		element: <LoginPage />,
	},
	{
		path: "forget-password",
		element: <LupaPasswordPage />,
	},
	{
		path: "reset-password",
		element: <ResetPasswordPassword />,
	},
	{
		path: "sign-up",
		element: <DaftarAkunPage />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
];
