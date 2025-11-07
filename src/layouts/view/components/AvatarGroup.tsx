import { IoMdNotifications } from "react-icons/io";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { FaCaretDown, FaSyncAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { usePostLogout } from "@/layouts/constroller";
import { DialogCustom } from "@/components/common/dialog";

export function AvatarGroup({ loading }: { loading: boolean }) {
	const [triger, setTriger] = useState<boolean>(false);
	const [isShow, setIsShow] = useState<boolean>(false);

	const { handleLogout, loading: loadingLogout } = usePostLogout();

	const disabled = loading || loadingLogout;

	return (
		<>
			<div className="hidden md:flex md:w-1/3 md:justify-end items-center gap-4 text-white">
				<IoMdNotifications className="w-6 h-6 cursor-pointer hover:text-gray-200" />
				{loading ? (
					<div className="w-9 h-9 bg-white/20 rounded-full animate-pulse" />
				) : (
					<DropdownMenu open={triger} onOpenChange={setTriger}>
						<DropdownMenuTrigger>
							<div
								className={`flex items-center gap-1 hover:bg-gray-200/30 p-1.5 rounded ${
									triger ? "bg-gray-200/30" : ""
								}`}
							>
								{/* <Image
									alt={profil?.nama_warga || ""}
									src={profil?.photo || ""}
									classNameImage="w-8 h-8 rounded-full object-cover"
									classNamePlaceHolder="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-white font-semibold text-sm uppercase select-none"
								/> */}
								<FaCaretDown className="text-white text-xl" />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="texs-sm">
							<DropdownMenuLabel>
								<div className="flex items-center gap-2">
									{/* <Image
										alt={profil?.nama_warga || ""}
										src={profil?.photo || ""}
										classNameImage="w-8 h-8 rounded-full object-cover"
										classNamePlaceHolder="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white font-semibold text-sm uppercase select-none"
									/>

									<p className="flex-1 text-wrap">
										{profil?.nama_warga || "Indosistem"}
									</p> */}
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => setTriger(!triger)}>
								<Link
									className="flex items-center gap-2 w-full"
									to={"/modules/profil"}
								>
									<FaUser className="text-[#5050D8]" />
									Profile
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTriger(!triger)}>
								<Link
									className="flex items-center gap-2 w-full"
									to={"/modules/aktivitas"}
								>
									<FaSyncAlt className="text-[#5050D8]" />
									Aktivitas
								</Link>
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={() => {
									setIsShow(true);
								}}
							>
								<LogOut className="text-red-600 w-5" />
								Keluar Akun
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>

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
