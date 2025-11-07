import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import type { BukuTamu } from "../../model";

export const TabelBukuTamu = () => {
	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get("page") || 1);
	const limit = Number(searchParams.get("limit") || 10);

	const navigate = useNavigate();
	const columns: ColumnDef<BukuTamu>[] = [
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
			accessorKey: "tanggal_kunjungan",
			header: "Tgl. Kunjungan",
			cell: (row) => {
				const values = row.row.original;
				return (
					<p>
						{values?.tanggal_kunjungan
							? dayjs(values?.tanggal_kunjungan)
									.locale("id")
									.format("DD-MM-YYYY")
							: "-"}
					</p>
				);
			},
		},

		// ✅ Deskripsi
		{
			accessorKey: "jenis_keperluan",
			header: "Jenis Keperluan",
		},
		{
			accessorKey: "tujuan_bertamu",
			header: "Tujuan Bertamu",
		},

		// ✅ Aksi (Ikon Panah)
		{
			accessorKey: "action",
			header: "",
			cell: (row) => {
				const values = row.row.original;
				return (
					<div className="flex justify-center">
						<button
							onClick={() => navigate(`${values?.id}/detail`)}
							className="bg-[#272CCD] text-white py-1.5 px-3 rounded-md whitespace-nowrap"
						>
							Lihat Kuesioner
						</button>
					</div>
				);
			},
			size: 1,
			enableResizing: false,
			meta: { align: "center" },
		},
	];
	return {
		columns,
	};
};
