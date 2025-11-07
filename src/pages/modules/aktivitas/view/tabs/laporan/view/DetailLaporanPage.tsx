import BackLabel from "@/components/common/label/BackLabel";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { useGetLaporanID } from "../controller";
import { LoadingMona } from "@/components/ui/loading";
import { DetailLaporan, DetailPelapor } from "./components";
import { useGetProfil } from "@/pages/modules/profil/controller";
import { convertFromSnakeCase } from "@/utils/helpers";
import { usePathname } from "@/utils/usePathname";

export function DetailLaporanPage() {
	const { thirdPathname } = usePathname();
	const isLaporPemdes = thirdPathname === "lapor-pemdes";

	const { laporan, loading } = useGetLaporanID();
	const { data } = useGetProfil();
	return (
		<>
			<div className="flex flex-col gap-4">
				{isLaporPemdes ? (
					<Breadcrumbs
						items={[
							{
								label: "Beranda",
								to: "/modules/dashboard",
							},
							{
								label: "Lapor Pemdes",
								to: "/modules/layanan/lapor-pemdes",
							},

							{
								label: "Detail Laporan",
								to: "",
							},
						]}
					/>
				) : (
					<Breadcrumbs
						items={[
							{
								label: "Beranda",
								to: "/modules/dashboard",
							},
							{
								label: "Aktivitas",
								to: "/modules/aktivitas",
							},
							{
								label: "Laporan",
								to: `/modules/aktivitas/laporan`,
							},
							{
								label: "Detail Laporan",
								to: "",
							},
						]}
					/>
				)}
				<div className="flex flex-col gap-4">
					<BackLabel label="Detail Laporan" />
					{loading ? (
						<LoadingMona />
					) : (
						<>
							<DetailPelapor
								alamat={data?.alamat || "-"}
								nama={data?.nama_warga || "-"}
								no_telp={data?.no_telp || "-"}
								photo={data?.photo || "-"}
								dilaportkan={laporan?.tanggal_laporan}
								status={convertFromSnakeCase(laporan?.status || "")}
							/>
							<DetailLaporan data={laporan} />
						</>
					)}
				</div>
			</div>
		</>
	);
}
