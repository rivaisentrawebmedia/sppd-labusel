import AktivitasLayout from "@/pages/modules/aktivitas/view/AktivitasPage";
import LaporanPage from "@/pages/modules/aktivitas/view/tabs/laporan/view/LaporanPage";
import PesananSayaPage from "@/pages/modules/aktivitas/view/tabs/pesanan-saya/view/PesananSayaPage";
import SuratSayaPage from "@/pages/modules/aktivitas/view/tabs/surat-saya/view/SuratSayaPage";
import ProfilDesaLayout from "@/pages/modules/informasi-desa/ProfilDesaPage";
import NotFoundPage from "@/pages/not-found";
import { ProfilDesaRoutes } from "./profil-desa.routes";
import DetailSuratSayaPage from "@/pages/modules/aktivitas/view/tabs/surat-saya/view/DetailSuratSayaPage";
import { BuatSuratPage } from "@/pages/modules/aktivitas/view/tabs/surat-saya/view/BuatSuratPage";
import { BuatLaporanPage } from "@/pages/modules/aktivitas/view/tabs/laporan/view/BuatLaporanPage";
import { DetailLaporanPage } from "@/pages/modules/aktivitas/view/tabs/laporan/view/DetailLaporanPage";
import { DetailPesananSayaPage } from "@/pages/modules/aktivitas/view/tabs/pesanan-saya/view/DetailPesananSayaPage";

export const aktivitasRoutes = [
	{
		path: "aktivitas",
		element: <AktivitasLayout />,
		children: [
			{
				path: "",
				element: <SuratSayaPage />,
			},
			{
				path: "laporan",
				element: <LaporanPage />,
			},
			{
				path: "pesanan-saya",
				element: <PesananSayaPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		path: "informasi-desa",
		element: <ProfilDesaLayout />,
		children: ProfilDesaRoutes,
	},
	{
		path: "aktivitas/:bowo/detail",
		element: <DetailSuratSayaPage />,
	},
	{
		path: "aktivitas/ajukan-surat",
		element: <BuatSuratPage />,
	},
	{
		path: "aktivitas/laporan/buat-laporan",
		element: <BuatLaporanPage />,
	},
	{
		path: "aktivitas/laporan/:bowo/detail",
		element: <DetailLaporanPage />,
	},
	{
		path: "aktivitas/pesanan-saya/:bowo/detail",
		element: <DetailPesananSayaPage />,
	},
];
