import axios from "axios";
import useSWR from "swr";

type UserInfoResponse = {
	user: UserProfile;
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
		shouldFetch ? [`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/auth/getUserInfo`, token] : null,
		([url, t]: [string, string]) => fetcher(url, t)
	);

	return {
		user: data?.user ?? null,
		isLoading,
		isError: !!error,
	};
}
