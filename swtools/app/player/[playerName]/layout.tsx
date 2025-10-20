import PlayerNavBar from "@/app/components/player/PlayerNavBar";
import ErrorView from "@/app/components/universal/ErrorView";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";


interface LayoutProps {
	children: ReactNode;
	params: Promise<{ playerName: string }>;
}

async function getPlayerData(playerName: string) {
	let res;
	let data;
	try {
		res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getUUID?player=${encodeURIComponent(playerName)}`);
		data = await res.json();
	} catch {
		throw new Error("Failed to fetch player data. Is the API down?");
	}

	if (!data || !data.name) {
		throw new Error("Player not found");
	}

	return data;
}

const PlayerLayout = async ({ children, params }: LayoutProps) => {
	const awaitedParams = await params;
	const playerName = awaitedParams.playerName;

	let data;
	try {
		data = await getPlayerData(playerName);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		const statusCode = errorMessage.includes("not found") ? 404 : 500;
		return <ErrorView statusCode={statusCode} statusText={errorMessage}></ErrorView>;
	}

	const correctedName = data.name;

	if (correctedName.toLowerCase() !== playerName.toLowerCase()) {
		redirect(`/player/${correctedName}/stats/table`);
	}

	return (
		<>
			<PlayerNavBar playerName={correctedName}></PlayerNavBar>
			{children}
		</>
	);
};

export default PlayerLayout;
