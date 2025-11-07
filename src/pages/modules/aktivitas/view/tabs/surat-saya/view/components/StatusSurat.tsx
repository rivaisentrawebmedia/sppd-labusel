import { FaCheck } from "react-icons/fa";
import type { SuratSayaStatus } from "../../model";
import { useSearchParams } from "react-router-dom";
import { convertToSlug } from "@/utils/helpers";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";

export function StatusSurat({
	data,
	loading,
}: {
	data: SuratSayaStatus | undefined;
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

	const statusList = [
		{
			label: "Menunggu",
			value: data?.menunggu || 0,
		},
		{
			label: "Diproses",
			value: data?.diproses || 0,
		},
		{
			label: "Selesai",
			value: data?.selesai || 0,
		},
		{
			label: "Dibatalkan",
			value: data?.dibatalkan || 0,
		},
	];
	return (
		<>
			<div className="flex flex-col gap-3">
				<p className="font-medium">Status Surat</p>
				<div className="flex flex-col gap-2">
					{loading ? (
						<>
							<Skeleton className="w-full h-6" />
							<Skeleton className="w-full h-6" />
							<Skeleton className="w-full h-6" />
							<Skeleton className="w-full h-6" />
						</>
					) : (
						statusList?.map((item, idx) => {
							const isCheck = convertToSlug(item?.label) === status;
							return (
								<div
									onClick={() => {
										handleStatus(convertToSlug(item?.label));
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
										<p className="flex-1">{item?.label}</p>
									</div>
									<p className="text-sm">{item?.value}</p>
								</div>
							);
						})
					)}
				</div>
			</div>
		</>
	);
}
