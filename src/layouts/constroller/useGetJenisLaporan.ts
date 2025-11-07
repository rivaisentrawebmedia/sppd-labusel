import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Referensi } from "../model/referensi.model";
import { getJenisLaporan } from "../model/referensi.service";

export function useGetJenisLaporan() {
	const [jenisLaporan, setJenisLaporan] = useState<Referensi[]>([]);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["jenis-laporan"],
		queryFn: getJenisLaporan,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
		staleTime: Infinity,
		retry: false,
		placeholderData: (prev) => prev,
	});

	const loading = isLoading || isFetching;

	useEffect(() => {
		if (data) {
			setJenisLaporan(data.data);
		}
	}, [data]);

	return {
		loading,
		jenisLaporan,
	};
}
