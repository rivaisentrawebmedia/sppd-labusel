import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getLaporanByStatus, type LaporanStatus } from "../model";

export function useGetSuratByStatus() {
	const [statusSurat, setStatusSurat] = useState<LaporanStatus[]>([]);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["laporan-status"],
		queryFn: getLaporanByStatus,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
		staleTime: Infinity,
		retry: 1,
		placeholderData: (prev) => prev,
	});

	const loading = isLoading || isFetching;

	useEffect(() => {
		if (data?.data) {
			setStatusSurat(data.data);
		}
	}, [data]);

	return {
		loading,
		statusSurat,
	};
}
