import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { TabelBukuTamu } from "./components";
import { useGetBukuTamu } from "../controller";
import TableCustom from "@/components/common/table/TableCutom";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { TitleComponent } from "@/components/common/title/TitleComponent";

export default function BukuTamuPage() {
	const navigate = useNavigate();
	const { loading, meta, surat } = useGetBukuTamu();

	const { columns } = TabelBukuTamu();
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
							to: "",
						},
					]}
				/>

				<TitleComponent
					title="Isi Buku Tamu"
					deskripsi={
						<div className="font-light text-[#333]">
							<p>Silahkan isi buku tamu untuk mencatat data kunjungan Anda.</p>
						</div>
					}
				/>

				<div className="flex flex-col gap-4 bg-white rounded-md p-4 shadow">
					<div className="flex md:items-center md:flex-row flex-col gap-2 md:justify-between">
						<p className="text-lg font-medium">Riwayat Kunjungan Anda</p>
						<button
							type="button"
							onClick={() => {
								navigate("tambah");
							}}
							className="flex hover:bg-[#272CCD] justify-center hover:text-white duration-300 transition-colors items-center gap-2 border border-[#272CCD] text-[#272CCD] rounded-sm py-1.5 px-4"
						>
							<Plus size={18} />
							Isi Buku Tamu
						</button>
					</div>
					<div className="w-full md:flex-1 rounded-md">
						<TableCustom
							columns={columns}
							data={surat}
							tdClassName="whitespace-pre-line align-top"
							classNameSearch="!rounded-full bg-white"
							isShowPagination
							isShowFilter
							className="border border-[#CDCDCD]"
							loading={loading}
							meta={{
								last_page: meta?.last_page || 1,
								total: meta?.total || 0,
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
