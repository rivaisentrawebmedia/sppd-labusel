import dayjs from "dayjs";
import type { PesananSayaDetail } from "../../model";
import clsx from "clsx";

export function DetailTransaksiBelanja({
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
					<div className="flex flex-col gap-1">
						<p className="text-[#888]">Status</p>
						<div
							className={clsx("py-1.5 w-fit px-4 text-sm border rounded-md ", {
								"bg-[#2769CD] border-transparent text-white":
									data?.status === "Diproses",
								"bg-[] border-[#2769CD] text-[#2769CD]":
									data?.status === "Menunggu Konfirmasi",
								"bg-[#27CD7F] border-transparent text-white":
									data?.status === "Selesai",
								"bg-[#CDA327] border-transparent text-white":
									data?.status === "Dikirim",
								"bg-[#CD2738] border-transparent text-white":
									data?.status === "Ditolak",
							})}
						>
							{data?.status}
						</div>
					</div>
					<LabelComponent
						label="Tanggal Pesanan:"
						value={
							data?.created_at
								? dayjs(data?.created_at).locale("id").format("")
								: "-"
						}
					/>
					<LabelComponent label="Invoice:" value={data?.invoice || "-"} />
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
