import { use } from "react";
import { OverallResponse } from "../types/OverallResponse";

export async function fetchOverallData(playerName: string): Promise<OverallResponse> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/overall?player=${encodeURIComponent(playerName)}`, {
		next: { revalidate: 300 },
	});
	if (!res.ok) {
		console.log(res.statusText);
		throw new Error("Failed to fetch player data");
	}
	const overallData = await res.json();
	return overallData as OverallResponse;
}

// React Server Component/Server Action compatible hook
export function useOverall(playerName: string): OverallResponse {
	return use(fetchOverallData(playerName));
}
