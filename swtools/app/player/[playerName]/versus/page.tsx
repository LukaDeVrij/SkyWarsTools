import VersusStatsView from "@/app/components/player/versus/VersusStatsView";
import ErrorView from "@/app/components/universal/ErrorView";
import { OverallResponse } from "@/app/types/OverallResponse";
import { SnapshotKeysResponse, SnapshotsResponse } from "@/app/types/Snapshot";
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
	async function fetchSnapshotsData(playerName: string): Promise<SnapshotKeysResponse | null> {
		try {
			console.log("Getting keys for player " + playerName);
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/snapshotKeys?player=${encodeURIComponent(playerName)}&page=1`
			);
			if (!res.ok) return null;
			return await res.json();
		} catch {
			return null;
		}
	}
	async function fetchSessionData(playerName: string, keys: number[]): Promise<SnapshotsResponse | null> {
		try {
			console.log("Getting stats from sessions for player " + playerName + " with keys " + keys.join(", "));
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getSnapshots?player=${encodeURIComponent(playerName)}&keys=${keys.join(
					","
				)}`
			);
			if (!res.ok) return null;
			return await res.json();
		} catch {
			return null;
		}
	}

	const awaitedParams = await params;
	const playerName = awaitedParams.playerName;

	const [overallData, snapshotKeys]: [OverallResponse | null, SnapshotKeysResponse | null] = await Promise.all([
		fetchOverallData(playerName),
		fetchSnapshotsData(playerName),
	]);
	if (!overallData) {
		return <ErrorView statusCode={404} statusText={`Player ${playerName} not found or has no SkyWars data.`}></ErrorView>;
	}
	let snapshotKeysSliced: { queried: number; player: string }[] | undefined;
	let snapshots: SnapshotsResponse | undefined = undefined;
	if (snapshotKeys && snapshotKeys.data && snapshotKeys.data.length > 2) {
		snapshotKeysSliced = snapshotKeys.data.slice(0, 2);

		const keys = snapshotKeysSliced.map((s) => s.queried);
		snapshots = (await fetchSessionData(playerName, keys)) as SnapshotsResponse;
	}

	return (
		<div className="bg-content w-full h-fit flex flex-col gap-4 p-4 rounded-b-xl">
			<VersusStatsView overallData={overallData} snapshots={snapshots} />
		</div>
	);
}
