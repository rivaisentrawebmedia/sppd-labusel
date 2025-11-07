import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPesananSayaByJenis, type PesananSayaJenis } from "../model";
import { useSearchParams } from "react-router-dom";

export function useGetPesananByJenis() {
	const [searchParams] = useSearchParams();

	const start = searchParams.get("start") || undefined;
	const end = searchParams.get("end") || undefined;

	const [jenisPesanan, setJenisPesanan] = useState<PesananSayaJenis[]>([]);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["pesanan-saya-jenis", start, end],
		queryFn: () => getPesananSayaByJenis(start, end),
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
			setJenisPesanan(data.data);
		}
	}, [data]);

	return {
		loading,
		jenisPesanan,
	};
}
