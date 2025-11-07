import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getSuratSayaByStatus, type SuratSayaStatus } from "../model";

export function useGetSuratByStatus() {
	const [statusSurat, setStatusSurat] = useState<SuratSayaStatus>();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["surat-saya-status"],
		queryFn: getSuratSayaByStatus,
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
