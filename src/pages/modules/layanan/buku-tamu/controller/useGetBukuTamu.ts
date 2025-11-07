import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Meta } from "@/layouts/model";
import type { BukuTamu } from "../model/buku-tamu.model";
import { getBukuTamu } from "../model/buku-tamu.service";

export function useGetBukuTamu() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page") || "1";
	const limit = searchParams.get("limit") || "10";
	const search = searchParams.get("search") || "";

	const [surat, setSurat] = useState<BukuTamu[]>([]);
	const [meta, setMeta] = useState<Meta>();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["buku-tamu", page, limit, search],
		queryFn: () => getBukuTamu(Number(page), Number(limit), search),
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		staleTime: 0,
		retry: false,
		placeholderData: undefined,
	});

	const loading = isLoading || isFetching;

	useEffect(() => {
		if (data?.data) {
			setSurat(data.data);
			setMeta(data?.meta);
		}
	}, [data]);

	return {
		loading,
		surat: surat,
		meta,
		setSearchParams,
		page,
		search,
		limit,
	};
}
