import React from "react";
import Image from "next/image";

interface PlayerExtraInfoProps {
	playerName: string;
	info: any; // Adjust type as needed based on the data structure
}

let socials = {
	twitter: "/icons/twitter.png",
	youtube: "/icons/youtube.png",
	instagram: "/icons/instagram.png",
	tiktok: "/icons/tiktok.png",
	twitch: "/icons/twitch.png",
	discord: "/icons/discord.png",
	hypixel: "/icons/hypixel.png",
};

const PlayerExtraInfo: React.FC<PlayerExtraInfoProps> = ({ info }) => {
	info.twitter = "https://twitter.com/NerdLifeless"; // Example data, replace with actual data from API
	info.youtube = "https://twitter.com/NerdLifeless";
	info.discord = "https://twitter.com/NerdLifeless";
	info.hypixel = "https://twitter.com/NerdLifeless";
	return (
		<>
			<div className="bg-gray-800 p-4 font-bold flex gap-4">
				{Object.entries(socials).map(([social, iconPath]) => {
					return (
						<a key={social}>
							<Image src={iconPath.startsWith('/') ? iconPath : `/${iconPath}`} alt={`${social} icon`} width={32} height={32} />
						</a>
					);
				})}
			</div>
			<div className="w-full h-30 bg-gray-800 p-4 font-bold">
                Overall Stats
            </div>
		</>
	);
};

export default PlayerExtraInfo;
