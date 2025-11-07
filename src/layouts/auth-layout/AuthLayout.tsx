import LoginBG from "@/assets/images/login-bg.png";
import LoginCover from "@/assets/images/login-anu.png";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
	return (
		<div className="relative w-full h-screen">
			{/* ✅ Background full cover */}
			<img
				src={LoginBG}
				alt="Login Background"
				className="absolute top-0 left-0 w-full h-full object-cover"
			/>

			{/* ✅ Overlay blur & color */}
			<div className="absolute inset-0 flex items-center justify-center bg-[#295AA399] backdrop-blur-md">
				{/* ✅ Container responsif */}
				<div className="flex flex-col gap-4 w-[90%] sm:w-[85%] md:w-[600px] bg-white/25 p-5 rounded-2xl max-h-[90vh] overflow-y-auto">
					{/* ✅ Cover section */}
					<div className="relative rounded-xl overflow-hidden">
						<img
							src={LoginCover}
							alt="Login Cover"
							className="w-full h-[120px] sm:h-[150px] object-cover"
							style={{ mixBlendMode: "darken" }}
						/>

						{/* ✅ Overlay content di atas cover */}
						<div className="absolute inset-0 bg-[#295AA3]/90 rounded-xl flex items-center gap-4 p-4 text-white">
							<div className="flex-shrink-0 w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] bg-white rounded-2xl flex items-center justify-center">
								<img
									src="/logo.png"
									alt="Logo"
									className="w-[45px] sm:w-[60px]"
								/>
							</div>
							<div className="flex flex-col gap-1 sm:gap-2">
								<p className="text-sm sm:text-base font-medium">
									Sistem Informasi Perjalanan Dinas
								</p>
								<p className="text-lg sm:text-2xl font-bold leading-tight">
									Kab. Labuhanbatu Selatan
								</p>
							</div>
						</div>
					</div>

					{/* ✅ Tempat form login atau konten lainnya */}
					<div className="flex flex-col gap-4">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
