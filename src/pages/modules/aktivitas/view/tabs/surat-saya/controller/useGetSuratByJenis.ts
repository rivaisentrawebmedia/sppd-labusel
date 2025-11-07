import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getSuratSayaByJenis, type SuratSayaJenis } from "../model";
import { useSearchParams } from "react-router-dom";

export function useGetSuratByJenis() {
	const [searchParams] = useSearchParams();

	const start = searchParams.get("start") || undefined;
	const end = searchParams.get("end") || undefined;

	const [jenisSurat, setJenisSurat] = useState<SuratSayaJenis[]>([]);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["surat-saya-jenis", start, end],
		queryFn: () => getSuratSayaByJenis(start, end),
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
