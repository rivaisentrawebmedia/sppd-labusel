import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { useEffect, useState } from "react";
import PDFPreview from "../pdfPreview";
import clsx from "clsx";
import type {
	ResKopSuratType,
	ResKotakSuratDetailType,
	ResProfilDesaType,
} from "../../../model";
import { getWebsiteUrl } from "@/utils/helpers";
import { generatePdfSurat, type Surat } from "./generatePDF";

pdfMake.vfs = pdfFonts.vfs;

export function PreviewSPCerai({
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
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);

	useEffect(() => {
		const generatePdf = async () => {
			const dataSurat: Surat = {
				kop_surat: kopSurat,
				jenis_surat: jenis_surat,
				profil_desa: profilDesa,
				surat: surat,
				isCetak: isCetak,
				website: getWebsiteUrl(),
			};

			const pdfDocGenerator = pdfMake.createPdf(generatePdfSurat(dataSurat));

			pdfDocGenerator.getBlob((blob: Blob) => {
				const url = URL.createObjectURL(blob);
				setPdfUrl(url);
			});
		};

		generatePdf();
	}, []);

	return (
		<div
			className={clsx(
				"flex w-full h-full overflow-auto scrollbar flex-col bg-white"
			)}
		>
			{pdfUrl && <PDFPreview pdfUrl={pdfUrl} />}
		</div>
	);
}
