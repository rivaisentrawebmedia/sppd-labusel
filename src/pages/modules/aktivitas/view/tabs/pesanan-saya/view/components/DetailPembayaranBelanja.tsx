import { formatRupiah } from "@/utils/helpers";
import type { PesananSayaDetail } from "../../model";
import clsx from "clsx";

export function DetailPembayaranBelanja({
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
					<LabelComponent
						label="Subtotal"
						value={formatRupiah(totalPesanan || 0)}
					/>
					<LabelComponent
						label="Biaya Ongkir"
						value={formatRupiah(Number(data?.biaya_ongkir) || 0)}
					/>
					<LabelComponent
						label="Total Pembayaran"
						value={formatRupiah(
							(totalPesanan || 0) + (Number(data?.biaya_ongkir) || 0)
						)}
						isBold
					/>
				</div>
			</div>
		</>
	);
}

function LabelComponent({
	label,
	value,
	isBold,
}: {
	label: string;
	value: string;
	isBold?: boolean;
}) {
	return (
		<div className="flex flex-col gap-2 md:items-center md:flex-row md:w-full md:gap-4">
			<p className="w-full md:w-[10rem] text-[#888]">{label}</p>
			<p
				className={clsx("", {
					"text-xl text-[#272CCD]": isBold,
				})}
			>
				{value}
			</p>
		</div>
	);
}
