import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPesananSayaByStatus, type PesananSayaStatus } from "../model";

export function useGetPesananByStatus() {
	const [statusPesanan, setStatusPesanan] = useState<PesananSayaStatus[]>([]);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["pesanan-saya-status"],
		queryFn: getPesananSayaByStatus,
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
			setStatusPesanan(data.data);
		}
	}, [data]);

	return {
		loading,
		statusPesanan,
	};
}
