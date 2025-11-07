import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getKuesioner, type Kuesioner } from "../model";
import { usePathname } from "@/utils/usePathname";

export function useGetKuisioner() {
	const { fivethPathname } = usePathname();
	const buku_tamu_id = fivethPathname;

	const [kuesioner, setKuesioner] = useState<Kuesioner[]>([]);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["kuesioner", buku_tamu_id],
		queryFn: () => getKuesioner(buku_tamu_id || ""),
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		staleTime: 0,
		retry: false,
		placeholderData: undefined,
	});

	const loading = isLoading || isFetching;

	useEffect(() => {
		if (data?.data) {
			setKuesioner(data.data);
		}
	}, [data]);

	return {
		loading,
		kuesioner,
	};
}
