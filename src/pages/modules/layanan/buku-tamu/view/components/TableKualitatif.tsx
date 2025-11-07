import type { ColumnDef } from "@tanstack/react-table";
import type { DetailJawaban } from "../../model";

export const TabelKualitatif = () => {
	const columns: ColumnDef<DetailJawaban>[] = [
		{
			accessorKey: "no",
			header: () => <div className="text-center">#</div>,
			cell: (row) => {
				const idx = row.row.index;
				return <div className="text-center ">{idx + 1}</div>;
			},
		},

		// ✅ Deskripsi
		{
			accessorKey: "pertanyaan",
			header: "Pertanyaan",
		},
		{
			accessorKey: "jawaban",
			header: "Jawaban",
		},
	];
	return {
		columns,
	};
};
