import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Laporan } from "../../model";
import { FaInfoCircle } from "react-icons/fa";
import dayjs from "dayjs";
import clsx from "clsx";
import { convertFromSnakeCase } from "@/utils/helpers";

export const TabelLaporan = () => {
	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page") || 1);
	const limit = Number(searchParams.get("limit") || 10);

	const navigate = useNavigate();
	const columns: ColumnDef<Laporan>[] = [
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
			accessorKey: "tanggal_laporan",
			header: "Tgl. Dilaporkan",
			cell: (row) => {
				const values = row.row.original;
				return (
					<p>
						{values?.tanggal_laporan
							? dayjs(values?.tanggal_laporan).locale("id").format("DD-MM-YYYY")
							: "-"}
					</p>
				);
			},
		},

		// ✅ Deskripsi
		{
			accessorKey: "jenis_laporan",
			header: "Jenis Laporan",
		},
		{
			accessorKey: "isi",
			header: "Isi Laporan",
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
								"bg-[#2769CD]": values?.toLowerCase() === "baru",
								"bg-[#27CD7F]": values?.toLowerCase() === "selesai",
								"bg-[#CD2738]": values?.toLowerCase() === "ditolak",
								"bg-[#CDA327]": values?.toLowerCase() === "diproses",
							})}
						/>
						<p>{values ? convertFromSnakeCase(values) : "-"}</p>
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
								navigate(`${values?.id}/detail`);
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
