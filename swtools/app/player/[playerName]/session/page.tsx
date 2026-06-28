import SnapshotSelection from "@/app/components/player/selection/SnapshotSelection";
import Tooltip from "@mui/material/Tooltip";
import { CircleQuestionMark } from "lucide-react";
import React from "react";

interface SessionPageParams {
	params: Promise<{ playerName: string }>;
}

const SessionPage = async ({ params }: SessionPageParams) => {
	const awaitedParams = await params;
	const playerName = awaitedParams.playerName;
	return (
		<div className="bg-content flex flex-col justify-center align-center p-4 rounded-b-xl">
			<div className="flex justify-center align-top gap-2">
				<h1 className="text-4xl text-center font-semibold">Generate Session</h1>
				<Tooltip title="Snapshots are made when someone looks up your stats. Learn more on the About page!">
					<CircleQuestionMark></CircleQuestionMark>
				</Tooltip>
			</div>
			<SnapshotSelection playerName={playerName} pageType="session" />
		</div>
	);
};

export default SessionPage;
