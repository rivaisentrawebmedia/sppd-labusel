import { useNavigate } from "react-router-dom";
import {
	useGetSurat,
	useGetSuratByJenis,
	useGetSuratByStatus,
} from "../controller";
import {
	JenisSurat,
	RentangWaktu,
	StatusSurat,
	TabelSuratSaya,
} from "./components";
import TableCustom from "@/components/common/table/TableCutom";
import { usePathname } from "@/utils/usePathname";
import clsx from "clsx";
import { TitleComponent } from "@/components/common/title/TitleComponent";
import { Breadcrumbs } from "@/components/ui/breadcrumb";

export default function SuratSayaPage() {
	const navigate = useNavigate();

	const { thirdPathname } = usePathname();
	const isLayananPersuratan = thirdPathname === "layanan-persuratan";

	const { loading: loadingStatus, statusSurat } = useGetSuratByStatus();
	const { jenisSurat, loading: loadingJenis } = useGetSuratByJenis();
	const { loading: loadingSurat, surat, meta, setSearchParams } = useGetSurat();
	const { columns } = TabelSuratSaya();

	const handleReset = () => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.delete("search");
			newParams.delete("page");
			newParams.delete("limi");
			newParams.delete("status");
			newParams.delete("nama-surat");
			newParams.delete("jenis-surat");
			newParams.delete("start");
			newParams.delete("end");
			return newParams;
		});
	};

	return (
		<>
			<div className="flex flex-col gap-4">
				{isLayananPersuratan && (
					<>
						<Breadcrumbs
							items={[
								{
									label: "Beranda",
									to: "/modules/dashboard",
								},

								{
									label: "Layanan Persuratan",
									to: "",
								},
							]}
						/>

						<TitleComponent
							title="Layanan Persuratan"
							deskripsi={
								<div className="font-light text-[#333]">
									<p>
										Silahkan ajukan permintaan pembuatan surat yang anda
										perlukan melalui layanan persuratan ini
									</p>
								</div>
							}
						/>
					</>
				)}
				<div
					className={clsx("flex flex-col gap-5 md:flex-row md:gap-6 w-full", {
						"bg-white p-4 rounded-md shadow": isLayananPersuratan,
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
											navigate("ajukan-surat");
										}}
										className="flex items-center text-nowrap justify-center gap-2 text-sm py-1.5 px-4 rounded-md border border-[#272CCD] text-[#272CCD] hover:bg-[#272CCD] hover:text-white duration-300 transition-colors"
									>
										<p>Ajukan Surat</p>
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
