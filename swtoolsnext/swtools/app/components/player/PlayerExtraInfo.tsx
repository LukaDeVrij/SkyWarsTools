import React from "react";
import Image from "next/image";
import { calcHypixelLevel, timeAgo, formatTimestampToVerboseDate } from "@/app/utils/Utils"; // Assuming you have a utility function for this
import { OverallResponse } from "@/app/types/OverallResponse";

interface PlayerExtraInfoProps {
	response: OverallResponse;
}

const socials = {
	TWITTER: "/icons/twitter.png",
	YOUTUBE: "/icons/youtube.png",
	INSTAGRAM: "/icons/instagram.png",
	TIKTOK: "/icons/tiktok.png",
	TWITCH: "/icons/twitch.png",
	DISCORD: "/icons/discord.png",
	HYPIXEL: "/icons/hypixel.png",
};

const PlayerExtraInfo: React.FC<PlayerExtraInfoProps> = async ({ response }) => {
	let links = response.stats.socialMedia?.links;
	return (
		<>
			<div className="bg-content p-4 font-bold flex gap-4">
				{links && Object.entries(links).length > 0 ? (
					<>
						{Object.entries(links).map(([social]) => {
							const socialKey = social as keyof typeof links;
							const iconPath = socials[socialKey];
							if (!iconPath) return null;
							return (
								<a key={social} href={links[socialKey]}>
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
			<div className="w-full bg-content p-4 justify-center font-bold gap-2 hidden lg:flex flex-nowrap">
				<span>Network Level: {calcHypixelLevel(response.stats.networkExp)}</span>
				<span title={timeAgo(response.stats.firstLogin / 1000)}>
					First Login: {formatTimestampToVerboseDate(response.stats.firstLogin)}
				</span>
				<span title={formatTimestampToVerboseDate(response.stats.lastLogin)}>
					Last Login: {timeAgo(response.stats.lastLogin / 1000)}
				</span>
				<span>AP: {response.stats.achievementPoints.toLocaleString()}</span>
				<span>Karma: {response.stats.karma.toLocaleString()}</span>
			</div>
		</>
	);
};

export default PlayerExtraInfo;
