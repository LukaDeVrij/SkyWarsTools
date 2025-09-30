import SnapshotSelection from "@/app/components/player/selection/SnapshotSelection";
import React from "react";

export default async function ComparePage({ params }: { params: Promise<{ playerName: string }> }) {
	const awaitedParams = await params;
	const playerName = awaitedParams.playerName;
	return (
		<div className="bg-content w-full flex flex-col justify-center align-center p-4 rounded-b-xl">
			<h1 className="w-full text-4xl text-center font-semibold">Compare Snapshots</h1>
			<SnapshotSelection playerName={playerName} pageType="compare" />
		</div>
	);
}
