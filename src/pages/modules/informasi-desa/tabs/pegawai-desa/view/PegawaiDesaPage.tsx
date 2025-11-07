import { Skeleton } from "@/components/ui/skeleton";
import { useGetPegawaiDesa } from "../controller";
import type { JSX } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Image } from "@/components/common/image/getImage";

export default function PegawaiDesaPage() {
	const { data, loading } = useGetPegawaiDesa();

	return (
		<>
			{loading ? (
				// 💨 Tampilan skeleton ketika loading
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					{Array.from({ length: 4 }).map((_, i) => (
						<div
							key={i}
							className="flex flex-col gap-3 bg-[#F5F5FF] p-4 rounded-md border border-[#7074F2]/40"
						>
							{/* Jabatan */}
							<Skeleton className="h-4 w-1/2 bg-gray-200 rounded-md" />

							{/* Foto Profil */}
							<div className="flex items-center justify-center">
								<Skeleton className="w-[100px] h-[100px] rounded-full bg-gray-200" />
							</div>

							{/* Nama */}
							<Skeleton className="h-5 w-3/4 bg-gray-200 rounded-md mx-auto" />

							{/* Kontak */}
							<div className="flex flex-col gap-2 mt-2">
								<Skeleton className="h-4 w-full bg-gray-200 rounded-md" />
								<Skeleton className="h-4 w-5/6 bg-gray-200 rounded-md" />
							</div>
						</div>
					))}
				</div>
			) : data?.length > 0 ? (
				// ✅ Data siap ditampilkan
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					{data?.map((item, idx) => (
						<div
							key={idx}
							className="flex flex-col gap-2 bg-[#F5F5FF] p-4 rounded-md border border-[#7074F2]"
						>
							<p className="text-sm text-[#555] font-medium">{item?.jabatan}</p>
							<div className="flex items-center justify-center">
								<Image
									alt={item?.nama || ""}
									src={item?.photo || ""}
									classNameImage="w-[100px] h-[100px] rounded-full object-cover"
									classNamePlaceHolder="w-[100px] h-[100px] bg-[#f5f5ff] rounded-full flex items-center justify-center text-xl border border-primary/20 text-primary/50"
								/>
							</div>
							<p className="text-lg font-semibold text-center">{item?.nama}</p>
							<div className="flex flex-col gap-1">
								<IconComponent
									icon={<FaPhoneAlt color="#272CCD" />}
									value={item?.no_telp || "-"}
								/>
								<IconComponent
									icon={<FaEnvelope color="#272CCD" />}
									value={item?.email || "-"}
								/>
							</div>
						</div>
					))}
				</div>
			) : (
				<p className="text-[#888] text-center mt-4">
					Tidak ada pegawai ditemukan
				</p>
			)}
		</>
	);
}

export function IconComponent({
	icon,
	value,
}: {
	icon: JSX.Element;
	value: string;
}) {
	return (
		<div className="flex items-center gap-2 text-sm text-[#222]">
			{icon}
			{value}
		</div>
	);
}
