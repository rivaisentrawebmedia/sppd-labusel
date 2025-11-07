import { IconCalendarDashboard } from "@/assets/icons/Calendar";
import { Card, CardContent } from "@/components/ui/card";
import dayjs from "dayjs";
import { useEffect, useState, type ReactNode } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function TitleComponent({
	deskripsi,
	title,
	isBack,
}: {
	title: ReactNode;
	deskripsi: ReactNode;
	isBack?: boolean;
}) {
	const navigate = useNavigate();
	const [currentTime, setCurrentTime] = useState(dayjs());

	useEffect(() => {
		dayjs.locale("id");
		const interval = setInterval(() => {
			setCurrentTime(dayjs());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const formattedDate = currentTime.format("dddd, D-MM-YYYY");
	const formattedTime = currentTime.format("HH:mm:ss");

	return (
		<>
			<div className="flex gap-2 md:gap-4 md:justify-between md:items-center flex-col md:flex-row ">
				<div className="flex items-center gap-2">
					{isBack && (
						<div
							onClick={() => {
								navigate(-1);
							}}
							className="w-[32px] h-[32px] bg-[#0E1287] text-white rounded-full flex items-center justify-center cursor-pointer"
						>
							<FaArrowLeft />
						</div>
					)}
					<div className="flex flex-1 flex-col gap-0">
						<div className="text-[#272CCD] font-medium text-lg">{title}</div>
						{deskripsi}
					</div>
				</div>
				<Card>
					<CardContent className="flex gap-3 p-4 items-center">
						<IconCalendarDashboard />
						<div>
							<div>{formattedDate}</div>
							<div className="text-[#272CCD] font-medium">{formattedTime}</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
