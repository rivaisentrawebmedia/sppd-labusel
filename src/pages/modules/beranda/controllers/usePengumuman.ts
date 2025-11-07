import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Meta } from "@/layouts/model";
import { getPengumuman, type Pengumuman } from "../model";

export function useGetPengumuman() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page") || "1";
	const limit = searchParams.get("limit") || "10";
	const search = searchParams.get("search") || "";

	const [pengumuman, setPengumuman] = useState<Pengumuman[]>([]);
	const [meta, setMeta] = useState<Meta>();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["pengumuman", page, limit, search],
		queryFn: () => getPengumuman(Number(page), Number(limit), search),
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		staleTime: 0,
		retry: false,
		placeholderData: undefined,
	});

	const loading = isLoading || isFetching;

	useEffect(() => {
		if (data?.data) {
			setPengumuman(data.data);
			setMeta(data?.meta);
		}
	}, [data]);

	return {
		loading,
		pengumuman,
		meta,
		setSearchParams,
	};
}
