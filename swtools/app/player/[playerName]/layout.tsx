import PlayerNavBar from "@/app/components/player/PlayerNavBar";
import ErrorView from "@/app/components/universal/ErrorView";
import Head from "next/head";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
	params: Promise<{ playerName: string }>;
}

const PlayerLayout = async ({ children, params }: LayoutProps) => {
	const awaitedParams = await params;
	const playerName = awaitedParams.playerName;

	let correctedName = playerName;

	let res;
	try {
		res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/getUUID?player=${encodeURIComponent(awaitedParams.playerName)}`);
	} catch (error) {
		return <ErrorView statusCode={500} statusText="Failed to fetch player data. Is the API down?"></ErrorView>;
	}
	const data = await res.json();

	if (!data || !data.name) {
		// Player doesn't exist
		return <ErrorView statusCode={404} statusText="Player not found"></ErrorView>;
	}

	correctedName = data.name;

	if (correctedName.toLowerCase() !== playerName.toLowerCase()) {
		redirect(`/player/${correctedName}/stats/table`);
	}

	return (
		<>
			<Head>
				<title>{correctedName} | SkyWarsTools</title>
			</Head>
			<PlayerNavBar playerName={correctedName}></PlayerNavBar>
			{children}
		</>
	);
};

export default PlayerLayout;
