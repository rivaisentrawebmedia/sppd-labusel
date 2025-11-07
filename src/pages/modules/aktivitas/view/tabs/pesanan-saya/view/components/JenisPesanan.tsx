import { FaCaretDown, FaCheck } from "react-icons/fa";
import type { PesananSayaJenis } from "../../model";
import { useSearchParams } from "react-router-dom";
import { convertToSlug, formatRupiah } from "@/utils/helpers";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export function JenisPesanan({
	data,
	loading,
}: {
	data: PesananSayaJenis[] | undefined;
	loading?: boolean;
}) {
	const [searchParams, setSearchParams] = useSearchParams();
	const jenis_produk_id = searchParams.get("jenis_produk_id");
	const sub_jenis_id = searchParams.get("sub_jenis_id");

	// Simpan index accordion yang terbuka
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	// Buka otomatis accordion sesuai sub_jenis_id yang aktif
	useEffect(() => {
		if (sub_jenis_id && data) {
			const findIndex = data?.findIndex((item) =>
				item.sub_jenis?.some((l) => convertToSlug(l?.id) === sub_jenis_id)
			);
			if (findIndex !== -1) setOpenIndex(findIndex);
		}
	}, [sub_jenis_id, data]);

	const handleJenisPesanan = (query: string, index: number) => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			if (jenis_produk_id === query) {
				newParams.delete("jenis_produk_id");
				newParams.delete("sub_jenis_id");
				setOpenIndex(null); // Tutup accordion
			} else {
				newParams.set("jenis_produk_id", query);
				newParams.set("page", "1");
				newParams.delete("sub_jenis_id");
				setOpenIndex(index); // Buka accordion baru
			}
			return newParams;
		});
	};

	const handleNamaPesanan = (query: string, kueri: string, index: number) => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			if (sub_jenis_id === query) {
				newParams.delete("sub_jenis_id");
			} else {
				newParams.set("jenis_produk_id", kueri);
				newParams.set("sub_jenis_id", query);
				newParams.set("page", "1");
			}
			setOpenIndex(index); // Pastikan accordion tetap terbuka
			return newParams;
		});
	};

	return (
		<div className="flex flex-col w-full gap-3">
			<p className="font-medium">Jenis Pesanan</p>
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
						const isCheck = convertToSlug(item?.id) === jenis_produk_id;
						const isOpen = openIndex === idx;
						return (
							<div className="flex flex-col gap-2" key={idx}>
								{/* --- Header --- */}
								<div
									onClick={() =>
										handleJenisPesanan(convertToSlug(item?.id), idx)
									}
									className="flex items-center cursor-pointer justify-between gap-4"
								>
									<div className="flex items-center flex-1 gap-2">
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
										<p>{item?.jenis_produk}</p>
									</div>
									<div className="flex w-24 items-center justify-between">
										<p className="text-sm">
											{formatRupiah(Number(item?.total || 0))}
										</p>
										{item?.sub_jenis?.length > 0 && (
											<FaCaretDown
												size={12}
												className={clsx(
													"transition-transform duration-300",
													isOpen ? "rotate-180" : "rotate-0"
												)}
											/>
										)}
									</div>
								</div>

								{/* --- Accordion Content --- */}
								<div
									className={clsx(
										"overflow-hidden transition-all duration-500 ease-in-out ml-2 border-l border-[#272CCD]",
										isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
									)}
								>
									<div className="flex flex-col gap-3">
										{item?.sub_jenis?.map((list, index) => {
											const isCheck = convertToSlug(list?.id) === sub_jenis_id;
											return (
												<div
													className="flex cursor-pointer items-center justify-between gap-2"
													key={index}
													onClick={(e) => {
														e.preventDefault();
														e.stopPropagation();
														handleNamaPesanan(
															convertToSlug(list?.id),
															convertToSlug(item?.id),
															idx
														);
													}}
												>
													<hr className="border-t border-[#272CCD] w-4" />
													<div className="flex flex-1 items-center gap-2">
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
														<p className="text-sm flex-1">{list?.sub_jenis}</p>
													</div>
													<div className="flex w-24 items-center justify-between">
														<p className="text-sm">
															{formatRupiah(list?.total || 0)}
														</p>
													</div>
												</div>
											);
										})}
									</div>
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
