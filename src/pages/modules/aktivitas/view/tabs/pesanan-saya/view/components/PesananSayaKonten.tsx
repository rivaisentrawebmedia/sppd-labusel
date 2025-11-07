import Search from "@/components/common/table/Search";
import TablePaginate, {
	type Meta,
} from "@/components/common/table/TablePaginate";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { PesananSaya } from "../../model";
import { IconShoppingBasket } from "@/assets/icons/ShoppingBasket";
import dayjs from "dayjs";
import { formatRupiah, getInitials } from "@/utils/helpers";
import { IMAGE_CONSTANTA } from "@/const";
import { IconElectricBolt } from "@/assets/icons/ElectricBolt";

export function PesananSayaKonten({
	data,
	meta,
}: {
	data: PesananSaya[];
	meta: Meta | undefined;
}) {
	const navigate = useNavigate();
	const [searchParmas, setSearchParams] = useSearchParams();
	const search = searchParmas.get("search");
	const searchingNotFound = !search || search === "";

	const limits = searchParmas.get("limit") || "10";
	const limit = Number(limits);

	const handleSearch = (query: string) => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.set("search", query);
			newParams.set("page", "1");
			return newParams;
		});
	};

	const handleReset = () => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.delete("search");
			newParams.delete("page");
			newParams.delete("limi");
			newParams.delete("status");
			newParams.delete("jenis-produk-id");
			newParams.delete("sub-jenis-id");
			newParams.delete("start");
			newParams.delete("end");
			return newParams;
		});
	};

	return (
		<>
			<div className="flex items-center gap-2">
				<Search
					onSearch={handleSearch}
					innerClassName={"!rounded-full flex-1 bg-white"}
					className="rounded-lg flex-1"
					position="end"
				/>
				<button
					type="button"
					onClick={handleReset}
					className="flex items-center text-nowrap justify-center gap-2 text-sm py-1.5 px-4 rounded-md bg-[#CD2738] hover:bg-[#CD2738]/80 text-white duration-300 transition-colors"
				>
					<p>Reset Pencarian</p>
				</button>
			</div>

			<div className="flex flex-col gap-6 py-4">
				{data?.length > 0 ? (
					data?.map((item, idx) => {
						const totalPerPesanan = item?.detail?.reduce((subtotal, d) => {
							return subtotal + d?.qty * parseInt(d?.harga, 10);
						}, 0);
						const isBelanja = item?.jenis_produk === "Belanja";
						return (
							<div
								onClick={() => {
									navigate(`${item?.id}/detail?${searchParmas?.toString()}`);
								}}
								className="flex flex-col gap-0 rounded-md border border-[#E3E3E3]"
								key={idx}
							>
								<div className="flex items-center justify-between gap-4 py-2 px-4 border-b">
									<div className="flex items-center gap-1.5">
										{isBelanja ? <IconShoppingBasket /> : <IconElectricBolt />}
										<p className="text-[#272CCD]">{item?.jenis_produk}</p>
									</div>
									<div className="flex items-center gap-2">
										<button
											type="button"
											className="py-1 px-3 hover:bg-primary hover:text-white duration-300 transition-colors rounded-sm border border-primary text-primary text-sm"
										>
											<p>{item?.status}</p>
										</button>
										<div className="h-[6px] w-[6px] rounded-full bg-[#D9D9D9]" />
										<p className="text-[#9C9C9C]">
											{item?.created_at
												? dayjs(item?.created_at)
														.locale("id")
														.format("DD-MM-YYYY")
												: "-"}
										</p>
									</div>
								</div>
								<div className="flex flex-col gap-0">
									{item?.detail?.map((list, index) => {
										return (
											<div
												className="flex justify-between gap-4 p-4"
												key={index}
											>
												<div className="flex items-center gap-2 flex-1">
													{list?.photo ? (
														<img
															src={list?.photo}
															alt={list?.nama_produk}
															className="w-12 h-12 object-cover rounded-sm"
														/>
													) : (
														<div className="flex items-center justify-center bg-[#f5f5ff] text-primary/50 border border-primary/20 w-12 h-12 rounded-md">
															{getInitials(list?.nama_produk)}
														</div>
													)}
													<div className="flex flex-col gap-1">
														<p className="">{list?.nama_produk}</p>
														<p className="text-sm text-[#888]">x{list?.qty}</p>
													</div>
												</div>
												<p className="text-[#272CCD] text-lg">
													{formatRupiah(list?.harga ? Number(list?.harga) : 0)}
												</p>
											</div>
										);
									})}
								</div>
								<div className="p-4 flex text-[#444444] items-center justify-end gap-2 bg-[#F5F5FF]">
									<p>Total Harga</p>
									<p className="text-[#272CCD] text-xl">
										{formatRupiah(totalPerPesanan)}
									</p>
								</div>
							</div>
						);
					})
				) : (
					<div className="flex items-center flex-col justify-center gap-4">
						<img
							src={IMAGE_CONSTANTA?.no_data}
							alt="No Data"
							className="w-[15rem]"
						/>
						<div className="flex flex-col gap-0 items-center justify-center text-center text-[#888]">
							<p>Data tidak ditemukan</p>
							<p>
								{!searchingNotFound &&
									`Hasil pencarian untuk "${search}" tidak ditemukan. Silakan periksa kembali kata kunci Anda dan coba lagi.`}
							</p>
						</div>
					</div>
				)}
			</div>

			{data?.length > 0 && <TablePaginate meta={meta} length={limit || 10} />}
		</>
	);
}
