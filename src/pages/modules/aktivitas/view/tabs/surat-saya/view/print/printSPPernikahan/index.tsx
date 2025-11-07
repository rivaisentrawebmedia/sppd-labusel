import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import type {
	ResKotakSuratDetailType,
	ResProfilDesaType,
} from "../../../model";
import { getWebsiteUrl } from "@/utils/helpers";
import { FaPrint } from "react-icons/fa";
import { usePostCetakSurat } from "../../../controller";
import { generatePdfSurat, type Surat } from "./generatePDFSuratTugas";

pdfMake.vfs = pdfFonts.vfs;

export function PrintSPPernikahan({
	surat,
	profilDesa,
	isCetak,
}: {
	surat: ResKotakSuratDetailType;
	profilDesa: ResProfilDesaType;
	isCetak?: boolean;
}) {
	const { handleSave, loading } = usePostCetakSurat();

	const dataSurat: Surat = {
		profil_desa: profilDesa,
		surat: surat,
		isCetak: isCetak,
		website: getWebsiteUrl(),
	};

	const handlePrint = () => {
		pdfMake.createPdf(generatePdfSurat(dataSurat)).print();
	};

	return (
		<>
			<button
				disabled={loading}
				className="bg-primary w-fit flex items-center gap-3 py-1.5 px-4 rounded-md text-white"
				onClick={() => {
					handleSave(surat?.id);
					handlePrint();
				}}
			>
				<FaPrint />
				Print Surat
			</button>
		</>
	);
}
