import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getSuratSaya, type SuratSaya } from "../model";
import { useSearchParams } from "react-router-dom";
import type { Meta } from "@/layouts/model";

export function useGetSurat() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page") || "1";
	const limit = searchParams.get("limit") || "10";
	const search = searchParams.get("search") || "";
	const status = searchParams.get("status") || undefined;
	const jenis_surat = searchParams.get("jenis-surat") || undefined;
	const nama_surat = searchParams.get("nama-surat") || undefined;
	const start = searchParams.get("start") || undefined;
	const end = searchParams.get("end") || undefined;

	const [surat, setSurat] = useState<SuratSaya[]>([]);
	const [meta, setMeta] = useState<Meta>();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: [
			"surat-saya",
			page,
			limit,
			search,
			status,
			jenis_surat,
			nama_surat,
			start,
			end,
		],
		queryFn: () =>
			getSuratSaya(
				Number(page),
				Number(limit),
				search,
				status,
				jenis_surat,
				nama_surat,
				start,
				end
			),
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
	};
}
