import SnapshotSelection from "@/app/components/player/selection/SnapshotSelection";
import React from "react";

const SessionPage = async ({ params }: { params: { playerName: string } }) => {
	const awaitedParams = await params;
	const playerName = awaitedParams.playerName;
	return (
		<div className="bg-content w-full flex flex-col justify-center align-center p-4 rounded-b-xl">
			<h1 className="w-full text-4xl text-center font-semibold">Generate Session</h1>
			<SnapshotSelection playerName={playerName} pageType="session" />
		</div>
	);
};

export default SessionPage;
