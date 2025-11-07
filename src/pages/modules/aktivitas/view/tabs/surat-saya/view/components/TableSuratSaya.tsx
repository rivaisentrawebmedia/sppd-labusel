import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { SuratSaya } from "../../model";
import { FaInfoCircle } from "react-icons/fa";
import dayjs from "dayjs";
import clsx from "clsx";
import { convertSlugToText } from "@/utils/helpers";

export const TabelSuratSaya = () => {
	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page") || 1);
	const limit = Number(searchParams.get("limit") || 10);

	const navigate = useNavigate();
	const columns: ColumnDef<SuratSaya>[] = [
		{
			accessorKey: "no",
			header: () => <div className="text-center">#</div>,
			cell: (row) => {
				const idx = row.row.index;
				return (
					<div className="text-center">{(page - 1) * limit + idx + 1}</div>
				);
			},
		},

		// ✅ Judul Ujian
		{
			accessorKey: "tanggal_diajukan",
			header: "Tgl. Diajukan",
			cell: (row) => {
				const values = row.row.original;
				return (
					<p>
						{values?.tanggal_diajukan
							? dayjs(values?.tanggal_diajukan)
									.locale("id")
									.format("DD-MM-YYYY")
							: "-"}
					</p>
				);
			},
		},

		// ✅ Deskripsi
		{
			accessorKey: "jenis_surat",
			header: "Jenis Surat",
		},
		{
			accessorKey: "nama_surat",
			header: "Nama Surat",
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: (row) => {
				const values = row.row.original?.status;
				return (
					<div className="flex items-center gap-1.5">
						<div
							className={clsx("w-3 h-3 rounded-full", {
								"bg-[#2769CD]": values?.toLowerCase() === "menunggu",
								"bg-[#27CD7F]": values?.toLowerCase() === "selesai",
								"bg-[#CD2738]": values?.toLowerCase() === "dibatalkan",
								"bg-[#CDA327]": values?.toLowerCase() === "diproses",
							})}
						/>
						<p>{values ? convertSlugToText(values) : "-"}</p>
					</div>
				);
			},
		},

		// ✅ Aksi (Ikon Panah)
		{
			accessorKey: "action",
			header: "", // Header kosong
			size: 40,
			cell: (row) => {
				const values = row.row.original;
				return (
					<div className="flex  justify-center">
						<button
							onClick={() => {
								const data = JSON.stringify(values);
								localStorage.setItem("data", data);
								navigate(
									`/modules/layanan/layanan-persuratan/${values?.id}/detail`
								);
							}}
							className="bg-[#2769CD] text-white p-1.5 rounded-md"
						>
							<FaInfoCircle />
						</button>
					</div>
				);
			},
		},
	];
	return {
		columns,
	};
};
