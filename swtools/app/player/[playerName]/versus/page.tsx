import PlayerVersusSearch from "@/app/components/player/versus/PlayerVersusSearch";
import { OverallResponse } from "@/app/types/OverallResponse";
import MinecraftText from "@/app/utils/MinecraftText";
import { getPlayerRank } from "@/app/utils/RankTag";
import { formatScheme } from "@/app/utils/Scheme";
import { calcLevel } from "@/app/utils/Utils";
import React from "react";
import Image from "next/image";

export default async function VersusPage({ params }: { params: Promise<{ playerName: string }> }) {
	async function fetchOverallData(playerName: string): Promise<OverallResponse | null> {
		try {
			console.log("Getting stats from overall for player " + playerName);
			const res = await fetch(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/overall?player=${encodeURIComponent(playerName)}`);
			if (!res.ok) return null;
			return await res.json();
		} catch {
			return null;
		}
	}

	const awaitedParams = await params;
	const playerName = awaitedParams.playerName;

	const overallData = await fetchOverallData(playerName);
	if (!overallData) {
		return (
			<div className="bg-content w-full flex flex-col justify-center align-center p-4 rounded-b-xl">
				<h1 className="w-full text-4xl text-center font-semibold">Player Versus</h1>
				<p className="text-center mt-4">No data found for player {playerName}.</p>
			</div>
		);
	}

	const level = calcLevel(overallData.stats.skywars_experience ?? 0);
	const scheme = formatScheme(level, overallData, false);
	const rank = getPlayerRank(overallData);
	const playerTitle = `${scheme} ${rank.prefix} ${overallData.player}`;
	return (
		<div className="bg-content w-full h-fit flex flex-col justify-between gap-4 p-4 rounded-b-xl">
			<div className="flex flex-row flex-1 items-center bg-layer p-4 rounded-lg">
				<div className="flex-1 min-w-0 text-2xl truncate">
					<MinecraftText>{playerTitle}</MinecraftText>
				</div>
				<div className="flex-shrink-0 flex items-center justify-center w-40">
					<h1 className="text-5xl text-center font-semibold animate-scale">VS</h1>
				</div>
				<div className="flex-1 min-w-0 text-right text-2xl">
					<PlayerVersusSearch player={playerName} />
				</div>
			</div>
			<div className="flex flex-row flex-1 items-center bg-layer p-4 rounded-lg gap-4">
				<div className="flex-shrink-0 flex items-center justify-center" style={{ width: 150, height: 356 }}>
					<Image
						src={`https://starlightskins.lunareclipse.studio/render/ultimate/${overallData.player}/full`}
						width={150}
						height={356}
						alt={`${overallData.player} avatar`}
						className="object-contain"
					/>
				</div>
				<div className="w-full h-96 flex flex-col items-center justify-center text-3xl text-center">
					<svg width="64" height="64" viewBox="0 0 32 32" fill="none">
						<path d="M8 24L24 8M24 8H12M24 8V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
					<p className="mb-10">Enter an opponent name to get a versus breakdown of their stats!</p>
				</div>
				<div className="flex-shrink-0 flex items-center justify-center" style={{ width: 150, height: 356 }}>
					<Image
						src={`/unknownskin.png`}
						width={150}
						height={356}
						alt="Unknown avatar"
						className="object-contain"
					/>
				</div>
			</div>
		</div>
	);
}
