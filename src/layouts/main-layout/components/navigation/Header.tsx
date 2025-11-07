import { AvatarGroup } from "./AvatarGroup";
import { useGetProfile } from "../../controller";

export function MainLayoutHeader() {
	const { loading, profile } = useGetProfile();
	return (
		<>
			<div className="flex bg-[#295AA3] items-center text-white px-4 md:px-8 lg:px-[6rem] py-4">
				{/* --- Logo --- */}
				<div className="flex items-center gap-3">
					<div className="flex items-center justify-center w-[64px] h-[64px] bg-white rounded-[8px]">
						<img src="/logo.png" className="w-[35px] h-[42px]" alt="Logo" />
					</div>
					<p className="font-bold uppercase text-xl">SPPD KAB. LABUSEL</p>
				</div>
				{/* --- Menu --- */}
				<div className="flex flex-1 items-center gap-4"></div>
				{/* --- Group Avatar --- */}

				<AvatarGroup data={profile} loading={loading} />
			</div>
		</>
	);
}
