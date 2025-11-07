import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getBukuTamuByID, type BukuTamuByID } from "../model";
import { useSearchParams } from "react-router-dom";
import { usePathname } from "@/utils/usePathname";

export function useGetBukuTamu() {
	const { fourthPathname, fivethPathname } = usePathname();
	const buku_tamu = fourthPathname;
	const isDetail = fivethPathname === "detail";

	const [searchParams] = useSearchParams();
	const buku_tamu_id = searchParams.get("buku_tamu_id") || "";

	const [bukuTamu, setBukuTamu] = useState<BukuTamuByID>();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["buku-tamu", buku_tamu_id, buku_tamu],
		queryFn: () =>
			getBukuTamuByID(isDetail ? buku_tamu || "" : buku_tamu_id || ""),
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		staleTime: 0,
		retry: false,
		placeholderData: undefined,
	});

	const loading = isLoading || isFetching;

	useEffect(() => {
		if (data?.data) {
			setBukuTamu(data.data);
		}
	}, [data]);

	return {
		loading,
		bukuTamu,
	};
}
