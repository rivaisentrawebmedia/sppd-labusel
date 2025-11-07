import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getLaporan, type Laporan } from "../model";
import { useSearchParams } from "react-router-dom";
import type { Meta } from "@/layouts/model";

export function useGetLaporan() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page") || "1";
	const limit = searchParams.get("limit") || "10";
	const search = searchParams.get("search") || "";
	const status = searchParams.get("status") || undefined;
	const jenis_laporan_id = searchParams.get("jenis-laporan-id") || undefined;
	const start = searchParams.get("start") || undefined;
	const end = searchParams.get("end") || undefined;

	const [surat, setSurat] = useState<Laporan[]>([]);
	const [meta, setMeta] = useState<Meta>();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: [
			"laporan",
			page,
			limit,
			search,
			status,
			jenis_laporan_id,
			start,
			end,
		],
		queryFn: () =>
			getLaporan(
				Number(page),
				Number(limit),
				search,
				status,
				jenis_laporan_id,
				start,
				end
			),
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
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
	};
}
