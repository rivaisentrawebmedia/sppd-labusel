import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { useEffect, useState } from "react";
import { generatePdfSurat, type Surat } from "./generatePDFSuratTugas";
import PDFPreview from "../pdfPreview";
import clsx from "clsx";
import type {
	ResKotakSuratDetailType,
	ResProfilDesaType,
} from "../../../model";
import { getWebsiteUrl } from "@/utils/helpers";

pdfMake.vfs = pdfFonts.vfs;

export function PreviewSPPernikahan({
	surat,
	profilDesa,
	isCetak,
}: {
	surat: ResKotakSuratDetailType;
	profilDesa: ResProfilDesaType;
	isCetak?: boolean;
}) {
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);

	useEffect(() => {
		const generatePdf = async () => {
			const dataSurat: Surat = {
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
