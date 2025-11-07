import { Image } from "@/components/common/image/getImage";
import { convertFromSnakeCase } from "@/utils/helpers";
import clsx from "clsx";
import dayjs from "dayjs";
import { FaHome, FaPhoneAlt } from "react-icons/fa";

export function DetailPelapor({
	alamat,
	nama,
	no_telp,
	photo,
	dilaportkan,
	isBuat,
	status,
}: {
	photo: string;
	nama: string;
	alamat: string;
	no_telp: string;
	status?: string;
	dilaportkan?: string;
	isBuat?: boolean;
}) {
	return (
		<>
			<div className="flex border shadow flex-col bg-white gap-4 p-4 rounded-md">
				<p className="text-[#9C9C9C]">Data Pelapor</p>

				<div className="flex items-center gap-3 w-full">
					<Image
						alt={nama}
						src={photo}
						classNamePlaceHolder="w-20 h-20 flex items-center rounded-sm text-lg justify-center bg-[#f5f5ff] text-primary-50 border border-primary/20"
						classNameImage="w-20 h-20 rounded-sm object-cover"
					/>
					<div className="flex flex-1 flex-col gap-1">
						<p className="text-xl text-[#222222]">{nama}</p>
						<div className="flex font-light items-center gap-1.5">
							<FaHome />
							<p>{alamat}</p>
						</div>
						<div className="flex font-light items-center gap-1.5">
							<FaPhoneAlt />
							<p>{no_telp}</p>
						</div>
					</div>
					{!isBuat && (
						<div className="flex flex-col justify-end items-end">
							<div
								className={clsx("text-sm text-white py-1.5 px-3 rounded-sm", {
									"bg-[#2769CD]": status?.toLocaleLowerCase() === "baru",
									"bg-[#CDA327]": status?.toLocaleLowerCase() === "diproses",
									"bg-[#27CD7F]": status?.toLocaleLowerCase() === "selesai",
									"bg-[#CD2738]": status?.toLocaleLowerCase() === "dibatalkan",
								})}
							>
								{convertFromSnakeCase(status || "-")}
							</div>
							<p className="text-[#9C9C9C]">
								Dilaporkan Pada:{" "}
								<span className="text-black font-semibold">
									{dilaportkan
										? dayjs(dilaportkan)?.locale("id").format("DD-MM-YYYY")
										: "-"}
								</span>
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
