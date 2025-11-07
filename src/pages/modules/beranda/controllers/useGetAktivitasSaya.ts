import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Meta } from "@/layouts/model";
import { getAktivitasSaya, type AktivitasSaya } from "../model";

export function useGetAktivitasSaya() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page") || "1";
	const limit = searchParams.get("limit") || "10";
	const search = searchParams.get("search") || "";

	const [aktivitasSaya, setAktivitasSaya] = useState<AktivitasSaya[]>([]);
	const [meta, setMeta] = useState<Meta>();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["aktivitas-saya", page, limit, search],
		queryFn: () => getAktivitasSaya(Number(page), Number(limit), search),
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		staleTime: 0,
		retry: false,
		placeholderData: undefined,
	});

	const loading = isLoading || isFetching;

	useEffect(() => {
		if (data?.data) {
			setAktivitasSaya(data.data);
			setMeta(data?.meta);
		}
	}, [data]);

	return {
		loading,
		aktivitasSaya,
		meta,
		setSearchParams,
	};
}
