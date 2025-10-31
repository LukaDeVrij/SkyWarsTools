"use client";
import Image from "next/image";
import FreqPlayerList from "./components/start/FreqPlayerList";
import PatreonPlayerList from "./components/start/PatreonPlayerList";
import { Tooltip } from "@mui/material";
import { CircleQuestionMark } from "lucide-react";
import Link from "next/link";
import Contributors from "./components/start/Contributors";
import Head from "next/head";

export default function Home() {
	return (
		<div className="flex h-fit flex-col bg-main w-full rounded-xl">
			<Head>
				<title>SkyWarsTools</title>
			</Head>
			<div className="w-full flex flex-col lg:flex-row items-center justify-between h-fit p-5 lg:p-8 gap-2">
				<div className="flex flex-col gap-3 lg:gap-5 w-3/4">
					<h1 className="text-5xl font-semibold text-center lg:text-left ">Welcome</h1>
					<p className="font-semibold text-center lg:text-left text-lg">
						SkyWarsTools has standard features such as player stats and information, along with snapshots, which allow for
						session tracking, leaderboards and more! <span className="text-red-400">Currently in development.</span>
					</p>
				</div>
				<Image className={"hidden lg:block"} src={"/title.png"} alt={"SkyWarsTools title logo"} width={300} height={60}></Image>
			</div>

			<div className="flex flex-col gap-4">
				<div className="rounded-lg px-4 lg:px-8 font-semibold flex flex-col lg:flex-row gap-2 lg:gap-4 ">
					<Link
						href="/patreon"
						className="w-full lg:w-[50%] h-20 bg-content rounded-xl p-3 lg:text-lg flex-row gap-2 justify-between items-center flex animate-press"
						target="_blank"
						rel="noopener noreferrer"
					>
						<p className="w-[80%]">Support the project on Patreon and get special perks!</p>
						<Image src="/icons/patreon.png" alt="Patreon" width={50} height={50} />
					</Link>
					<Link
						href="/discord"
						className="w-full lg:w-[50%] h-20 bg-content rounded-xl p-3 lg:text-lg flex-row gap-2 justify-between items-center flex animate-press"
						target="_blank"
						rel="noopener noreferrer"
					>
						<p className="w-[80%]">Feature ideas? Bugs or problems found? Join the Discord!</p>
						<Image src="/icons/discord.png" alt="Patreon" width={50} height={50} />
					</Link>
				</div>
				<div className="rounded-lg px-4 lg:px-8">
					<h2 className="text-2xl font-bold mb-1 flex flex-row gap-4">
						Supporters
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
				<Contributors></Contributors>
				<span className="px-4 lg:px-8 py-2 text-gray-500 font-bold">This website is not affiliated, connected to or run by Hypixel, Mojang or Microsoft.</span>
			</div>
		</div>
	);
}
