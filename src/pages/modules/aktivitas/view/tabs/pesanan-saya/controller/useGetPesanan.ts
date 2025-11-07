import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPesananSaya, type PesananSaya } from "../model";
import { useSearchParams } from "react-router-dom";
import type { Meta } from "@/layouts/model";

export function useGetPesanan() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page") || "1";
	const limit = searchParams.get("limit") || "10";
	const search = searchParams.get("search") || "";
	const status = searchParams.get("status") || undefined;
	const jenis_produk_id = searchParams.get("jenis-produk-id") || undefined;
	const sub_jenis_id = searchParams.get("sub-jenis-id") || undefined;
	const start = searchParams.get("start") || undefined;
	const end = searchParams.get("end") || undefined;

	const [pesanan, setPesanan] = useState<PesananSaya[]>([]);
	const [meta, setMeta] = useState<Meta>();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: [
			"pesanan-saya",
			page,
			limit,
			search,
			status,
			jenis_produk_id,
			sub_jenis_id,
			start,
			end,
		],
		queryFn: () =>
			getPesananSaya(
				Number(page),
				Number(limit),
				search,
				status,
				jenis_produk_id,
				sub_jenis_id,
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
			setPesanan(data.data);
			setMeta(data?.meta);
		}
	}, [data]);

	return {
		loading,
		pesanan,
		meta,
		setSearchParams,
	};
}
