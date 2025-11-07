import { IconNewsPaper } from "@/assets/icons/NewsPaper";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useGetBerita } from "../../controllers";
import { Image } from "@/components/common/image/getImage";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";

export function BerandaBlog() {
	const { berita, loading } = useGetBerita();

	return (
		<Card>
			<CardContent className="flex flex-col gap-4 p-5">
				{/* Header */}
				<div className="flex items-center justify-between rounded-md">
					<div className="flex items-center gap-2">
						<IconNewsPaper />
						<p>Blog Terbaru</p>
					</div>
					<Link
						to={"/modules/blog-desa"}
						className="text-[#272CCD] underline underline-offset-4 hover:text-[#272CCD]/50 duration-300 transition-colors"
					>
						Lihat Semua
					</Link>
				</div>

				{/* ✅ Loading State */}
				{loading ? (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{Array.from({ length: 3 }).map((_, idx) => (
							<div key={idx} className="flex flex-col gap-2">
								<Skeleton className="w-full h-[180px] rounded-md" />
								<Skeleton className="h-4 w-3/4" />
								<div className="flex items-center gap-2">
									<Skeleton className="h-3 w-16" />
									<div className="h-[4px] w-[4px] rounded-full bg-gray-300" />
									<Skeleton className="h-3 w-12" />
								</div>
							</div>
						))}
					</div>
				) : berita?.length > 0 ? (
					/* ✅ Data tampil */
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{berita?.slice(0, 3)?.map((item, idx) => (
							<Link
								to={`/modules/blog-desa/${item?.id}`}
								className="flex flex-col group gap-2 cursor-pointer"
								key={idx}
							>
								<div className="relative overflow-hidden">
									<Image
										alt={item?.gambar?.[0]?.label}
										src={item?.gambar?.[0]?.id}
										classNameImage="w-full h-[180px] group-hover:scale-110 duration-300 transition-all rounded-md object-cover"
										classNamePlaceHolder="w-full h-[180px] bg-primary/10 text-2xl flex items-center justify-center rounded-md border-primary/30 text-primary/50"
									/>
								</div>
								<p className="text-[#222222] font-medium line-clamp-2 group-hover:text-yellow-600 duration-300 transition-colors">
									{item?.judul}
								</p>
								<div className="flex items-center text-[#222] font-light gap-2 text-sm transition-all">
									<p>
										{item?.tanggal_publish
											? dayjs(item?.tanggal_publish)
													.locale("id")
													.format("DD-MM-YYYY")
											: ""}
									</p>
									<div className="h-[4px] w-[4px] rounded-full bg-[#9C9C9C]" />
									<p>{item?.kategori_berita}</p>
								</div>
							</Link>
						))}
					</div>
				) : (
					/* ✅ Jika kosong */
					<p className="text-[#888]">Tidak ada blog tersedia</p>
				)}
			</CardContent>
		</Card>
	);
}
