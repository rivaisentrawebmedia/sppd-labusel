import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import type { PublikInfo } from "@/layouts/model";
import { AvatarGroup } from "./AvatarGroup";
import { MobileDrawer } from "./MobileDrawer";
import type { Menus } from "../main-layout";
import { Image } from "@/components/common/image/getImage";

export function MainHeader({
	loading,
	data,
	menu,
}: {
	loading: boolean;
	data: PublikInfo | undefined;
	menu: Menus;
}) {
	const location = useLocation();
	const path = location.pathname;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="bg-primary">
			<header className="flex flex-wrap items-center w-full px-4 md:px-8 lg:px-[6rem] py-4 gap-4 relative">
				{/* Logo Section */}
				<div className="flex flex-1 md:w-1/3 items-center gap-3 text-white">
					{loading ? (
						<div className="flex items-center gap-3">
							<div className="w-[55px] h-[55px] bg-white/20 rounded-md animate-pulse" />
							<div className="space-y-2">
								<div className="w-32 h-4 bg-white/20 rounded animate-pulse" />
								<div className="w-40 h-5 bg-white/20 rounded animate-pulse" />
							</div>
						</div>
					) : (
						<>
							<Image
								alt={data?.nama_desa || ""}
								src={data?.logo || ""}
								classNamePlaceHolder="w-[55px] h-[55px] rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-xl uppercase select-none"
								classNameImage="w-[55px] h-[55px] rounded-full object-cover"
							/>

							<div className="leading-tight">
								<div className="text-sm md:text-base">Portal Warga</div>
								<h3 className="font-semibold text-lg md:text-2xl">
									{data?.nama_desa || "PT Sentra Web Media"}
								</h3>
							</div>
						</>
					)}
				</div>

				{/* Hamburger button */}
				<button
					className="md:hidden text-white focus:outline-none"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>

				{/* Menu (Desktop) */}

				{/* data + Notifications */}
				<AvatarGroup loading={loading} />

				{/* Overlay (klik area luar untuk menutup drawer) */}
				{isOpen && (
					<div
						className="fixed inset-0 bg-black/30 z-40 md:hidden"
						onClick={() => setIsOpen(false)}
					/>
				)}

				{/* Mobile Drawer - muncul dari kanan */}
				<MobileDrawer
					isOpen={isOpen}
					menu={menu}
					path={path}
					setIsOpen={setIsOpen}
				/>
			</header>
		</div>
	);
}
