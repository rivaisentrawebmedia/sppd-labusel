import { formatRupiah } from "@/utils/helpers";
import type { PesananSayaDetail } from "../../model";

export function DetailPembayaran({
	data,
}: {
	data: PesananSayaDetail | undefined;
}) {
	const totalPesanan = data?.detail?.reduce((subtotal, d) => {
		return subtotal + d?.qty * parseInt(d?.harga, 10);
	}, 0);
	return (
		<>
			<div
				className="flex flex-col gap-3 p-4 bg-white rounded-md"
				style={{
					boxShadow: "0px 4px 4px 0px #0000000A",
				}}
			>
				<p className="text-[#272CCD]">Rincian Pembayaran</p>
				<hr className="border-t w-full" />
				<div className="flex flex-col gap-2">
					<div className="flex flex-col gap-1">
						<p className="text-[#888]">Metode Pembayaran</p>
						<p className="font-bold">{data?.metode_pembayaran || "-"}</p>
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-[#888]">Total</p>
						<p className="font-bold text-[#272CCD] text-xl">
							{formatRupiah(totalPesanan || 0)}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
