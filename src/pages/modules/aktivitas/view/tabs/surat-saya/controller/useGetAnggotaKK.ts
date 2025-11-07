import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAnggotaKK } from "../model";
import type { AnggotaKK } from "../model/anggota-kk.model";

export function useGetAnggotaKK() {
	const [anggotaKK, setAnggotaKK] = useState<AnggotaKK[]>([]);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["anggota-kk"],
		queryFn: getAnggotaKK,
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		staleTime: 0,
		retry: false,
		placeholderData: undefined,
	});

	const loading = isLoading || isFetching;

	useEffect(() => {
		if (data?.data) {
			setAnggotaKK(data.data);
		}
	}, [data]);

	return {
		loading,
		anggotaKK,
	};
}
