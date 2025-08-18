import React from "react";
import Image from "next/image";
import { calcHypixelLevel, timeAgo, formatTimestampToVerboseDate } from "@/app/utils/Utils"; // Assuming you have a utility function for this

interface PlayerExtraInfoProps {
	playerName: string;
	info: {
		display: {
			levelFormattedWithBrackets: string;
			levelFormatted: string;
			newPackageRank: string;
			monthlyPackageRank: string;
			rankPlusColor: string;
			monthlyRankColor: string;
			skywarsActiveScheme: string;
			tagColor: string;
			tag: string;
		};
		stats: {
			karma: number;
			networkExp: number;
			firstLogin: number;
			lastLogin: number;
			achievementPoints: number;
			guild: string;
			guildRank: string;
			guildJoined: number;
		};
		socials: {
			twitter?: string;
			youtube?: string;
			instagram?: string;
			tiktok?: string;
			twitch?: string;
			discord?: string;
			hypixel?: string;
		};
	};
}

const socials = {
	twitter: "/icons/twitter.png",
	youtube: "/icons/youtube.png",
	instagram: "/icons/instagram.png",
	tiktok: "/icons/tiktok.png",
	twitch: "/icons/twitch.png",
	discord: "/icons/discord.png",
	hypixel: "/icons/hypixel.png",
};

const extraStats: (keyof PlayerExtraInfoProps["info"]["stats"])[] = ["networkExp", "firstLogin", "lastLogin"]; // Typescript magic?

const PlayerExtraInfo: React.FC<PlayerExtraInfoProps> = async ({ playerName, info }) => {
	return (
		<>
			<div className="bg-gray-800 p-4 font-bold flex gap-4">
				{info.socials && Object.entries(info.socials).length > 0 ? (
					<>
						{Object.entries(info.socials).map(([social]) => {
							const socialKey = social as keyof typeof info.socials;
							const iconPath = socials[socialKey];
							if (!iconPath) return null;
							return (
								<a key={social} href={info.socials[socialKey]}>
									<Image
										src={iconPath.startsWith("/") ? iconPath : `/${iconPath}`}
										alt={`${social} icon`}
										width={32}
										height={32}
									/>
								</a>
							);
						})}
					</>
				) : (
					<p className="text-gray-400">No socials linked</p>
				)}
			</div>
			<div className="w-full bg-gray-800 p-4 justify-center font-bold gap-2 hidden lg:flex flex-nowrap">
				<span>Network Level: {calcHypixelLevel(info.stats.networkExp)}</span>
				<span title={timeAgo(info.stats.firstLogin / 1000)}>
					First Login: {formatTimestampToVerboseDate(info.stats.firstLogin)}
				</span>
				<span title={formatTimestampToVerboseDate(info.stats.lastLogin)}>
					Last Login: {timeAgo(info.stats.lastLogin / 1000)}
				</span>
				<span>AP: {info.stats.achievementPoints.toLocaleString()}</span>
				<span>Karma: {info.stats.karma.toLocaleString()}</span>
			</div>
		</>
	);
};

export default PlayerExtraInfo;
