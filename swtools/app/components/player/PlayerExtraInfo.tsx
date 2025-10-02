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

const linkPrefixes = {
	TWITTER: "",
	YOUTUBE: "",
	INSTAGRAM: "https://www.instagram.com/",
	TIKTOK: "https://www.tiktok.com/@",
	TWITCH: "",
	DISCORD: "/discord/",
	HYPIXEL: "",

}

const PlayerExtraInfo: React.FC<PlayerExtraInfoProps> = async ({ response }) => {
	const links = response.stats.socialMedia?.links;
	return (
		<>
			<div className="bg-content p-4 px-6 font-bold flex gap-4">
				{links && Object.entries(links).length > 0 ? (
					<>
						{Object.entries(links).map(([social]) => {
							const socialKey = social as keyof typeof links;
							const iconPath = socials[socialKey];
							if (!iconPath) return null;
							return (
								<a key={social} href={linkPrefixes[socialKey] + links[socialKey]} target="_blank" rel="noopener noreferrer" title={socialKey}>
									<Image
										src={iconPath.startsWith("/") ? iconPath : `/${iconPath}`}
										alt={`${social} icon`}
										width={32}
										height={32}
										className="animate-press-hard"
									/>
								</a>
							);
						})}
					</>
				) : (
					<p className="text-gray-400">No socials linked</p>
				)}
			</div>
			<div className="w-full bg-content p-4 justify-around font-bold hidden lg:flex flex-nowrap">
				<span>
					<span className="text-gray-400 font-normal">Network Level:</span> {calcHypixelLevel(response.stats.networkExp)}
				</span>
				<span title={timeAgo(response.stats.firstLogin / 1000)}>
					<span className="text-gray-400 font-normal">First Login:</span>{" "}
					{formatTimestampToVerboseDate(response.stats.firstLogin)}
				</span>
				<span title={response.stats.lastLogin ? formatTimestampToVerboseDate(response.stats.lastLogin) : undefined}>
					<span className="text-gray-400 font-normal">Last Login:</span>{" "}
					{response.stats.lastLogin ? timeAgo(response.stats.lastLogin / 1000) : "Unknown"}
				</span>
				<span>
					<span className="text-gray-400 font-normal">AP:</span> {(response.stats.achievementPoints ?? 0).toLocaleString()}
				</span>
				<span>
					<span className="text-gray-400 font-normal">Karma:</span> {response.stats.karma.toLocaleString()}
				</span>
			</div>
		</>
	);
};

export default PlayerExtraInfo;
