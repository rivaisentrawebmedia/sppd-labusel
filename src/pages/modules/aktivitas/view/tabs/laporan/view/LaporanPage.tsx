import { useNavigate } from "react-router-dom";
import {
	useGetLaporan,
	useGetSuratByJenis,
	useGetSuratByStatus,
} from "../controller";
import {
	JenisSurat,
	RentangWaktu,
	StatusSurat,
	TabelLaporan,
} from "./components";
import TableCustom from "@/components/common/table/TableCutom";
import { usePathname } from "@/utils/usePathname";
import clsx from "clsx";
import { TitleComponent } from "@/components/common/title/TitleComponent";
import { Breadcrumbs } from "@/components/ui/breadcrumb";

export default function LaporanPage() {
	const navigate = useNavigate();

	const { thirdPathname } = usePathname();
	const isLaporPemdes = thirdPathname === "lapor-pemdes";

	const { loading: loadingStatus, statusSurat } = useGetSuratByStatus();
	const { jenisSurat, loading: loadingJenis } = useGetSuratByJenis();
	const {
		loading: loadingSurat,
		surat,
		meta,
		setSearchParams,
	} = useGetLaporan();
	const { columns } = TabelLaporan();

	const handleReset = () => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.delete("search");
			newParams.delete("page");
			newParams.delete("limi");
			newParams.delete("status");
			newParams.delete("jenis-laporan-id");
			newParams.delete("start");
			newParams.delete("end");
			return newParams;
		});
	};

	return (
		<>
			<div className="flex flex-col gap-4">
				{isLaporPemdes && (
					<>
						<Breadcrumbs
							items={[
								{
									label: "Beranda",
									to: "/modules/dashboard",
								},

								{
									label: "Lapor Pemdes",
									to: "",
								},
							]}
						/>

						<TitleComponent
							title="Lapor Pemdes"
							deskripsi={
								<div className="font-light text-[#333]">
									<p>
										Laporkan keluhan atau aspirasi Anda dengan mudah dan cepat
									</p>
								</div>
							}
						/>
					</>
				)}
				<div
					className={clsx("flex flex-col gap-5 md:flex-row md:gap-6 w-full", {
						"bg-white p-4 rounded-md shadow": isLaporPemdes,
					})}
				>
					<div className="w-full flex flex-col gap-6 md:w-[320px] bg-[#F5F5FF] border-[#7074F2] border rounded-md p-4 h-fit">
						<StatusSurat data={statusSurat} loading={loadingStatus} />
						<RentangWaktu />
						<JenisSurat data={jenisSurat} loading={loadingJenis} />
					</div>

					<div className="w-full md:flex-1 rounded-md">
						<TableCustom
							columns={columns}
							data={surat}
							tdClassName="whitespace-pre-line align-top"
							classNameSearch="!rounded-full flex-1 bg-white"
							isShowPagination
							isShowFilter
							className="border border-[#CDCDCD]"
							loading={loadingSurat}
							meta={{
								last_page: meta?.last_page || 1,
								total: meta?.total || 0,
							}}
							addButtonCustom={
								<div className="flex items-center gap-2">
									<button
										type="button"
										onClick={handleReset}
										className="flex items-center text-nowrap justify-center gap-2 text-sm py-1.5 px-4 rounded-md bg-[#CD2738] hover:bg-[#CD2738]/80 text-white duration-300 transition-colors"
									>
										<p>Reset Pencarian</p>
									</button>
									<button
										type="button"
										onClick={() => {
											navigate("buat-laporan");
										}}
										className="flex text-nowrap items-center justify-center gap-2 text-sm py-1.5 px-4 rounded-md border border-[#272CCD] text-[#272CCD] hover:bg-[#272CCD] hover:text-white duration-300 transition-colors"
									>
										<p>Buat Laporan</p>
									</button>
								</div>
							}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
