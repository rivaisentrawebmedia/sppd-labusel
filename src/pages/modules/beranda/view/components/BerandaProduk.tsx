import { IconShoppingCart } from "@/assets/icons/ShoppingCart";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export function BerandaProduk() {
	return (
		<>
			<Card>
				<CardContent className="flex flex-col gap-4 p-5 bg-[#F2D270] rounded-md border border-[#CDA327]">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<IconShoppingCart />
							<p>Produk Warga Desa</p>
						</div>
						<Link
							to={""}
							className="text-[#272CCD] underline underline-offset-4 hover:text-[#272CCD]/50 duration-300 transition-colors"
						>
							Lihat Semua
						</Link>
					</div>
					<p className="text-[#888]">Tidak ada blog tersedia</p>
				</CardContent>
			</Card>
		</>
	);
}
