import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Referensi } from "../model/referensi.model";
import { getPekerjaan } from "../model/referensi.service";

export function useGetPekerjaan() {
	const [pekerjaan, setPekerjaan] = useState<Referensi[]>([]);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["pekerjaan"],
		queryFn: getPekerjaan,
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
			setPekerjaan(data.data);
		}
	}, [data]);

	return {
		loading,
		pekerjaan,
	};
}
