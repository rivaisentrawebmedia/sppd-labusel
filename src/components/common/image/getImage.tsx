import { IMAGE_CONSTANTA } from "@/const";
import { useGetFile } from "@/layouts/constroller";
import { getInitials } from "@/utils/helpers";
import clsx from "clsx";

export function Image({
	src,
	alt,
	classNameImage,
	classNamePlaceHolder,
}: {
	src: string;
	alt: string;
	classNameImage?: string;
	classNamePlaceHolder?: string;
}) {
	const { url } = useGetFile(src);
	return (
		<>
			{src ? (
				<img
					src={url || IMAGE_CONSTANTA?.logo}
					alt="user"
					className={clsx("", classNameImage)}
				/>
			) : (
				<div className={clsx("", classNamePlaceHolder)}>
					{getInitials(alt || "").slice(0, 2)}
				</div>
			)}
		</>
	);
}
