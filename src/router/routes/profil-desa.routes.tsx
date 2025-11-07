import InfoAPBDesPage from "@/pages/modules/informasi-desa/tabs/info-apbdes/view/InfoAPBDESPage";
import InformasiDesaPage from "@/pages/modules/informasi-desa/tabs/informasi-desa/view/InformasiDesa";
import PegawaiDesaPage from "@/pages/modules/informasi-desa/tabs/pegawai-desa/view/PegawaiDesaPage";
import NotFoundPage from "@/pages/not-found";

export const ProfilDesaRoutes = [
	{
		path: "",
		element: <InformasiDesaPage />,
	},
	{
		path: "pegawai-desa",
		element: <PegawaiDesaPage />,
	},
	{
		path: "info-apbdes",
		element: <InfoAPBDesPage />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
];
