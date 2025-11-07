import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { generatePdfSurat, type Surat } from "./generatePDFSuratTugas";
import type {
	ResKopSuratType,
	ResKotakSuratDetailType,
	ResProfilDesaType,
} from "../../../model";
import { getWebsiteUrl } from "@/utils/helpers";
import { usePostCetakSurat } from "../../../controller";
import { FaPrint } from "react-icons/fa";

pdfMake.vfs = pdfFonts.vfs;

export function PrintSKBedaIdentitas({
	surat,
	jenis_surat,
	profilDesa,
	isCetak,
	kopSurat,
}: {
	surat: ResKotakSuratDetailType;
	jenis_surat: string;
	profilDesa: ResProfilDesaType;
	isCetak?: boolean;
	kopSurat: ResKopSuratType;
}) {
	const { handleSave, loading } = usePostCetakSurat();

	const dataSurat: Surat = {
		kop_surat: kopSurat,
		jenis_surat: jenis_surat,
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
