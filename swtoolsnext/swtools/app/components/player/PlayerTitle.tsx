import React from "react";
import twemoji from "@twemoji/api";
import Image from "next/image";
import MinecraftText from "../../utils/MinecraftText";
import { getPlayerRank } from "@/app/utils/RankTag";
import { calcLevel } from "@/app/utils/Utils";
import { formatScheme } from "@/app/utils/Scheme";

interface PlayerTitleProps {
	playerName: string;
	response: APIResponse;
}

const PlayerTitle: React.FC<PlayerTitleProps> = async ({ playerName, response }) => {
	const statusRes = await fetch(`https://skywarstools.com/api/status?player=${encodeURIComponent(playerName)}`);
	if (!statusRes.ok) {
		console.error(statusRes.statusText);
		throw new Error("Failed to fetch player status");
	}

	const statusData = await statusRes.json();

	// Scheme bits
	const level = calcLevel(response.stats.skywars_experience);
	const scheme = formatScheme(level, response.generic.display, false);

	// Rank
	const rank = getPlayerRank(response.generic.display);

	// Guild Suffix
	let guildColor: string = "§7";
	let guildTagFormatted: string = "";
	if (response.generic.display.tag) {
		switch (response.generic.display.tagColor) {
			case "YELLOW":
				guildColor = "§e";
				break;
			case "DARK_AQUA":
				guildColor = "§3";
				break;
			case "DARK_GREEN":
				guildColor = "§2";
				break;
			case "GOLD":
				guildColor = "§6";
				break;
			default:
				guildColor = "§7";
		}

		guildTagFormatted = guildColor + "[" + response.generic.display.tag + "]";
	}

	const playerTitle = `${scheme} ${rank.prefix} ${playerName} ${guildTagFormatted}`;

	return (
		<div className="bg-main h-22 lg:h-25 w-full flex items-center">
			<div className="z-10 relative">
				<Image
					alt="player avatar"
					width={100}
					height={100}
					className="rounded h-20 w-20 lg:h-28 lg:w-28 mb-6 lg:mb-12 mx-2 lg:mx-4 z-10 hidden lg:inline"
					src={`https://www.mc-heads.net/avatar/${playerName}`}
				/>
				{/* Online status indicator overlay */}
				{statusData.session && (
					// TODO Refactor this, pull JS out of the component (instead of nested ternaries)
					<span
						title={
							statusData.session.online
								? statusData.session.gameType === "SKYWARS"
									? `Player is in SkyWars! (${statusData.session.gameType} - ${statusData.session.mode})`
									: `${statusData.session.gameType} - ${statusData.session.mode}`
								: "(Appears) Offline"
						}
						// Bit fucky this - absolute positioning to the right of playerName
						className={`absolute top-[-12px] right-[-25px] lg:top-[-8] lg:right-[-10] border-2 border-black rounded-full w-5 h-5 block ${
							statusData.session.online
								? statusData.session.gameType === "SKYWARS"
									? "bg-green-500"
									: "bg-yellow-400"
								: "bg-red-500"
						}`}
					></span>
				)}
			</div>

			<div className="w-full lg:h-22 text-3xl lg:text-4xl flex flex-col justify-center px-4 text-center lg:text-left">
				<MinecraftText>{playerTitle}</MinecraftText> {/* No space for guild tag on mobile*/}
				<div className="text-xl font-montserrat justify-between lg:flex">
					<div className="flex items-center gap-2 text-sm lg:text-lg">
						{/* <span className="text-2xl">🇳🇱</span> */}
						<span className="font-semibold hidden lg:inline">
							{response.generic.stats.guild} ({response.generic.stats.guildRank})
						</span>
					</div>

					<div className="hidden lg:flex items-center gap-2 mx-4">
						<a
							href={`https://namemc.com/profile/${playerName}`}
							target="_blank"
							rel="noopener noreferrer"
							className="animate-press-hard"
							style={{ display: "flex" }}
							title="View on NameMC"
						>
							<Image src="/icons/namemc.png" alt="NameMC logo" width={32} height={32} className="inline h-6 w-6" />
						</a>
						<a
							href={`https://www.shmeado.club/player/stats/${playerName}/SkyWars/Table/`}
							target="_blank"
							rel="noopener noreferrer"
							className="inline h-6 w-6 animate-press-hard"
							style={{ display: "flex" }}
							title="View on Shmeado"
						>
							{/* Twemoji smile emoji */}
							<span
								dangerouslySetInnerHTML={{
									__html: twemoji.parse("😁", { folder: "svg", ext: ".svg" }),
								}}
								style={{ width: 42, height: 42, display: "inline-block" }}
							/>
						</a>
						<a
							href={`https://plancke.io/hypixel/player/stats/${playerName}`}
							target="_blank"
							rel="noopener noreferrer"
							className="animate-press-hard"
							style={{ display: "flex" }}
							title="View on Plancke"
						>
							<Image src="/icons/plancke.png" alt="Plancke logo" width={32} height={32} className="inline h-6 w-6" />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlayerTitle;
