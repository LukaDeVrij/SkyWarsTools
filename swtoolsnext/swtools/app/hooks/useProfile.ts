import axios from "axios";
import useSWR from "swr";

type UserInfoResponse = {
	user: {
		mc_account: string | null;
		patreon: boolean;
		profile_bg: string | null;
	};
};

const fetcher = (url: string, token: string) =>
	axios
		.get<UserInfoResponse>(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => res.data);

export function useProfile(token: string | null) {
	const shouldFetch = Boolean(token);
	const { data, error, isLoading } = useSWR(
		shouldFetch ? ["http://localhost:3001/auth/getUserInfo", token] : null,
		([url, t]: [string, string]) => fetcher(url, t)
	);

	return {
		user: data?.user ?? null,
		isLoading,
		isError: !!error,
	};
}
