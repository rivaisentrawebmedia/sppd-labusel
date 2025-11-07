import clsx from "clsx";
import { FaCheck } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

export function RentangWaktu() {
	const [searchParams, setSearchParams] = useSearchParams();
	const start = searchParams.get("start") || "";
	const end = searchParams.get("end") || "";
	const isCheck = !start && !end;

	const handleShowAll = () => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.delete("start");
			newParams.delete("end");
			newParams.set("page", "1");

			return newParams;
		});
	};

	const handleChange = (key: string, value: string) => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			if (value) {
				newParams.set(key, value);
				newParams.set("page", "1");
			} else {
				newParams.delete(key);
			}
			return newParams;
		});
	};

	return (
		<div className="flex flex-col gap-3 overflow-hidden">
			{/* Header */}
			<div className="flex justify-between items-center gap-2">
				<p className="font-medium flex-1 text-sm sm:text-base">Rentang Waktu</p>
				<div
					onClick={handleShowAll}
					className="flex items-center gap-1.5 cursor-pointer select-none text-sm"
				>
					<div
						className={clsx(
							"flex items-center justify-center h-4 w-4 rounded-[3px] border transition-colors duration-300",
							{
								"bg-[#272CCD] border-transparent text-white": isCheck,
								"border-[#272CCD]": !isCheck,
							}
						)}
					>
						{isCheck && <FaCheck size={10} />}
					</div>
					<span>Semua</span>
				</div>
			</div>

			{/* Input Rentang */}
			<div className="flex items-center gap-2">
				<input
					type="date"
					value={start}
					onChange={(e) => handleChange("start", e.target.value)}
					className="w-[8rem] rounded-sm appearance-auto border border-[#E3E3E3] bg-[#EEEEEE] px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#272CCD] calendar-primary"
				/>
				<p className="flex-1 text-center">-</p>
				<input
					type="date"
					value={end}
					onChange={(e) => handleChange("end", e.target.value)}
					className="w-[8rem] rounded-sm appearance-auto border border-[#E3E3E3] bg-[#EEEEEE] px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#272CCD] calendar-primary"
				/>
			</div>

			{/* Keterangan */}
			{start && end && (
				<p className="text-xs text-gray-500 italic">
					Menampilkan data dari <span className="text-[#272CCD]">{start}</span>{" "}
					hingga <span className="text-[#272CCD]">{end}</span>
				</p>
			)}
		</div>
	);
}
