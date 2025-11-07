import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Outlet } from "react-router-dom";
import { TitleComponent } from "@/components/common/title/TitleComponent";
import { useGetPublikInfo } from "@/layouts/constroller";
import { Skeleton } from "@/components/ui/skeleton";
import { TabComponent } from "./components";

export default function ProfilDesaLayout() {
	const { loading, publikInfo: data } = useGetPublikInfo();

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
							label: "Profil Desa",
							to: "",
						},
					]}
				/>

				<TitleComponent
					title="Informasi Desa"
					deskripsi={
						<div className="font-light text-[#333]">
							{loading ? (
								<Skeleton className="h-8 w-[30rem]" />
							) : (
								<p>
									Mengenal Lebih Dekat {data?.nama_desa}: Telusuri profil, temui
									para penggerak layanan, dan pantau anggaran kami untuk
									pembangunan yang transparan.
								</p>
							)}
						</div>
					}
				/>

				<div
					className="flex flex-col gap-0 bg-white rounded-md"
					style={{
						boxShadow: "0px 4px 4px 0px #0000000A",
					}}
				>
					<TabComponent />
					<div className="flex flex-col gap-4 p-4">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}
