import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Meta } from "@/layouts/model";
import { getBerita, type Berita } from "../model";

export function useGetBerita() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page") || "1";
	const limit = searchParams.get("limit") || "10";
	const search = searchParams.get("search") || "";

	const [berita, setBerita] = useState<Berita[]>([]);
	const [meta, setMeta] = useState<Meta>();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["berita", page, limit, search],
		queryFn: () => getBerita(Number(page), Number(limit), search),
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		staleTime: 0,
		retry: false,
		placeholderData: undefined,
	});

	const loading = isLoading || isFetching;

	useEffect(() => {
		if (data?.data) {
			setBerita(data.data);
			setMeta(data?.meta);
		}
	}, [data]);

	return {
		loading,
		berita,
		meta,
		setSearchParams,
	};
}
