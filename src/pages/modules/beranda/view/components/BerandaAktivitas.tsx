import { IconThreeOClock } from "@/assets/icons/ThreeOClock";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useGetAktivitasSaya } from "../../controllers";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";
import clsx from "clsx";
import { convertFromSnakeCase } from "@/utils/helpers";

export function BerandaAktivitas() {
	const { aktivitasSaya, loading } = useGetAktivitasSaya();
	return (
		<>
			<Card>
				<CardContent className="flex flex-col gap-4 p-5 rounded-md">
					<div className="flex items-center gap-2">
						<IconThreeOClock />
						<p>Aktivitas Terakhir</p>
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
					) : aktivitasSaya?.length > 0 ? (
						/* ✅ Data tampil */
						<div className="grid grid-cols-1 gap-6">
							{aktivitasSaya?.slice(0, 3)?.map((item, idx) => {
								const isSurat = item?.tipe_layanan === "surat";
								const isLaporan = item?.tipe_layanan === "laporan";
								const isBukuTamu = item?.tipe_layanan === "buku_tamu";

								const status = item?.status;

								const link = isSurat
									? `/modules/aktivitas/${item?.surat_id}/detail`
									: isLaporan
									? `/modules/aktivitas/laporan/${item?.laporan_id}/detail`
									: isBukuTamu
									? `/modules/layanan/buku-tamu/${item?.buku_tamu_id}/detail`
									: "";
								return (
									<Link
										to={link}
										className="flex cursor-pointer flex-col gap-2 group"
										key={idx}
									>
										<p
											className={clsx("text-sm", {
												"bg-[#2769CD]": status?.toLowerCase() === "menunggu",
												"bg-[#27CD7F]": status?.toLowerCase() === "selesai",
												"bg-[#CD2738]": status?.toLowerCase() === "dibatalkan",
												"bg-[#CDA327]": status?.toLowerCase() === "diproses",
											})}
										>
											{convertFromSnakeCase(item?.tipe_layanan)} -{" "}
											{convertFromSnakeCase(status)}
										</p>
										<div className="font-medium group-hover:text-yellow-600 text-lg line-clamp-2">
											{isSurat
												? item?.jenis_surat
												: isBukuTamu
												? item?.jenis_keperluan
												: isLaporan
												? item?.jenis_laporan
												: "-"}
										</div>
										<p className="text-[#9C9C9C]">{item?.title}</p>
										<p className="text-[#9C9C9C] text-sm">
											{item?.created_at
												? dayjs(item?.created_at)
														.locale("id")
														.format("DD-MM-YYYY | HH:mm WIB")
												: "-"}
										</p>
									</Link>
								);
							})}
						</div>
					) : (
						/* ✅ Jika kosong */
						<p className="text-[#888]">Tidak ada aktivitas tersedia</p>
					)}

					{/* Footer link */}
					<div className="flex items-center justify-end">
						<Link
							to={"/modules/aktivitas"}
							className="text-[#272CCD] underline underline-offset-4 hover:text-[#272CCD]/50 duration-300 transition-colors"
						>
							Lihat Semua Aktivitas
						</Link>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
