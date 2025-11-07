import { BuatLaporanPage } from "@/pages/modules/aktivitas/view/tabs/laporan/view/BuatLaporanPage";
import { DetailLaporanPage } from "@/pages/modules/aktivitas/view/tabs/laporan/view/DetailLaporanPage";
import LaporanPage from "@/pages/modules/aktivitas/view/tabs/laporan/view/LaporanPage";
import { BuatSuratPage } from "@/pages/modules/aktivitas/view/tabs/surat-saya/view/BuatSuratPage";
import DetailSuratSayaPage from "@/pages/modules/aktivitas/view/tabs/surat-saya/view/DetailSuratSayaPage";
import SuratSayaPage from "@/pages/modules/aktivitas/view/tabs/surat-saya/view/SuratSayaPage";
import DetailBukuTamuPage from "@/pages/modules/layanan/buku-tamu/view/DetailBukuTamuPage";
import BukuTamuPage from "@/pages/modules/layanan/buku-tamu/view/ListBukuTamuPage";
import IsiBukuTamuPage from "@/pages/modules/layanan/buku-tamu/view/tabs/isi-buku-tamu/IsiBukuTamuPage";
import IsiKuesionerPage from "@/pages/modules/layanan/buku-tamu/view/tabs/isi-kuesioner/IsiKuesionerPage";
import TambahBukuTamuPage from "@/pages/modules/layanan/buku-tamu/view/TambahBukuTamuPage";

export const layananRoutes = [
	{
		path: "layanan/buku-tamu",
		element: <BukuTamuPage />,
	},
	{
		path: "layanan/buku-tamu/:bowo/detail",
		element: <DetailBukuTamuPage />,
	},
	{
		path: "layanan/buku-tamu/tambah",
		element: <TambahBukuTamuPage />,
		children: [
			{
				path: "",
				element: <IsiBukuTamuPage />,
			},
			{
				path: ":bowo/isi-kuesioner",
				element: <IsiKuesionerPage />,
			},
		],
	},
	{
		path: "layanan/layanan-persuratan",
		element: <SuratSayaPage />,
	},

	{
		path: "layanan/layanan-persuratan/:bowo/detail",
		element: <DetailSuratSayaPage />,
	},
	{
		path: "layanan/layanan-persuratan/ajukan-surat",
		element: <BuatSuratPage />,
	},

	{
		path: "layanan/lapor-pemdes",
		element: <LaporanPage />,
	},

	{
		path: "layanan/lapor-pemdes/buat-laporan",
		element: <BuatLaporanPage />,
	},
	{
		path: "layanan/lapor-pemdes/:bowo/detail",
		element: <DetailLaporanPage />,
	},
];
