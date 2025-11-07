import { useState, type SetStateAction } from "react";
import { Link } from "react-router-dom";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { IoMdNotifications } from "react-icons/io";
import { usePostLogout } from "@/layouts/constroller";
import { DialogCustom } from "@/components/common/dialog";
import type { Menus } from "../main-layout";

export function MobileDrawer({
	isOpen,
	setIsOpen,
	menu,
	path,
}: {
	isOpen: boolean;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
	menu: Menus;
	path: string;
}) {
	const [isShow, setIsShow] = useState<boolean>(false);
	const [openMenu, setOpenMenu] = useState<string | null>(null);
	const { handleLogout, loading } = usePostLogout();

	const disabled = loading;

	const handleToggle = (label: string) => {
		setOpenMenu((prev) => (prev === label ? null : label));
	};

	const handleChildClick = () => {
		setIsOpen(false);
		setOpenMenu(null);
	};

	return (
		<>
			{/* 🔹 Drawer Container */}
			<div
				className={`fixed top-0 right-0 h-full w-64 bg-primary text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				{/* 🔹 Header */}
				<div className="flex justify-between items-center px-4 py-4 border-b border-white/20">
					<div className="flex items-center gap-4">
						<h2 className="text-lg font-semibold">Menu</h2>

						<button disabled={disabled} className="p-2 bg-white/20 rounded-md">
							<IoMdNotifications className="w-6 h-6 cursor-pointer hover:text-gray-200" />
						</button>
					</div>
					<button
						onClick={() => setIsOpen(false)}
						disabled={disabled}
						className="text-white focus:outline-none"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* 🔹 Navigation */}
				<nav className="flex flex-col p-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
					{menu.map((row) => {
						const hasChild = Array.isArray(row.child) && row.child.length > 0;
						const isActive =
							path === row.link || path.startsWith(row.link + "/");

						return (
							<div key={row.label} className="flex flex-col">
								{hasChild ? (
									<button
										type="button"
										onClick={() => handleToggle(row.label)}
										className={`flex items-center justify-between py-2 border-b border-white/20 w-full text-left ${
											openMenu === row.label
												? "text-white font-semibold"
												: "text-gray-200 hover:text-white"
										}`}
									>
										<span>{row.label}</span>
										{openMenu === row.label ? (
											<ChevronDown size={18} />
										) : (
											<ChevronRight size={18} />
										)}
									</button>
								) : (
									<Link
										to={row.link}
										onClick={() => setIsOpen(false)}
										className={`py-2 border-b border-white/20 ${
											isActive
												? "text-white font-semibold"
												: "text-gray-200 hover:text-white"
										}`}
									>
										{row.label}
									</Link>
								)}

								{/* 🔸 CHILD MENU */}
								{hasChild && openMenu === row.label && (
									<div className="ml-4 mt-1 flex flex-col gap-1 border-l border-white/20 pl-3">
										{row?.child?.map((child) => (
											<Link
												key={child.link}
												to={child.link}
												onClick={handleChildClick}
												className={`py-1 text-sm border-b border-white/10 ${
													path === child.link
														? "text-white font-semibold"
														: "text-gray-200 hover:text-white"
												}`}
											>
												{child.label}
											</Link>
										))}
									</div>
								)}
							</div>
						);
					})}

					{/* 🔹 Tambahan Menu */}
					<Link
						to={"/modules/profil"}
						onClick={() => setIsOpen(false)}
						className={`py-2 border-b border-white/20 ${
							path.includes("profile")
								? "text-white font-semibold"
								: "text-gray-200 hover:text-white"
						}`}
					>
						Profile
					</Link>

					<Link
						to={"/modules/aktivitas"}
						onClick={() => setIsOpen(false)}
						className={`py-2 border-b border-white/20 ${
							path.includes("profile")
								? "text-white font-semibold"
								: "text-gray-200 hover:text-white"
						}`}
					>
						Aktivitas
					</Link>

					{/* 🔹 Logout */}
					<button
						type="button"
						disabled={disabled}
						onClick={() => {
							setIsOpen(false);
							setIsShow(true);
						}}
						className="flex py-2 border-b border-white/20 text-gray-200 hover:text-white"
					>
						Logout
					</button>
				</nav>
			</div>

			{/* 🔹 Logout Dialog */}
			<DialogCustom
				open={isShow}
				setOpen={setIsShow}
				title={
					<p className="text-xl font-semibold text-red-600">
						Konfirmasi Logout
					</p>
				}
				description={
					<p className="text-gray-600 text-sm">
						Apakah Anda yakin ingin keluar dari akun ini? Semua sesi aktif akan
						ditutup dan Anda perlu login kembali untuk mengakses sistem.
					</p>
				}
				children={
					<div className="flex flex-col gap-4 w-full mt-2">
						<div className="flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => setIsShow(false)}
								disabled={disabled}
								className="py-1.5 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
							>
								Batal
							</button>

							<button
								type="button"
								onClick={() => handleLogout()}
								disabled={disabled}
								className="py-1.5 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition disabled:opacity-50"
							>
								Logout
							</button>
						</div>
					</div>
				}
			/>
		</>
	);
}
