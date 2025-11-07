import { convertToSlug } from "@/utils/helpers";
import { usePathname } from "@/utils/usePathname";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export function TabComponent() {
	const { thirdPathname } = usePathname();
	const navigate = useNavigate();

	const listMenu = ["Profil Desa", "Pegawai Desa", "Info APBDes"];
	return (
		<>
			<div className="flex w-full gap-0 p-4">
				{listMenu?.map((item, idx) => {
					const isActive =
						convertToSlug(item) === thirdPathname ||
						(item === listMenu?.[0] && !thirdPathname);
					return (
						<div
							onClick={() => {
								if (item === listMenu?.[0]) {
									navigate("/modules/informasi-desa");
								} else {
									navigate(`/modules/informasi-desa/${convertToSlug(item)}`);
								}
							}}
							className={clsx(
								"pb-2 text-center cursor-pointer w-full duration-300 transition-colors",
								{
									"border-b text-[#9C9C9C]": !isActive,
									"border-b-4 border-[#CDA327] text-[#272CCD]": isActive,
								}
							)}
							key={idx}
						>
							<p>{item}</p>
						</div>
					);
				})}
			</div>
		</>
	);
}
