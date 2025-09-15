"use client";

import React from "react";
import twemoji from "@twemoji/api";
import Image from "next/image";
import MinecraftText from "../../utils/MinecraftText";
import { getPlayerRank } from "@/app/utils/RankTag";
import { calcLevel, fetcher } from "@/app/utils/Utils";
import { formatScheme } from "@/app/utils/Scheme";
import useSWR from "swr";
import { OverallResponse } from "@/app/types/OverallResponse";

interface PlayerTitleProps {
	playerName: string;
	response: OverallResponse;
}
type StatusResponse = {
	success: boolean;
	uuid: string;
	session: {
		online: boolean;
		gameType?: string;
		mode?: string;
	};
};

const PlayerTitle: React.FC<PlayerTitleProps> = ({ playerName, response }) => {
	const { data, error, isLoading } = useSWR<StatusResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/status?player=${response.player}`,
		fetcher
	);

	type UserInfoResponse = {
		user: UserProfile;
	};
	const [typedUserInfo, setTypedUserInfo] = React.useState<UserInfoResponse | null>(null);

	const [nationality, setNationality] = React.useState<string | null>(null);

	const { data: userInfoData } = useSWR<UserInfoResponse>(
		`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/auth/getUserByMC?player=${response.player}`,
		fetcher
	);

	React.useEffect(() => {
		if (userInfoData) {
			setTypedUserInfo(userInfoData);
			setNationality(userInfoData.user.nationality ?? null);
		}
	}, [userInfoData]);

	// Status
	let bgColor = "bg-red-500";
	let title = "(Appears) Offline";
	if (error) title = "Error fetching status";
	if (data && data.session.online && !error) {
		if (data.session.gameType === "SKYWARS") {
			bgColor = "bg-green-500";
			title = `Player is in SkyWars! (${data.session.gameType} - ${data.session.mode})`;
		} else {
			bgColor = "bg-yellow-400";
			title = `${data.session.gameType ?? "Online"}${data.session.mode ? ` - ${data.session.mode}` : ""}`;
		}
	}

	// Scheme bits
	const level = calcLevel(response.stats.skywars_experience ?? 0);
	const scheme = formatScheme(level, response, false);

	// Rank
	const rank = getPlayerRank(response);

	// Guild Suffix
	let guildColor: string = "§7";
	let guildTagFormatted: string = "";
	if (response.guild.tag) {
		switch (response.guild.tagColor) {
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

		guildTagFormatted = guildColor + "[" + response.guild.tag + "]";
	}

	// Final assembled title
	const playerTitle = `${scheme} ${rank.prefix} ${response.player} ${guildTagFormatted}`;

	return (
		<div className="bg-main h-22 lg:h-25 w-full flex items-center">
			<div className="z-10 relative">
				<Image
					alt="player avatar"
					width={100}
					height={100}
					className="rounded h-20 w-20 lg:h-28 lg:w-28 mb-6 lg:mb-12 mx-2 lg:mx-4 z-10 hidden lg:inline"
					src={`https://www.mc-heads.net/avatar/${response.player}`}
				/>
				{/* Online status indicator overlay */}
				<span
					title={title}
					className={`absolute top-[-12px] right-[-25px] lg:top-[-8] lg:right-[-10] border-2 border-black rounded-full w-5 h-5 block ${bgColor}`}
				></span>
			</div>

			<div className="w-full lg:h-22 text-3xl lg:text-4xl flex flex-col justify-center px-4 text-center lg:text-left">
				<MinecraftText>{playerTitle}</MinecraftText> {/* No space for guild tag on mobile*/}
				<div className="text-xl font-montserrat justify-between lg:flex">
					<div className="flex items-center gap-2 text-sm lg:text-lg">
						<span className="text-2xl hidden lg:inline" title={nationality?.split(" ")[0]}>
							{nationality?.split(" ")[1]}
						</span>
						{response.guild.guild && (
							<span className="font-semibold hidden lg:inline">
								{response.guild.guild} ({response.guild.guildRank})
							</span>
						)}
					</div>

					<div className="hidden lg:flex items-center gap-2 mx-4">
						<a
							href={`https://namemc.com/profile/${response.player}`}
							target="_blank"
							rel="noopener noreferrer"
							className="animate-press-hard"
							style={{ display: "flex" }}
							title="View on NameMC"
						>
							<Image src="/icons/namemc.png" alt="NameMC logo" width={32} height={32} className="inline h-6 w-6" />
						</a>
						<a
							href={`https://www.shmeado.club/player/stats/${response.player}/SkyWars/Table/`}
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
							href={`https://plancke.io/hypixel/player/stats/${response.player}`}
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
