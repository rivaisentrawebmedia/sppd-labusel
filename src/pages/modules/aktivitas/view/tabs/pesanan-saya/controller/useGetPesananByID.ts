import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPesananSayaById, type PesananSayaDetail } from "../model";
import { usePathname } from "@/utils/usePathname";

export function useGetPesananByID() {
	const { fourthPathname } = usePathname();
	const pesananID = fourthPathname;

	const [detail, setDetail] = useState<PesananSayaDetail>();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["pesanan-saya-detail", pesananID],
		queryFn: () => getPesananSayaById(pesananID || ""),
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
			setDetail(data.data);
		}
	}, [data]);

	return {
		loading,
		detail,
	};
}
