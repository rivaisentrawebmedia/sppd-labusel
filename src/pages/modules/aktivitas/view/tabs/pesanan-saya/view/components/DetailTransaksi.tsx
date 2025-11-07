import dayjs from "dayjs";
import type { PesananSayaDetail } from "../../model";

export function DetailTransaksi({
	data,
}: {
	data: PesananSayaDetail | undefined;
}) {
	return (
		<>
			<div
				className="flex flex-col gap-3 p-4 bg-white rounded-md"
				style={{
					boxShadow: "0px 4px 4px 0px #0000000A",
				}}
			>
				<p className="text-[#272CCD]">Informasi Transaksi</p>
				<hr className="border-t w-full" />

				<div className="flex flex-col gap-2">
					<LabelComponent
						label="Serial Number:"
						value={data?.serial_number || "-"}
					/>
					<LabelComponent
						label="Tanggal Pembelian:"
						value={
							data?.created_at
								? dayjs(data?.created_at).locale("id").format("")
								: "-"
						}
					/>
					<LabelComponent
						label="Nomor Penerima:"
						value={data?.no_telp || "-"}
					/>
				</div>
			</div>
		</>
	);
}

function LabelComponent({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex flex-col gap-1">
			<p className="text-[#888]">{label}</p>
			<p className="font-bold">{value}</p>
		</div>
	);
}
