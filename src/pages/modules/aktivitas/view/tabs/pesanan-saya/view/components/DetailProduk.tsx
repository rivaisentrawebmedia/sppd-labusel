import { formatRupiah, getInitials } from "@/utils/helpers";
import type { PesananSayaDetail } from "../../model";

export function DetailProduk({
	data,
}: {
	data: PesananSayaDetail | undefined;
}) {
	return (
		<>
			<div
				className="flex flex-col gap-3 p-4 bg-white rounded-md"
				style={{
					boxShadow: "0px 4px 4px 0px #0000000A",
				}}
			>
				<p className="text-[#272CCD]">Detail Produk</p>
				<hr className="border-t w-full" />

				<div className="flex flex-col gap-3">
					{data?.detail?.map((item, idx) => {
						return (
							<div
								className="flex items-center justify-between gap-4"
								key={idx}
							>
								<div className="flex items-center gap-2 flex-1">
									{item?.photo ? (
										<img
											src={item?.photo}
											alt={item?.nama_produk}
											className="w-12 h-12 object-cover rounded-sm"
										/>
									) : (
										<div className="flex items-center justify-center bg-[#f5f5ff] text-primary/50 border border-primary/20 w-12 h-12 rounded-md">
											{getInitials(item?.nama_produk)}
										</div>
									)}
									<div className="flex flex-col gap-1">
										<p className="">{item?.nama_produk}</p>
										<p className="text-sm text-[#888]">x{item?.qty}</p>
									</div>
								</div>
								<p className="text-[#272CCD] text-lg">
									{formatRupiah(item?.harga ? Number(item?.harga) : 0)}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
