import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getLaporanByJenis, type LaporanJenis } from "../model";
import { useSearchParams } from "react-router-dom";

export function useGetSuratByJenis() {
	const [searchParams] = useSearchParams();

	const start = searchParams.get("start") || undefined;
	const end = searchParams.get("end") || undefined;

	const [jenisSurat, setJenisSurat] = useState<LaporanJenis[]>([]);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["laporan-jenis", start, end],
		queryFn: () => getLaporanByJenis(start, end),
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
		staleTime: Infinity,
		retry: false,
		placeholderData: (prev) => prev,
	});

	const loading = isLoading || isFetching;

	useEffect(() => {
		if (data?.data) {
			setJenisSurat(data.data);
		}
	}, [data]);

	return {
		loading,
		jenisSurat,
	};
}
