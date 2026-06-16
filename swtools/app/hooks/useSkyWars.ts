import useSWR from "swr";
import { fetcher } from "../utils/Utils";
import { SkyWarsResponse } from "../types/SkyWarsResponse"; // adjust import path as needed

export const useFetchSkyWars = (playerName?: string) => {
	const url = playerName ? `${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/skywars?player=${encodeURIComponent(playerName)}` : null;

	const { data: skyWarsData, error: skyWarsError, isLoading: isSkyWarsLoading } = useSWR<SkyWarsResponse>(url, fetcher);

	return {
		skyWarsData,
		skyWarsError,
		isSkyWarsLoading,
	};
};
