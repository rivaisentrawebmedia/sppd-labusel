import TableCustom from "@/components/common/table/TableCutom";
import { Card, CardContent } from "@/components/ui/card";
import { useGetSurat } from "@/pages/modules/aktivitas/view/tabs/surat-saya/controller";
import { TabelSuratSaya } from "@/pages/modules/aktivitas/view/tabs/surat-saya/view/components";

export function BerandaSurat() {
	const { loading: loadingSurat, surat } = useGetSurat();
	const { columns } = TabelSuratSaya();

	return (
		<>
			<Card>
				<CardContent className="flex flex-col gap-4 p-5 ">
					<p>Histori Layanan Persuratan</p>
					<TableCustom
						columns={columns}
						data={surat?.slice(0, 5)}
						tdClassName="whitespace-pre-line align-top"
						classNameSearch="!rounded-full flex-1 bg-white"
						isShowPagination={false}
						isShowFilter={false}
						className="border border-[#CDCDCD]"
						loading={loadingSurat}
					/>
				</CardContent>
			</Card>
		</>
	);
}
