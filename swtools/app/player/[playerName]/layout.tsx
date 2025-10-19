import PlayerNavBar from "@/app/components/player/PlayerNavBar";
import ErrorView from "@/app/components/universal/ErrorView";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { OverallResponse, Stats } from "@/app/types/OverallResponse";
import { calcLevel } from "@/app/utils/Utils";
import getMostPlayedKit from "@/app/utils/getMostPlayedKit";
import { extractKitMaxPrestige } from "@/app/utils/extractMaxKitPrestiges";

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

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
	const awaitedParams = await params;
	const playerName = awaitedParams.playerName;

	try {
		const data = await getPlayerData(playerName);
		
		// Fetch additional stats for the embed
		let statsData: OverallResponse | undefined;
		try {
			const statsRes = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/overall?player=${encodeURIComponent(data.name)}`);
			if (statsRes.ok) {
				statsData = await statsRes.json() as OverallResponse;
			}
		} catch {
			// If stats fetch fails, continue without stats
		}

		const level = calcLevel(statsData?.stats.skywars_experience ?? 0).toFixed(0)
		const best_kit = getMostPlayedKit(statsData);
		const maxPrestige = extractKitMaxPrestige(statsData?.stats.kitsMaxPrestige ?? "");
		/*
⭐ Level 40 ⭐

🌍 Global:
⚔️ 20,281 kills 🥇 4,974 wins 💀 3,507 losses

🎲 Mini:
🎯 K/D: 1.33 ⚔️ 643 🥇 124 💀 231

👤 Solo:
🎯 K/D: 1.33 ⚔️ 643 🥇 124 💀 231

👥 Doubles:
🎯 K/D: 1.33 ⚔️ 643 🥇 124 💀 231
		*/
		const description = statsData 
			? `
			⭐ Level ${level}
			🔵 ${statsData.stats.opals??0} opals 💎 ${maxPrestige} prestiges
			🔥 Best kit: ${best_kit}

🌍 Global:
⚔️ ${(statsData.stats.kills??0).toLocaleString()} 🥇 ${(statsData.stats.wins??0).toLocaleString()} 💀 ${(statsData.stats.losses??0).toLocaleString()}

🎲 Mini:
⚔️ ${(statsData.stats.kills_mini??0).toLocaleString()}🥇 ${(statsData.stats.wins_mini??0).toLocaleString()}

👤 Solo:
🎯 ${((statsData.stats.kills_solo??0) / (statsData.stats.deaths_solo ?? 0)).toFixed(2)} KD ⚔️ ${(statsData.stats.kills_solo??0).toLocaleString()}🥇 ${(statsData.stats.wins_solo??0).toLocaleString()} 💀 ${(statsData.stats.losses_solo??0).toLocaleString()}

👥 Doubles:
🎯 ${((statsData.stats.kills_team??0) / (statsData.stats.deaths_team ?? 0)).toFixed(2)} KD ⚔️ ${(statsData.stats.kills_team??0).toLocaleString()}🥇 ${(statsData.stats.wins_team??0).toLocaleString()} 💀 ${(statsData.stats.losses_team??0).toLocaleString()}
			`
			: `View ${data.name}'s SkyWars statistics and progression`;

		const playerHeadUrl = `https://www.mc-heads.net/avatar/${data.uuid}/50`;

		return {
			title: `${data.name} | SkyWarsTools`,
			description,
			openGraph: {
				title: `Check ${data.name} SkyWars statistics and progression`,
				description,
				images: playerHeadUrl,
				siteName: 'SkyWarsTools',
			},
		};
	} catch {
		// fetch fails
		return {
			title: `${playerName} | SkyWarsTools`,
			description: `View ${playerName}'s SkyWars statistics and progression`,
		};
	}
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
