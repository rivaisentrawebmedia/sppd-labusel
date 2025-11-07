import { Outlet } from "react-router-dom";
import { useGetPublikInfo } from "../constroller";
import { MainFooter, MainHeader } from "./components";
import { MainMenu } from "./components/MainMenu";
import "dayjs/locale/id";
import { ErrorBoundary } from "@/pages/error";

export type MenuItem = {
	label: string;
	link: string;
	child?: MenuItem[]; // array, bukan single
};

export type Menus = MenuItem[];

export function MainLayout() {
	const { loading, publikInfo } = useGetPublikInfo();

	const menu: Menus = [
		{ label: "Beranda", link: "/modules/dashboard" },
		{
			label: "Informasi Desa",
			link: "/modules/informasi-desa",
		},
		{
			label: "Layanan",
			link: "/modules/layanan",
			child: [
				{
					label: "Layanan Persuratan",
					link: "/modules/layanan/layanan-persuratan",
				},
				{
					label: "Layanan Kesehatan",
					link: "/modules/layanan/layanan-kesehatan",
				},
				{
					label: "Lapor Pemdes",
					link: "/modules/layanan/lapor-pemdes",
				},
				{
					label: "Buku Tamu",
					link: "/modules/layanan/buku-tamu",
				},
				{
					label: "Donasi",
					link: "/modules/layanan/donasi",
				},
			],
		},
		{ label: "Blog Desa", link: "/modules/blog-desa" },
		{ label: "BUMDes & Pasar", link: "/modules/bumdes-pasar" },
	];

	return (
		<ErrorBoundary>
			<div className="w-full flex flex-col bg-[#F5F5FF] min-h-screen">
				{/* HEADER */}
				<MainHeader data={publikInfo} loading={loading} menu={menu} />
				<MainMenu menu={menu} />

				{/* CONTENT */}
				<main className="flex-1 px-4 md:px-8 lg:px-[6rem] h-full py-4 overflow-auto">
					<Outlet />
				</main>
				{/* FOOTER */}
				<MainFooter data={publikInfo} loading={loading} />
			</div>
		</ErrorBoundary>
	);
}
