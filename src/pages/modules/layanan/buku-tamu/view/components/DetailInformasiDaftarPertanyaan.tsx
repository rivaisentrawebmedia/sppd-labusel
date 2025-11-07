import { useState } from "react";
import type { BukuTamuByID } from "../../model";
import { convertFromSnakeCase } from "@/utils/helpers";
import dayjs from "dayjs";
import { TabelKuantitatif } from "./TableKuantitatif";
import { TabelKualitatif } from "./TableKualitatif";
import TableCustom from "@/components/common/table/TableCutom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function DetailInformasiDaftarPertanyaan({
	data,
}: {
	data: BukuTamuByID | undefined;
}) {
	const [idx, setIdx] = useState<number>(0);

	const item = data?.list_kuiosioner?.[idx];
	const isKuantitatif = item?.jenis_kuisioner === "kuantitatif";

	const { columns: columnsKuantitatif } = TabelKuantitatif();
	const { columns: columnsKualitatif } = TabelKualitatif();

	return (
		<>
			{(data?.list_kuiosioner || [])?.length > 0 && (
				<div className="flex flex-col gap-4" key={idx}>
					<div className="flex flex-col gap-2 bg-white rounded-md p-4 shadow w-full">
						<div className="flex items-center justify-between gap-4">
							<p>
								{item?.jenis_kuisioner
									? convertFromSnakeCase(item?.jenis_kuisioner)
									: "-"}
							</p>
							<p>
								Tanggal Diisi:{" "}
								{item?.created_at
									? dayjs(item?.created_at).locale("id").format("DD MMMM YYYY")
									: "-"}
							</p>
						</div>
						<p className="text-xl font-medium text-[#272CCD]">
							{item?.judul || "-"}
						</p>
						<div className="flex items-center justify-end gap-3">
							<button
								disabled={idx <= 0}
								onClick={() => {
									setIdx(idx - 1);
								}}
								className="w-[32px] disabled:bg-[#0E1287]/30 h-[32px] bg-[#0E1287] text-white rounded-full flex items-center justify-center cursor-pointer"
							>
								<FaArrowLeft />
							</button>
							<button
								disabled={idx >= (data?.list_kuiosioner || [])?.length - 1}
								onClick={() => {
									setIdx(idx + 1);
								}}
								className="w-[32px] disabled:bg-[#0E1287]/30 h-[32px] bg-[#0E1287] text-white rounded-full flex items-center justify-center cursor-pointer"
							>
								<FaArrowRight />
							</button>
						</div>
					</div>
					<div className="flex flex-col gap-2 bg-white rounded-md p-4 shadow w-full">
						<p className="text-[#272CCD] font-medium text-lg">
							Daftar Pertanyaan ({item?.jawaban?.length})
						</p>

						{isKuantitatif ? (
							<TableCustom
								columns={columnsKuantitatif}
								data={item?.jawaban}
								tdClassName="whitespace-pre-line align-top"
								classNameSearch="!rounded-full bg-white"
								className="border border-[#CDCDCD]"
								isShowPagination={false}
								isShowFilter={false}
							/>
						) : (
							<TableCustom
								columns={columnsKualitatif}
								data={item?.jawaban}
								tdClassName="whitespace-pre-line align-top"
								classNameSearch="!rounded-full bg-white"
								className="border border-[#CDCDCD]"
								isShowPagination={false}
								isShowFilter={false}
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
}
