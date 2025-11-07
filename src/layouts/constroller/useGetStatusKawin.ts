import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Referensi } from "../model/referensi.model";
import { getStatusKawin } from "../model/referensi.service";

export function useGetStatusKawin() {
	const [statusKawin, setStatusKawin] = useState<Referensi[]>([]);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["status-kawin"],
		queryFn: getStatusKawin,
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
			setStatusKawin(data.data);
		}
	}, [data]);

	return {
		loading,
		statusKawin,
	};
}
