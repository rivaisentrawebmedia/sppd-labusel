import { FaCaretDown, FaCheck } from "react-icons/fa";
import type { SuratSayaJenis } from "../../model";
import { useSearchParams } from "react-router-dom";
import { convertToSlug } from "@/utils/helpers";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export function JenisSurat({
	data,
	loading,
}: {
	data: SuratSayaJenis[] | undefined;
	loading?: boolean;
}) {
	const [searchParams, setSearchParams] = useSearchParams();
	const jenis_surat = searchParams.get("jenis-surat");
	const nama_surat = searchParams.get("nama-surat");

	// Simpan index accordion yang terbuka
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	// Buka otomatis accordion sesuai nama_surat yang aktif
	useEffect(() => {
		if (nama_surat && data) {
			const findIndex = data.findIndex((item) =>
				item.list_nama_surat?.some(
					(l) => convertToSlug(l.nama_surat) === nama_surat
				)
			);
			if (findIndex !== -1) setOpenIndex(findIndex);
		}
	}, [nama_surat, data]);

	const handleJenisSurat = (query: string, index: number) => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			if (jenis_surat === query) {
				newParams.delete("jenis-surat");
				newParams.delete("nama-surat");
				setOpenIndex(null); // Tutup accordion
			} else {
				newParams.set("page", "1");
				newParams.set("jenis-surat", query);
				newParams.delete("nama-surat");
				setOpenIndex(index); // Buka accordion baru
			}
			return newParams;
		});
	};

	const handleNamaSurat = (query: string, kueri: string, index: number) => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			if (nama_surat === query) {
				newParams.delete("nama-surat");
			} else {
				newParams.set("page", "1");
				newParams.set("jenis-surat", kueri);
				newParams.set("nama-surat", query);
			}
			setOpenIndex(index); // Pastikan accordion tetap terbuka
			return newParams;
		});
	};

	return (
		<div className="flex flex-col w-full gap-3">
			<p className="font-medium">Jenis Surat</p>
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
							convertToSlug(item?.jenis_keterangan) === jenis_surat;
						const isOpen = openIndex === idx;

						return (
							<div className="flex flex-col gap-2" key={idx}>
								{/* --- Header --- */}
								<div
									onClick={() =>
										handleJenisSurat(convertToSlug(item?.jenis_keterangan), idx)
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
										<p>{item?.jenis_keterangan}</p>
									</div>
									<div className="flex w-10 items-center justify-between">
										<p className="text-sm">{item?.total}</p>
										{item?.list_nama_surat?.length > 0 && (
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
										"transition-all duration-300 ease-in-out ml-2 border-l border-[#272CCD]",
										isOpen
											? "opacity-100 translate-y-0"
											: "opacity-0 -translate-y-2 hidden"
									)}
								>
									<div className="flex flex-col gap-3">
										{item?.list_nama_surat?.map((list, index) => {
											const isCheck =
												convertToSlug(list?.nama_surat) === nama_surat;
											return (
												<div
													className="flex cursor-pointer items-center justify-between gap-2"
													key={index}
													onClick={(e) => {
														e.preventDefault();
														e.stopPropagation();
														handleNamaSurat(
															convertToSlug(list?.nama_surat),
															convertToSlug(item?.jenis_keterangan),
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
														<p className="text-sm flex-1">{list?.nama_surat}</p>
													</div>
													<div className="flex w-10 items-center justify-between">
														<p className="text-sm">{list?.total}</p>
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
