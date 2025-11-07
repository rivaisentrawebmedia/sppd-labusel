import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { getInitials } from "@/utils/helpers";
import { FaCaretDown, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { IoSunny } from "react-icons/io5";
import { DialogCustom } from "@/components/common/dialog";
import { usePostLogout } from "../../controller";
import type { Profil } from "../../model";

export function AvatarGroup({
	loading,
	data,
}: {
	loading: boolean;
	data?: Profil;
}) {
	const [trigger, setTrigger] = useState(false);
	const [isShow, setIsShow] = useState(false);

	const { handleLogout, loading: loadingLogout } = usePostLogout();
	const disabled = loading || loadingLogout;

	const handleConfirmLogout = async () => {
		await handleLogout();
		setIsShow(false);
	};

	return (
		<>
			<div className="hidden md:flex md:w-1/3 md:justify-end items-center gap-4 text-white">
				{/* Tombol mode cerah */}
				<button
					type="button"
					className="h-[32px] w-[32px] rounded-[8px] bg-white flex items-center justify-center shadow-sm hover:bg-white/90 transition"
				>
					<IoSunny color="#145BC5" size={18} />
				</button>

				{/* Avatar / Dropdown */}
				{loading ? (
					<div className="w-9 h-9 bg-white/20 rounded-full animate-pulse" />
				) : (
					<DropdownMenu open={trigger} onOpenChange={setTrigger}>
						<DropdownMenuTrigger asChild>
							<button
								type="button"
								className={`flex items-center gap-1 bg-[#F7F7F7] h-[32px] hover:bg-white/60 px-2 rounded-[8px] transition ${
									trigger ? "bg-white/60" : ""
								}`}
							>
								{data?.photo ? (
									<img
										src={data.photo}
										alt="user"
										className="h-[28px] w-[28px] rounded-full object-cover"
									/>
								) : (
									<div className="h-[28px] w-[28px] rounded-full bg-[#145BC5] text-white flex items-center justify-center font-semibold text-sm uppercase select-none">
										{getInitials(data?.nama || "").slice(0, 2)}
									</div>
								)}
								<FaCaretDown className="text-[#222]" />
							</button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end" className="text-sm w-48">
							<DropdownMenuLabel>
								<div className="flex items-center gap-2">
									{data?.photo ? (
										<img
											src={data.photo}
											alt="user"
											className="w-8 h-8 rounded-full object-cover"
										/>
									) : (
										<div className="w-8 h-8 rounded-full bg-[#145BC5] flex items-center justify-center text-white font-semibold text-sm uppercase select-none">
											{getInitials(data?.nama || "").slice(0, 2)}
										</div>
									)}
									<p className="text-gray-700 font-medium truncate max-w-[120px]">
										{data?.nama || "Indosistem"}
									</p>
								</div>
							</DropdownMenuLabel>

							<DropdownMenuSeparator />

							{/* Menu Profil */}
							<DropdownMenuItem asChild>
								<Link
									to="/modules/profile"
									className="flex items-center gap-2 text-gray-700 hover:text-[#145BC5] transition"
								>
									<FaUser className="text-[#145BC5]" />
									Profile
								</Link>
							</DropdownMenuItem>

							{/* Menu Logout */}
							<DropdownMenuItem
								onClick={() => setIsShow(true)}
								className="text-red-600 hover:bg-red-50 cursor-pointer"
							>
								<LogOut className="w-4" />
								Keluar Akun
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>

			{/* Dialog Konfirmasi Logout */}
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
			>
				<div className="flex justify-end gap-3 mt-4">
					<button
						type="button"
						onClick={() => setIsShow(false)}
						disabled={disabled}
						className="py-1.5 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition disabled:opacity-50"
					>
						Batal
					</button>
					<button
						type="button"
						onClick={handleConfirmLogout}
						disabled={disabled}
						className="py-1.5 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition disabled:opacity-50"
					>
						Logout
					</button>
				</div>
			</DialogCustom>
		</>
	);
}
