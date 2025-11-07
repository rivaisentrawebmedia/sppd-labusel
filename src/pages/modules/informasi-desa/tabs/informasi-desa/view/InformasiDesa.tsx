import { Image } from "@/components/common/image/getImage";
import { useGetProfilDesa } from "../controller";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaLink } from "react-icons/fa";

export default function InformasiDesaPage() {
	const { data, loading } = useGetProfilDesa();

	return (
		<div className="flex flex-col gap-4 md:flex-row md:gap-6 md:items-center">
			{/* 🏞️ Foto / Logo Desa */}
			<div className="flex items-center justify-center w-[280px] h-[280px] md:w-[310px] md:h-[310px] rounded-lg overflow-hidden">
				{loading ? (
					<Skeleton className="h-full w-full rounded-lg" />
				) : (
					<Image
						alt={data?.alamat || ""}
						src={data?.photo || ""}
						classNameImage="w-full h-full object-cover rounded-lg"
						classNamePlaceHolder="w-full h-full bg-[#f5f5ff] flex items-center justify-center text-3xl border border-primary/20 text-primary/50"
					/>
				)}
			</div>

			{/* 🧾 Informasi Desa */}
			<div className="grid grid-cols-1 w-full flex-1 md:grid-cols-2 gap-4 md:gap-6">
				{loading ? (
					// 💨 Skeleton Grid saat loading
					Array.from({ length: 8 }).map((_, i) => (
						<div key={i} className="flex flex-col gap-2">
							<Skeleton className="h-4 w-32 bg-gray-200 rounded-md" />
							<Skeleton className="h-6 w-full bg-gray-200 rounded-md" />
						</div>
					))
				) : (
					<>
						<LabelComponent label="Kecamatan" value={data?.kecamatan || "-"} />
						<LabelComponent label="Kabupaten" value={data?.kabupaten || "-"} />
						<LabelComponent
							label="Nama Jalan dan Nomor Blok"
							value={data?.alamat || "-"}
						/>
						<LabelComponent
							label="Kode Wilayah"
							value={data?.kode_wilayah || "-"}
						/>
						<LabelComponent label="Kode Pos" value={data?.kode_pos || "-"} />
						<LabelComponent
							label="Nomor Telepon"
							value={data?.no_telp || "-"}
						/>
						<LabelComponent label="Email" value={data?.email || "-"} />
						<LabelComponent
							label="URL Website"
							value={
								data?.web_url ? (
									<Link
										to={data?.web_url}
										target="_blank"
										className="text-[#2769CD] flex items-center gap-1 hover:underline transition-all"
										rel="noopener noreferrer"
									>
										<p>{data?.web_url}</p>
										<FaLink className="text-[#2769CD]" />
									</Link>
								) : (
									"-"
								)
							}
						/>
					</>
				)}
			</div>
		</div>
	);
}

/* 🔹 LabelComponent — menampilkan label dan nilai */
export function LabelComponent({
	label,
	value,
}: {
	label: string;
	value: string | ReactNode;
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<p className="text-sm text-[#888]">{label}</p>
			<div className="text-base md:text-lg text-[#222] font-medium">
				{value}
			</div>
		</div>
	);
}
