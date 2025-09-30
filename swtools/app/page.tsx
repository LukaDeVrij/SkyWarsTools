"use client";
import Image from "next/image";
import FreqPlayerList from "./components/start/FreqPlayerList";
import PatreonPlayerList from "./components/start/PatreonPlayerList";
import { Tooltip } from "@mui/material";
import { CircleQuestionMark } from "lucide-react";

export default function Home() {
	return (
		<div className="flex h-fit flex-col bg-main w-full rounded-xl">
			<div className="w-full flex flex-col lg:flex-row items-center justify-between h-fit p-5 lg:p-8 gap-2">
				<div className="flex flex-col gap-3 lg:gap-5 w-3/4">
					<h1 className="text-5xl font-semibold text-center lg:text-left ">Welcome</h1>
					<p className="font-semibold text-center lg:text-left text-lg">
						SkyWarsTools has standard features such as player stats and information, along with snapshots, which allow for
						session tracking, leaderboards and more!
					</p>
				</div>
				<Image className={"hidden lg:block"} src={"/title.png"} alt={"SkyWarsTools title logo"} width={300} height={60}></Image>
			</div>

			<div className="flex flex-col gap-4">
				<div className="rounded-lg px-4 lg:px-8">
					<h2 className="text-2xl font-bold mb-1">News</h2>
					<p className="font-semibold text-red-400">
						SkyWarsTools 2.0 is in active development. Some features might be incomplete, or not be present at all. Is a feature
						you used missing? Let me know on the{" "}
						<a href="/discord" className="underline">
							Discord server
						</a>
						!
					</p>
				</div>
				<div className="rounded-lg px-4 lg:px-8">
					<h2 className="text-2xl font-bold mb-1 flex flex-row gap-4">
						Patreon Supporters
						<Tooltip title="Subscribe to Patreon to get an emoji and a spot right here!">
							<CircleQuestionMark className="cursor-help" />
						</Tooltip>
					</h2>
					<PatreonPlayerList></PatreonPlayerList>
				</div>
				<div className="rounded-lg px-4 lg:px-8">
					<h2 className="text-2xl font-bold mb-1">Popular Players</h2>
					<FreqPlayerList></FreqPlayerList>
				</div>
				<div className="rounded-lg px-4 lg:px-8 w-full flex flex-col mb-5">
					<h2 className="text-2xl font-bold">Contributors</h2>
					<span className="font-semibold mb-1">Special thanks to these people for contributing to the project!</span>
					<div className="flex flex-col">
						<span>LifelessNerd</span>
						<span>Forums_</span>
						<span>SMED</span>
						<span>abald</span>
					</div>
				</div>
			</div>
		</div>
	);
}
