import { LoadingMona } from "@/components/ui/loading";
import clsx from "clsx";

export default function PDFPreview({ pdfUrl }: { pdfUrl: string }) {
	return (
		<div
			className={clsx(
				"flex h-full flex-col overflow-auto scrollbar items-center justify-center"
			)}
		>
			{pdfUrl ? (
				<iframe
					src={pdfUrl}
					className="h-[965px] w-full phones:h-[800px]"
					title="PDF Preview"
					style={{
						border: "none",
						boxShadow: "0 0 10px rgba(0,0,0,0.2)",
					}}
				/>
			) : (
				<LoadingMona />
			)}
		</div>
	);
}
