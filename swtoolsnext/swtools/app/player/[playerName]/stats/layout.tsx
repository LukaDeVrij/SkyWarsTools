import PlayerNavBar from "@/app/components/player/PlayerNavBar";
import PlayerBanner from "@/app/components/player/PlayerBanner";
import PlayerTitle from "@/app/components/player/PlayerTitle";
import RankGraph from "@/app/components/player/RankGraph";
import PlayerOverallStats from "@/app/components/player/PlayerOverallStats";
import PlayerExtraInfo from "@/app/components/player/PlayerExtraInfo";
import React from "react";
import PlayerStatsNavBar from "@/app/components/player/PlayerStatsNavBar";
import { type ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
	params: Promise<{ playerName: string }>;
}

const PlayerStatsLayout = async ({ children, params }: LayoutProps) => {
	const awaitedParams = await params;
	const playerName = awaitedParams.playerName;

	const res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/overall?player=${encodeURIComponent(playerName)}`, {
		next: { revalidate: 300 },
	});
	if (!res.ok) {
		console.log(res.statusText);
		throw new Error("Failed to fetch player data");
	}
	const overallData = await res.json();
	console.log(overallData);

	return (
		<>
			<PlayerNavBar playerName={playerName} />
			<PlayerBanner playerName={playerName} />
			<PlayerTitle playerName={playerName} response={overallData} />
			<div className="h-fit w-full flex flex-col lg:flex-row">
				<RankGraph playerName={playerName} />
				<PlayerOverallStats response={overallData} />
			</div>
			<PlayerExtraInfo response={overallData} />
			<PlayerStatsNavBar />
			{children}
		</>
	);
};

export default PlayerStatsLayout;
