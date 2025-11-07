import type { PesananSayaDetail } from "../../model";

export function DetailPengiriman({
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
				<p className="text-[#272CCD]">Detail Pengiriman</p>
				<hr className="border-t w-full" />

				<div className="flex flex-col gap-2">
					<LabelComponent
						label="Alamat Pengiriman:"
						value={data?.pengiriman?.alamat || "-"}
					/>
					<LabelComponent
						label="Kurir Dipilih:"
						value={data?.pengiriman?.kurir || "-"}
					/>
					<LabelComponent
						label="No. Resi:"
						value={data?.pengiriman?.no_resi || "-"}
					/>
					<div className="flex flex-col gap-1">
						<p className="text-[#888]">Estimasi Tiba</p>
						<p className="font-bold text-[#272CCD]">
							{data?.pengiriman?.tgl_tiba || "-"}
						</p>
					</div>
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
