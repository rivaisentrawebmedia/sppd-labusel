import { useQuery } from "@tanstack/react-query";
import { getFile } from "../model";

export function useGetFile(id?: string) {
	const {
		data: url,
		isLoading,
		isFetching,
		isError,
		error,
	} = useQuery({
		queryKey: ["file", id],
		queryFn: () => getFile(id!),
		enabled: Boolean(id),
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
		staleTime: Infinity,
		retry: false,
	});

	return {
		loading: isLoading || isFetching,
		url: url ?? "",
		isError,
		error,
	};
}
