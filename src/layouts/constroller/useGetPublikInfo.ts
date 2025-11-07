import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPublikInfo, type PublikInfo } from "../model";

export function useGetPublikInfo() {
	const [publikInfo, setPublikInfo] = useState<PublikInfo>();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["publik-info"],
		queryFn: getPublikInfo,
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
			setPublikInfo(data.data);
		}
	}, [data]);

	return {
		loading,
		publikInfo,
	};
}
