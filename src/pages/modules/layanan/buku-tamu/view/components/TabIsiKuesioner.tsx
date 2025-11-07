import { usePathname } from "@/utils/usePathname";
import { FaCheckSquare, FaSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function TabIsiKuesioner() {
	const navigate = useNavigate();
	const { fivethPathname } = usePathname();

	const buku_tamu_id = fivethPathname;

	const { sixthPathname } = usePathname();
	const isIsiKunjungan = !sixthPathname;
	const isIsiKuesioner = sixthPathname === "isi-kuesioner";

	return (
		<div className="flex items-center justify-center gap-0">
			<div
				onClick={() => {
					navigate(`/modules/layanan/buku-tamu/tambah`);
				}}
				className="w-1/2 md:w-1/4 cursor-pointer flex flex-col gap-0"
			>
				<div className="flex items-center gap-0">
					<hr className="w-full border-t border-transparent flex-1" />
					{buku_tamu_id ? (
						<FaCheckSquare size={20} color="#272CCD" />
					) : isIsiKunjungan ? (
						<FaSquare size={20} color="#272CCD" />
					) : (
						<FaSquare
							size={20}
							style={{
								fill: "transparent",
								stroke: "#272CCD",
								strokeWidth: 20,
							}}
						/>
					)}
					<hr className="w-full border-t border-[#7074F2] flex-1" />
				</div>
				<p className="text-center font-light">Isi Keperluan Kunjungan</p>
			</div>
			<div
				onClick={() => {
					if (buku_tamu_id) {
						navigate(
							`/modules/layanan/buku-tamu/tambah/${buku_tamu_id}/isi-kuesioner`
						);
					}
				}}
				className="w-1/2 md:w-1/4 flex cursor-pointer flex-col gap-0"
			>
				<div className="flex items-center gap-0">
					<hr className="w-full border-t border-[#7074F2] flex-1" />
					{isIsiKuesioner ? (
						<FaSquare size={20} color="#272CCD" />
					) : (
						<FaSquare
							size={20}
							style={{
								fill: "transparent",
								stroke: "#272CCD",
								strokeWidth: 20,
							}}
						/>
					)}
					<hr className="w-full border-t border-transparent flex-1" />
				</div>
				<p className="text-center font-light">Isi Kuesioner</p>
			</div>
		</div>
	);
}
