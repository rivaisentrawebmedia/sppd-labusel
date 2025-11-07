import AxiosClient from "@/provider/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Profil } from "../model";

export function useGetProfile() {
	const [profile, setProfile] = useState<Profil>();

	const { data, isLoading, isFetching } = useQuery<{
		data: Profil;
	}>({
		queryKey: ["profile"],
		queryFn: () =>
			AxiosClient.get(`/auth/profile`, {}).then((res) => res?.data),
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
		staleTime: Infinity,
		retry: 1,
		placeholderData: (prev) => prev,
	});

	const loading = isLoading || isFetching;

	useEffect(() => {
		if (data) {
			setProfile(data?.data);
		}
	}, [data]);

	return {
		loading,
		profile,
	};
}
