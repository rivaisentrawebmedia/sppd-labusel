import { LoadingMona } from "@/components/ui/loading";
import {
	useGetPesanan,
	useGetPesananByJenis,
	useGetPesananByStatus,
} from "../controller";
import {
	JenisPesanan,
	PesananSayaKonten,
	RentangWaktu,
	StatusPesanan,
} from "./components";

export default function PesananSayaPage() {
	const { loading: loadingStatus, statusPesanan } = useGetPesananByStatus();
	const { jenisPesanan, loading: loadingJenis } = useGetPesananByJenis();
	const { loading: loadingPesanan, pesanan, meta } = useGetPesanan();

	return (
		<>
			<div className="flex flex-col gap-5 md:flex-row md:gap-6 w-full">
				<div className="w-full flex flex-col gap-6 md:w-[320px] bg-[#F5F5FF] border-[#7074F2] border rounded-md p-4 h-fit">
					<StatusPesanan data={statusPesanan} loading={loadingStatus} />
					<RentangWaktu />
					<JenisPesanan data={jenisPesanan} loading={loadingJenis} />
				</div>
				{loadingPesanan ? (
					<LoadingMona />
				) : (
					<div className="w-full md:flex-1 rounded-md">
						<PesananSayaKonten data={pesanan} meta={meta} />
					</div>
				)}
			</div>
		</>
	);
}
