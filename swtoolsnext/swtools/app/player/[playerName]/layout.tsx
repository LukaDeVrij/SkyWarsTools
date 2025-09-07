import PlayerNavBar from "@/app/components/player/PlayerNavBar";
import React, { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
	params: Promise<{ playerName: string }>;
}

const PlayerLayout = async ({ children, params }: LayoutProps) => {
	const awaitedParams = await params;
	let playerName = awaitedParams.playerName;



	return (
		<>
			<PlayerNavBar playerName={playerName}></PlayerNavBar>
			{children}
		</>
	);
};

export default PlayerLayout;
