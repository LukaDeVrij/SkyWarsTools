import useSWR from "swr";
import { fetcher } from "../utils/Utils";

export function useAPIOverall(playerName: string) {
	const { data, error, isLoading } = useSWR<APIResponse>(
		`https://skywarstools.com/api/overall?player=${encodeURIComponent(playerName)}`,
		fetcher,
		{
			dedupingInterval: 300000, // 5 minutes in ms
			revalidateOnFocus: false,
			revalidateIfStale: false,
			revalidateOnReconnect: false,
		}
	);

	return { data, error, isLoading };
}
