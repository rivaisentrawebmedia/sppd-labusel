import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getLaporanByID, type LaporanDetail } from "../model";
import { usePathname } from "@/utils/usePathname";

export function useGetLaporanID() {
	const { fourthPathname } = usePathname();
	const laporanID = fourthPathname || undefined;

	const [laporan, setLaporan] = useState<LaporanDetail>();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["laporan-detail", laporanID],
		queryFn: () => getLaporanByID(laporanID),
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: true,
		staleTime: 0,
		retry: false,
		placeholderData: undefined,
	});

	const loading = isLoading || isFetching;

	useEffect(() => {
		if (data?.data) {
			setLaporan(data.data);
		}
	}, [data]);

	return {
		loading,
		laporan,
	};
}
