import { Image } from "@/components/common/image/getImage";
interface LoginHeaderProps {
	namaDesa: string;
	logoDesa: string | undefined;
}

export function LoginHeader({ namaDesa, logoDesa }: LoginHeaderProps) {
	return (
		<div className="text-center space-y-3">
			<p className="md:text-lg font-medium text-[#272CCD]">
				Selamat Datang di Portal Pelayanan Warga Desa
			</p>
			<div className="flex justify-center items-center gap-2">
				<Image
					alt={namaDesa || ""}
					src={logoDesa || ""}
					classNamePlaceHolder="w-[55px] h-[55px] rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-xl uppercase select-none"
					classNameImage="w-[55px] h-[55px] rounded-full object-cover"
				/>
				<span className="font-medium text-[#272CCD] text-xl">{namaDesa}</span>
			</div>
			<p>
				Silakan masukkan NIK Anda untuk mengakses Portal Pelayanan Warga Desa
			</p>
		</div>
	);
}
