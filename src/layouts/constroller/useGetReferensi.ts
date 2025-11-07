import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Referensi } from "../model/referensi.model";
import { getReferensi } from "../model/referensi.service";

export function useGetReferensi({ jenis }: { jenis: string }) {
	const [referensi, setReferensi] = useState<Referensi[]>([]);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["referensi", jenis], // lebih aman, tambahkan prefix agar unik
		queryFn: () => getReferensi(jenis), // ✅ gunakan callback
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
			setReferensi(data.data);
		}
	}, [data]);

	return {
		loading,
		referensi,
	};
}
