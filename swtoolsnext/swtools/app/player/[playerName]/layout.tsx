import PlayerNavBar from "@/app/components/player/PlayerNavBar";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
	params: Promise<{ playerName: string }>;
}

const PlayerLayout = async ({ children, params }: LayoutProps) => {
	const awaitedParams = await params;
	const playerName = awaitedParams.playerName;

	// Could have a check if playerName is an actual playername and not a UUID but this is also handled in the stats page.tsx
	// Idk if you can get through *that* check, if so I can do it here too, and maybe check if the input is > 28 chars (shortened UUID)
	let correctedName = playerName;
	if (playerName.length > 16) {
		console.log("URL has UUID, fetching correct name");
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getUUID?player=${encodeURIComponent(awaitedParams.playerName)}`
		);
		const data = await res.json();

		if (!data || !data.name) {
			// Player doesn't exist
			return <div>Player not found</div>;
		}

		correctedName = data.name;

		if (correctedName.toLowerCase() !== playerName.toLowerCase()) {
			redirect(`/player/${correctedName}/stats/table`);
		}
	}

	return (
		<>
			<PlayerNavBar playerName={correctedName}></PlayerNavBar>
			{children}
		</>
	);
};

export default PlayerLayout;
