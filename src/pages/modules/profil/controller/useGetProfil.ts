import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getProfil, type Profil } from "../model";

export function useGetProfil() {
	const [profil, setProfil] = useState<Profil>();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["profil"],
		queryFn: getProfil,
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
			setProfil(data.data);
		}
	}, [data]);

	return {
		loading,
		data: profil,
	};
}
