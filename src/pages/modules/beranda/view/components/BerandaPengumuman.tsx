import { IconMegaPhone } from "@/assets/icons/MegaPhone";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useGetPengumuman } from "../../controllers";
import { SafeHTML } from "@/utils/safeHTML";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";

export function BerandaPengumuman() {
	const { loading, pengumuman } = useGetPengumuman();

	return (
		<Card>
			<CardContent className="flex flex-col gap-4 p-5 rounded-md">
				{/* Header */}
				<div className="flex items-center gap-2">
					<IconMegaPhone />
					<p>Pengumuman</p>
				</div>

				{/* ✅ Loading skeleton */}
				{loading ? (
					<div className="grid grid-cols-1 gap-6">
						{Array.from({ length: 3 }).map((_, idx) => (
							<div key={idx} className="flex flex-col gap-2">
								<Skeleton className="h-3 w-24" /> {/* kategori */}
								<Skeleton className="h-5 w-3/4" /> {/* isi */}
								<Skeleton className="h-3 w-32" /> {/* tanggal */}
							</div>
						))}
					</div>
				) : pengumuman?.length > 0 ? (
					/* ✅ Data tampil */
					<div className="grid grid-cols-1 gap-6">
						{pengumuman?.slice(0, 3)?.map((item, idx) => (
							<Link
								to={`/modules/pengumuman/${item?.id}`}
								className="flex cursor-pointer flex-col gap-2 group"
								key={idx}
							>
								<p className="text-[#9C9C9C] text-sm">
									{item?.kategori_pengumuman || "-"}
								</p>
								<div className="font-medium group-hover:text-yellow-600 text-[#0E1287] line-clamp-2">
									{SafeHTML({ html: item?.isi || "" })}
								</div>
								<p className="text-[#9C9C9C] text-sm">
									{item?.updated_at
										? dayjs(item?.updated_at)
												.locale("id")
												.format("DD-MM-YYYY | HH:mm WIB")
										: "-"}
								</p>
							</Link>
						))}
					</div>
				) : (
					/* ✅ Jika kosong */
					<p className="text-[#888]">Tidak ada pengumuman tersedia</p>
				)}

				{/* Footer link */}
				<div className="flex items-center justify-end">
					<Link
						to={"/modules/pengumuman"}
						className="text-[#272CCD] underline underline-offset-4 hover:text-[#272CCD]/50 duration-300 transition-colors"
					>
						Lihat Semua Pengumuman
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
