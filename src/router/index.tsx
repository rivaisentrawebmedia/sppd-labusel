import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "@/pages/not-found";
import { authRoutes } from "./routes/auth.routes";
import { MainLayout } from "@/layouts";
import { BerandaPage } from "@/pages/modules/beranda/view/BerandaPage";
import ProfilPage from "@/pages/modules/profil/view/ProfilPage";
import { aktivitasRoutes } from "./routes/aktivitas.routes";
import { layananRoutes } from "./routes/layanan.routes";

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
					{ path: "profil", element: <ProfilPage /> },
					...aktivitasRoutes,
					...layananRoutes,

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
