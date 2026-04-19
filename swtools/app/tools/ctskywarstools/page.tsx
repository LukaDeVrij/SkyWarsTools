import React from "react";
import FeatureCard from "./FeatureCard";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import CTSkyWarsToolsDownload from "./CTSkyWarsToolsDownload";

const CTSkyWarsToolsPage = () => {
	return (
		<div className="flex flex-col p-4 ">
			<h1 className="text-4xl font-bold text-center my-2">CTSkyWarsTools</h1>
			<span className="font-semibold text-center mb-2 px-3">
				A ChatTrigger with various tools that come in handy when playing SkyWars
			</span>

			<div className="flex gap-6 items-center justify-center">
				<div className="flex gap-6 items-center">
					<a
						href="https://github.com/LukaDeVrij/CTSkyWarsTools"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-content rounded-lg shadow-md flex items-center justify-center w-16 h-16 cursor-pointer animate-press transition aspect-square"
					>
						<Tooltip title="See source code on GitHub">
							<span>
								<Image src="/icons/github.png" alt="GitHub" width={42} height={42} />
							</span>
						</Tooltip>
					</a>
				</div>
				<div className="flex gap-6 items-center">
					<a
						href="https://www.youtube.com/watch?v=VAkqIGy7jlc"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-content rounded-lg shadow-md flex items-center justify-center w-16 h-16 cursor-pointer animate-press transition aspect-square"
					>
						<Tooltip title="YouTube video showcase">
							<span>
								<Image src="/icons/youtube.png" alt="YouTube" width={42} height={42} />
							</span>
						</Tooltip>
					</a>
				</div>
			</div>
			<CTSkyWarsToolsDownload />
			<div className="w-full overflow-x-auto rounded-xl py-4 lg:p-8">
				<div className="flex flex-col gap-5">
					<FeatureCard
						cardOnLeft={false}
						size="small"
						title="EXP Display"
						imageSrc="/CT_3.png"
						imageAlt="Experience This Game display"
						insideText="Default experience display"
						outsideText="Can't be bothered to stay in the game to check your EXP for that game? CTSkyWarsTools can display your EXP for the current game wherever you want, so you can easily check it whenever you want."
					/>
					<FeatureCard
						cardOnLeft={true}
						size="small"
						title="Autododge"
						imageSrc="/CT_1.webp"
						imageAlt="Autododge example"
						insideText="Autododge in action"
						outsideText="Add maps you don't want to play to the blocklist, and CTSkyWarsTools will automatically dodge you from those maps. A sound plays, and you can sneak in order to cancel the dodge."
					/>
					<FeatureCard
						cardOnLeft={false}
						size="small"
						title="SkyWars Levels"
						imageSrc="/CT_4.webp"
						imageAlt="SkyWars levels example"
						insideText="SkyWars Levels in action"
						outsideText="Whenever you join a game, the level of all of the players in that game will be displayed next to their name in the tab list! Nicks do not work (of course), and it might take a bit for all the level to load."
					/>
					<FeatureCard
						cardOnLeft={true}
						size="small"
						title="Enhanced Who"
						imageSrc="/CT_5.jpg"
						imageAlt="Output of /who"
						insideText="Output of /who"
						outsideText="The /who command is enhanced to show the island relative to yours, from the perspective of mid. This can be wrong because Hypixel map builders sometimes build clockwise and sometimes counterclockwise, but it should be correct most of the time."
					/>
					<FeatureCard
						cardOnLeft={false}
						size="large"
						imageSrc="/CT_2.webp"
						imageAlt="Settings overview"
						insideText="CTSkyWarsTools Settings"
						outsideText="You can enable and disable the various submodules of CTSkyWarsTools in the settings menu, as well as customize some of the features to your liking."
					/>
				</div>
				<div className="flex gap-6 items-center justify-center mt-4">
					<div className="flex gap-6 items-center">
						<a
							href="/discord"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-content rounded-lg shadow-md flex items-center justify-center w-16 h-16 cursor-pointer animate-press transition aspect-square"
						>
							<Tooltip title="Discord">
								<span>
									<Image src="/icons/discord.png" alt="GitHub" width={42} height={42} />
								</span>
							</Tooltip>
						</a>
					</div>
					<span>Questions or trouble installing? Join the Discord!</span>
				</div>
			</div>
		</div>
	);
};

export default CTSkyWarsToolsPage;
