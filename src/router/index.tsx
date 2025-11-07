import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "@/pages/not-found";
import { authRoutes } from "./routes/auth.routes";
import { BerandaPage } from "@/pages/modules/beranda/BerandaPage";
import { MainLayout } from "@/layouts/main-layout/MainLayout";

export const Router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/login" replace />,
	},
	{
		element: <PublicRoute />,
		children: authRoutes,
	},
	{
		element: <PrivateRoute />,
		children: [
			{
				path: "modules",
				element: <MainLayout />,
				children: [
					{ path: "dashboard", element: <BerandaPage /> },

					{
						path: "*",
						element: <NotFoundPage />,
					},
				],
			},

			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
