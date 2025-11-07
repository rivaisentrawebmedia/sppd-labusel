import { FaCheck } from "react-icons/fa";
import type { PesananSayaStatus } from "../../model";
import { useSearchParams } from "react-router-dom";
import { convertToSlug } from "@/utils/helpers";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";

export function StatusPesanan({
	data,
	loading,
}: {
	data: PesananSayaStatus[];
	loading?: boolean;
}) {
	const [searchParams, setSearchParams] = useSearchParams();
	const status = searchParams.get("status") || undefined;

	const handleStatus = (query: string) => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			if (status === query) {
				newParams.delete("status");
			} else {
				newParams.set("status", query);
				newParams.set("page", "1");
			}
			return newParams;
		});
	};

	return (
		<>
			<div className="flex flex-col gap-3">
				<p className="font-medium">Status Pesanan</p>
				<div className="flex flex-col gap-2">
					{loading ? (
						<>
							<Skeleton className="w-full h-6" />
							<Skeleton className="w-full h-6" />
							<Skeleton className="w-full h-6" />
							<Skeleton className="w-full h-6" />
						</>
					) : data?.length > 0 ? (
						data?.map((item, idx) => {
							const isCheck = convertToSlug(item?.status) === status;
							return (
								<div
									onClick={() => {
										handleStatus(convertToSlug(item?.status));
									}}
									className="flex items-center cursor-pointer justify-between gap-4"
									key={idx}
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
										<p className="flex-1">{item?.status}</p>
									</div>
									<p className="text-sm">{item?.total}</p>
								</div>
							);
						})
					) : (
						<p className="italic text-[#888]">Tidak ada data</p>
					)}
				</div>
			</div>
		</>
	);
}
