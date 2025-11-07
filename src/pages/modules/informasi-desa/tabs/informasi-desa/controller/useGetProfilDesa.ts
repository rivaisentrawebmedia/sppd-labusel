import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getProfilDesa, type ProfilDesa } from "../model";

export function useGetProfilDesa() {
	const [profil, setProfil] = useState<ProfilDesa>();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["profil-desa"],
		queryFn: getProfilDesa,
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
