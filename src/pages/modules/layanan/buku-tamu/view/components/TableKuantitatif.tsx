import type { ColumnDef } from "@tanstack/react-table";
import type { DetailJawaban } from "../../model";

export const TabelKuantitatif = () => {
	const columns: ColumnDef<DetailJawaban>[] = [
		{
			accessorKey: "no",
			header: () => <div className="text-center">#</div>,
			cell: (row) => {
				const idx = row.row.index;
				return <div className="text-center">{idx + 1}</div>;
			},
		},

		// ✅ Deskripsi
		{
			accessorKey: "pertanyaan",
			header: "Pertanyaan",
			size: 1,
		},
		{
			accessorKey: "jawaban",
			header: () => <div className="text-center">Jawaban</div>,
			cell: (row) => {
				const values = row.row.original;
				return (
					<div className="flex justify-center">{values?.jawaban || "-"}</div>
				);
			},
		},
	];
	return {
		columns,
	};
};
