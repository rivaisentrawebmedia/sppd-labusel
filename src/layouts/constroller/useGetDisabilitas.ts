import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Referensi } from "../model/referensi.model";
import { getDisabilitas } from "../model/referensi.service";

export function useGetDisabilitas() {
	const [disabilitas, setDisabilitas] = useState<Referensi[]>([]);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["disabilitas"],
		queryFn: getDisabilitas,
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
			setDisabilitas(data.data);
		}
	}, [data]);

	return {
		loading,
		disabilitas,
	};
}
