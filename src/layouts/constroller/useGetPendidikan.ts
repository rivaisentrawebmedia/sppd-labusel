import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Referensi } from "../model/referensi.model";
import { getPendidikan } from "../model/referensi.service";

export function useGetPendidikan() {
	const [pendidikan, setPendidikan] = useState<Referensi[]>([]);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["pendidikan"],
		queryFn: getPendidikan,
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
			setPendidikan(data.data);
		}
	}, [data]);

	return {
		loading,
		pendidikan,
	};
}
