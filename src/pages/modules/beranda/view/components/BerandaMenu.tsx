import { IconClipBoard } from "@/assets/icons/ClipBoard";
import { IconHeartSuit } from "@/assets/icons/HeartSuit";
import { IconHospital } from "@/assets/icons/Hospital";
import { IconManWalking } from "@/assets/icons/ManWalking";
import { IconMegaPhone } from "@/assets/icons/MegaPhone";
import { IconMemo } from "@/assets/icons/Memo";
import { Card, CardContent } from "@/components/ui/card";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

type Menu = {
	title: string;
	deskripsi: string;
	icon: JSX.Element;
	link: string;
};
export function BerandaMenu() {
	const navigate = useNavigate();

	const menu: Menu[] = [
		{
			title: "Layanan Persuratan",
			deskripsi: "Ajukan surat yang anda perlukan melalui Layanan Persuratan",
			link: "/modules/layanan/layanan-persuratan",
			icon: <IconMemo />,
		},
		{
			title: "Layanan Kesehatan",
			deskripsi:
				"Catat data Pemeriksaan WUS/PUS hingga Donor Darah melalui Layanan Kesehatan",
			link: "/modules/layanan/layanan-kesehatan",
			icon: <IconHospital />,
		},

		{
			title: "Lapor Pemdes",
			deskripsi: "Laporkan keluhan atau aspirasi Anda dengan mudah dan cepat",
			link: "/modules/layanan/lapor-pemdes",
			icon: <IconMegaPhone />,
		},
		{
			title: "Buku Tamu",
			deskripsi: "Lihat riwayat kunjungan Anda sebagai tamu desa",
			link: "/modules/layanan/buku-tamu",
			icon: <IconManWalking />,
		},
		{
			title: "Donasi",
			deskripsi:
				"Salurkan bantuan Anda dengan mudah dan transparan untuk program-program pembangunan dan sosial desa.",
			link: "/modules/layanan/donasi",
			icon: <IconHeartSuit />,
		},
	];

	return (
		<>
			<Card>
				<CardContent className="flex flex-col gap-4 p-5 ">
					<div className="flex items-center gap-2">
						<IconClipBoard />
						<p>Apa yang Anda perlukan hari ini?</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-start">
						{menu?.map((item, idx) => (
							<button
								type="button"
								key={idx}
								onClick={() => {
									navigate(item?.link);
								}}
								className="flex cursor-pointer items-start hover:shadow-md duration-300 transition-colors flex-col gap-2 bg-[#F5F5FF] border border-[#F5F5FF] p-4 rounded-md"
							>
								<div className="flex items-center text-start gap-2">
									{item?.icon}
									<p className="text-lg font-medium text-[#272CCD]">
										{item?.title}
									</p>
								</div>
								<p className="text-[#555] text-start">{item?.deskripsi}</p>
							</button>
						))}
					</div>
				</CardContent>
			</Card>
		</>
	);
}
