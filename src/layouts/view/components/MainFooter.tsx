import type { PublikInfo } from "@/layouts/model";
import dayjs from "dayjs";

export function MainFooter({
	loading,
	data,
}: {
	loading: boolean;
	data: PublikInfo | undefined;
}) {
	return (
		<footer className="bg-primary text-center text-white px-4 md:px-8 lg:px-[6rem] py-4">
			© Portal Desa,{" "}
			{loading ? (
				<span className="inline-block w-32 h-4 bg-white/20 rounded animate-pulse align-middle" />
			) : (
				data?.nama_desa || "Indosistem"
			)}
			, {dayjs().locale("id").format("YYYY")}
		</footer>
	);
}
