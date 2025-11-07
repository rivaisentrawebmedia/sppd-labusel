import { convertToSlug } from "@/utils/helpers";
import { usePathname } from "@/utils/usePathname";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export function TabComponent() {
	const { thirdPathname } = usePathname();
	const navigate = useNavigate();

	const menu = ["Surat Saya", "Laporan", "Pesanan Saya"];
	return (
		<div className="flex w-full gap-0 border-b">
			{menu?.map((item, idx) => {
				const isActive =
					convertToSlug(item) === thirdPathname ||
					(!thirdPathname && item === menu?.[0]);

				return (
					<button
						type="button"
						className={clsx(
							"w-full border py-1.5 flex items-center duration-300 transition-colors cursor-pointer justify-center rounded-t-md",
							{
								"bg-[#0E1287] text-white border-[#272CCD]": isActive,
								"border-transparent text-[#222222] hover:text-[#272CCD]":
									!isActive,
							}
						)}
						key={idx}
						onClick={() => {
							if (item === menu?.[0]) {
								navigate(`/modules/aktivitas`);
							} else {
								navigate(`/modules/aktivitas/${convertToSlug(item)}`);
							}
						}}
					>
						<p>{item}</p>
					</button>
				);
			})}
		</div>
	);
}
