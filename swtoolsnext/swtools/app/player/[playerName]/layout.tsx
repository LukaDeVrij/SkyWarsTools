import PlayerNavBar from "@/app/components/player/PlayerNavBar";
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

	return (
		<>
			<PlayerNavBar playerName={playerName}></PlayerNavBar>
			{children}
		</>
	);
};

export default PlayerLayout;
