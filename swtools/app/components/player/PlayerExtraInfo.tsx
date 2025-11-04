import React from "react";
import Image from "next/image";
import { calcHypixelLevel, timeAgo, formatTimestampToVerboseDate, toCamelCase } from "@/app/utils/Utils"; // Assuming you have a utility function for this
import { NextSave, OverallResponse } from "@/app/types/OverallResponse";
import { Tooltip } from "@mui/material";
import { Clock, CloudCheck } from "lucide-react";
import SnapshotCooldown from "./SnapshotCooldown";

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
	INSTAGRAM: "",
	TIKTOK: "https://www.tiktok.com/@",
	TWITCH: "",
	DISCORD: "/discord/",
	HYPIXEL: "",
};

const PlayerExtraInfo: React.FC<PlayerExtraInfoProps> = async ({ response }) => {
	const links = response.stats.socialMedia?.links;

	const nextSave: NextSave = response.nextSave;
	const saveTime = new Date(nextSave.lastSaved);

	let savedTheseStats = false;
	let nextSaveTime;
	if (new Date().getTime() - saveTime.getTime() < 5 * 60 * 1000) {
		savedTheseStats = true;
	} else {
		savedTheseStats = false;
		nextSaveTime = new Date(saveTime.getTime() + 16 * 60 * 60 * 1000);
	}
	// console.log(savedTheseStats);
	return (
		<>
			<div className="bg-content p-4 px-6 font-bold flex gap-4 flex-row items-center">
				{links && Object.entries(links).length > 0 ? (
					<>
						{Object.entries(links).map(([social]) => {
							const socialKey = social as keyof typeof links;
							const iconPath = socials[socialKey];
							if (!iconPath) return null;


							let finalSocialLink = linkPrefixes[socialKey] + links[socialKey];
							if (!finalSocialLink.startsWith("http") && !finalSocialLink.startsWith("/")) {
								finalSocialLink = "https://" + finalSocialLink;
							}

							return (
								<a key={social} href={finalSocialLink} target="_blank" rel="noopener noreferrer" title={toCamelCase(socialKey)}>
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
				{savedTheseStats ? (
					<Tooltip className="ml-auto text-green-500" title="A snapshot of these main stats has been saved!">
						<CloudCheck />
					</Tooltip>
				) : null}
				{savedTheseStats == false ? (
					<SnapshotCooldown saveTime={saveTime} nextSaveTime={nextSaveTime!} />
				) : null}
			</div>
			<div className="w-full bg-content p-4 justify-around font-bold hidden lg:flex flex-nowrap">
				<span>
					<span className="text-gray-400 font-normal">Network Level:</span> {calcHypixelLevel(response.stats.networkExp)}
				</span>
				<span>
					<span className="text-gray-400 font-normal">First Login:</span>{" "}
					<Tooltip title={timeAgo(response.stats.firstLogin / 1000)}>
						<span>{formatTimestampToVerboseDate(response.stats.firstLogin)}</span>
					</Tooltip>
				</span>
				<span>
					<span className="text-gray-400 font-normal">Last Login:</span>{" "}
					<Tooltip title={response.stats.lastLogin ? formatTimestampToVerboseDate(response.stats.lastLogin) : undefined}>
						<span>{response.stats.lastLogin ? timeAgo(response.stats.lastLogin / 1000) : "Unknown"}</span>
					</Tooltip>
				</span>
				<span>
					<span className="text-gray-400 font-normal">AP:</span> {(response.stats.achievementPoints ?? 0).toLocaleString()}
				</span>
				<span>
					<span className="text-gray-400 font-normal">Karma:</span> {(response.stats.karma ?? 0).toLocaleString()}
				</span>
			</div>
		</>
	);
};

export default PlayerExtraInfo;
