import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { TitleComponent } from "@/components/common/title/TitleComponent";
import { TabIsiKuesioner } from "./components";
import { Outlet } from "react-router-dom";

export default function TambahBukuTamuPage() {
	return (
		<>
			<div className="flex flex-col gap-4">
				<Breadcrumbs
					items={[
						{
							label: "Beranda",
							to: "/modules/dashboard",
						},
						{
							label: "Buku Tamu",
							to: "/modules/layanan/buku-tamu",
						},
						{
							label: "Isi Buku Tamu",
							to: "",
						},
					]}
				/>

				<TitleComponent
					isBack
					title="Isi Buku Tamu"
					deskripsi={
						<div className="font-light text-[#333]">
							<p>Silahkan isi buku tamu untuk mencatat data kunjungan Anda.</p>
						</div>
					}
				/>
				<TabIsiKuesioner />
				<Outlet />
			</div>
		</>
	);
}
