import LoginPage from "@/pages/auth/login/LoginPage";
import NotFoundPage from "@/pages/not-found";

export const authRoutes = [
	{
		path: "login",
		element: <LoginPage />,
	},

	{
		path: "*",
		element: <NotFoundPage />,
	},
];
