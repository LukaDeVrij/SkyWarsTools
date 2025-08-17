import React from "react";
import twemoji from "@twemoji/api";
import Image from "next/image";
import MinecraftText from "../MinecraftText";

interface PlayerTitleProps {
	playerName: string;
	data: any;
}

const PlayerTitle: React.FC<PlayerTitleProps> = ({ playerName, data }) => {
	console.log(data); // Log the data to see what it contains

	return (
		<div className="bg-gray-900 h-22 lg:h-25 w-full flex items-center">
			<Image
				alt="player avatar"
				width={100}
				height={100}
				className="rounded h-20 w-20 lg:h-28 lg:w-28 mb-6 lg:mb-12 mx-2 lg:mx-4 z-10 hidden lg:inline"
				src={`https://www.mc-heads.net/avatar/${playerName}`}
			/>
			<div className="w-full lg:h-22 text-3xl lg:text-4xl flex flex-col justify-center px-3 text-center lg:text-left">
				<MinecraftText>&d[999o...0] &6[MVP&c++&6] QQQQQQQQQQQQQQQQ</MinecraftText> {/* line 1*/}
				<div className="text-xl font-montserrat justify-between lg:flex">
					<div className="flex items-center gap-2 text-sm lg:text-lg">
						{/* <span className="text-2xl">🇳🇱</span> */}
						<span className="font-semibold hidden lg:inline">
							{data.generic.stats.guild} ({data.generic.stats.guildRank})
						</span>
					</div>

					<div className="hidden lg:flex items-center gap-2 mx-4">
                        <a
							href={`https://namemc.com/profile/${playerName}`}
							target="_blank"
							rel="noopener noreferrer"
							className="animate-press"
							style={{ display: "flex" }}
                            title="View on NameMC"
						>
							<Image src="/namemc.png" alt="NameMC logo" width={32} height={32} className="inline h-6 w-6" />
						</a>
						<a
							href={`https://www.shmeado.club/player/stats/${playerName}/SkyWars/Table/`}
							target="_blank"
							rel="noopener noreferrer"
							className="inline h-6 w-6 animate-press"
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
							className="animate-press"
							style={{ display: "flex" }}
                            title="View on Plancke"
						>
							<Image src="/plancke.png" alt="Plancke logo" width={32} height={32} className="inline h-6 w-6" />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlayerTitle;
