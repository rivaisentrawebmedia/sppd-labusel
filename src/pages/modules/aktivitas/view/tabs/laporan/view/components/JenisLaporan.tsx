import { FaCheck } from "react-icons/fa";
import type { LaporanJenis } from "../../model";
import { useSearchParams } from "react-router-dom";
import { convertToSlug } from "@/utils/helpers";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";

export function JenisSurat({
	data,
	loading,
}: {
	data: LaporanJenis[] | undefined;
	loading?: boolean;
}) {
	const [searchParams, setSearchParams] = useSearchParams();
	const jenis_laporan_id = searchParams.get("jenis-laporan_id");

	const handleJenisLaporan = (query: string) => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			if (jenis_laporan_id === query) {
				newParams.delete("jenis-laporan_id");
			} else {
				newParams.set("jenis-laporan-id", query);
				newParams.set("page", "1");
			}
			return newParams;
		});
	};

	return (
		<div className="flex flex-col w-full gap-3">
			<p className="font-medium">Jenis Laporan</p>
			<div className="flex flex-col gap-2">
				{loading ? (
					<>
						<Skeleton className="w-full h-6" />
						<Skeleton className="w-full h-6" />
						<Skeleton className="w-full h-6" />
						<Skeleton className="w-full h-6" />
					</>
				) : (data || [])?.length > 0 ? (
					data?.map((item, idx) => {
						const isCheck =
							convertToSlug(item?.jenis_laporan) === jenis_laporan_id;
						return (
							<div className="flex flex-col gap-2" key={idx}>
								{/* --- Header --- */}
								<div
									onClick={() =>
										handleJenisLaporan(convertToSlug(item?.jenis_laporan))
									}
									className="flex items-center cursor-pointer justify-between gap-4"
								>
									<div className="flex items-center gap-2">
										<div
											className={clsx(
												"flex items-center rounded-[3px] border justify-center duration-300 transition-colors h-4 w-4 ",
												{
													"bg-[#272CCD] border-transparent text-[#f5f5ff]":
														isCheck,
													"border-[#272CCD]": !isCheck,
												}
											)}
										>
											{isCheck && <FaCheck size={10} />}
										</div>
										<p>{item?.jenis_laporan}</p>
									</div>
									<p className="text-sm">{item?.total} </p>
								</div>
							</div>
						);
					})
				) : (
					<p className="italic text-[#888]">Tidak ada data</p>
				)}
			</div>
		</div>
	);
}
