import clsx from "clsx";
import Loading from "../../assets/images/loading-mona.gif";

export function LoadingMona({ width }: { width?: string }) {
	return (
		<div className="flex w-full flex-col flex-1 items-center justify-center gap-4">
			<img
				src={Loading}
				alt="loading"
				className={clsx(`${width ? width : "w-[10rem]"}`)}
			/>
			<p className="text-[#484f58]">Sedang memuat data ...</p>
		</div>
	);
}
