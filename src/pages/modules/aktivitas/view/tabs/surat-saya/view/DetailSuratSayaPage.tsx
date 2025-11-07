import { Breadcrumbs } from "@/components/ui/breadcrumb";
import type { SuratSaya } from "../model";
import { useSearchParams } from "react-router-dom";
import BackLabel from "@/components/common/label/BackLabel";
import dayjs from "dayjs";
import { convertFromSnakeCase } from "@/utils/helpers";
import clsx from "clsx";
import { showDetailSurat } from "./print/DetailSurat";
import { PrintSurat } from "./print";
import { usePathname } from "@/utils/usePathname";

export default function DetailSuratSayaPage() {
	const { thirdPathname } = usePathname();
	const isLayananPersuratan = thirdPathname === "layanan-persuratan";

	const [searchParams] = useSearchParams();
	const dataLocal = localStorage.getItem("data") || undefined;
	const data: SuratSaya = dataLocal ? JSON.parse(dataLocal) : undefined;
	const surat = data?.detail;
	const kop_surat = data?.kop_surat;
	const profil_desa = data?.profil_desa;

	return (
		<>
			<div className="flex flex-col gap-5 w-full">
				<Breadcrumbs
					items={[
						{
							label: "Beranda",
							to: "/modules/dashboard",
						},
						{
							label: isLayananPersuratan ? "Layanan Persuratan" : "Aktivitas",
							to: isLayananPersuratan
								? `/modules/layanan/layanan-persuratan?${searchParams?.toString()}`
								: `/modules/aktivitas?${searchParams?.toString()}`,
						},

						{
							label: "Detail",
							to: "",
						},
					]}
				/>
				<BackLabel label="Detail Surat" />
				<div
					style={{
						boxShadow: "0px 4px 4px 0px #0000000A",
					}}
					className="flex bg-white rounded-md flex-col gap-4 md:flex-row w-full p-4"
				>
					<div className="w-full">
						{showDetailSurat(data?.nama_surat, kop_surat, profil_desa, surat)}
					</div>
					<div className="w-full flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<div
								className={clsx("py-1.5 px-4 rounded-md text-white text-sm", {
									"bg-[#2769CD]": data?.status?.toLowerCase() === "menunggu",
									"bg-[#27CD7F]": data?.status?.toLowerCase() === "selesai",
									"bg-[#CD2738]": data?.status?.toLowerCase() === "dibatalkan",
									"bg-[#CDA327]": data?.status?.toLowerCase() === "diproses",
								})}
							>
								{convertFromSnakeCase(data?.status)}
							</div>
							<p className="text-[#888]">
								Diproses pada:{" "}
								{data?.tanggal_diajukan
									? dayjs(data?.tanggal_diajukan)
											.locale("id")
											.format("DD MMMM YYYY | HH:mm WIB")
									: "-"}
							</p>
						</div>
						<LabelComponent
							label="Jenis Surat"
							value={data?.nama_surat || "-"}
						/>
						<LabelComponent
							label="NIK Pelapor"
							value={data?.detail?.nik || "-"}
						/>
						<LabelComponent
							label="Nama Pelapor"
							value={data?.detail?.nama || "-"}
						/>
						{PrintSurat(data?.nama_surat, kop_surat, profil_desa, surat)}
					</div>
				</div>
			</div>
		</>
	);
}

function LabelComponent({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex flex-col gap-1 w-full">
			<p className="text-[#888]">{label}</p>
			<p>{value}</p>
		</div>
	);
}
