import type { ReactNode } from "react";
import type { LaporanDetail } from "../../model";
import { Image } from "@/components/common/image/getImage";

export function DetailLaporan({ data }: { data: LaporanDetail | undefined }) {
	return (
		<>
			<div className="flex flex-col gap-4  bg-white rounded-md p-4">
				<LabelComponent label="Perihal" value={<p>{data?.perihal || "-"}</p>} />
				<LabelComponent label="Lokasi" value={<p>{data?.lokasi || "-"}</p>} />
				<LabelComponent
					label="Deskripsi Masalah"
					value={<p>{data?.isi || "-"}</p>}
				/>
				<LabelComponent
					label="Dampak"
					value={
						(data?.dampak || [])?.length > 0 ? (
							<ul className="list-disc pl-8">
								{data?.dampak?.map((item, idx) => {
									return <li key={idx}>{item}</li>;
								})}
							</ul>
						) : (
							<p>-</p>
						)
					}
				/>
				<LabelComponent
					label="TIndakan yang Diharapkan"
					value={
						(data?.tindakan_diharapkan || [])?.length > 0 ? (
							<ul className="list-disc pl-8">
								{data?.dampak?.map((item, idx) => {
									return <li key={idx}>{item}</li>;
								})}
							</ul>
						) : (
							<p>-</p>
						)
					}
				/>
				<LabelComponent
					label="Foto Bukti"
					value={
						(data?.photo_bukti || [])?.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-6 gap-4">
								{data?.photo_bukti?.map((item, idx) => {
									return (
										<Image
											alt={`Foto Bukti ${idx + 1}`}
											src={item || ""}
											classNameImage="w-full h-40 rounded-md object-cover"
											classNamePlaceHolder="bg-gray-100"
											key={idx}
										/>
									);
								})}
							</div>
						) : (
							<p>-</p>
						)
					}
				/>
			</div>
		</>
	);
}

function LabelComponent({ label, value }: { label: string; value: ReactNode }) {
	return (
		<div className="flex flex-col gap-2">
			<p className="text-[#888]">{label}</p>
			{value}
		</div>
	);
}
