import VersusStatsView from "@/app/components/player/versus/VersusStatsView";
import ErrorView from "@/app/components/universal/ErrorView";
import { OverallResponse } from "@/app/types/OverallResponse";
import React from "react";

export default async function VersusPage({ params }: { params: Promise<{ playerName: string }> }) {
	async function fetchOverallData(playerName: string): Promise<OverallResponse | null> {
		try {
			console.log("Getting stats from overall for player " + playerName);
			const res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/overall?player=${encodeURIComponent(playerName)}`);
			if (!res.ok) return null;
			return await res.json();
		} catch {
			return null;
		}
	}

	const awaitedParams = await params;
	const playerName = awaitedParams.playerName;

	const overallData = await fetchOverallData(playerName);
	if (!overallData) {
		return <ErrorView statusCode={404} statusText={`Player ${playerName} not found or has no SkyWars data.`}></ErrorView>;
	}

	return (
		<div className="bg-content w-full h-fit flex flex-col gap-4 p-4 rounded-b-xl">
			<VersusStatsView overallData={overallData} />
		</div>
	);
}
