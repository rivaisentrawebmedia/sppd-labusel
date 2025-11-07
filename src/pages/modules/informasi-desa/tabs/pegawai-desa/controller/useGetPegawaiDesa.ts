import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPegawaiDesa, type PegawaiDesa } from "../model";

export function useGetPegawaiDesa() {
	const [pegawai, setPegawai] = useState<PegawaiDesa[]>([]);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["pegawai-desa"],
		queryFn: getPegawaiDesa,
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
			setPegawai(data.data);
		}
	}, [data]);

	return {
		loading,
		data: pegawai,
	};
}
