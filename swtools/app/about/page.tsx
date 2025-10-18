"use client";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import HelpCard from "../components/HelpCard";
import { Mail } from "lucide-react";
import Link from "next/link";
import Contributors from "../components/start/Contributors";

export default function AboutPage() {
	return (
		<div className="flex h-fit flex-col bg-main w-full rounded-xl">
			<div className="w-full flex flex-col lg:flex-row items-center justify-between h-fit p-5 lg:p-8 gap-2">
				<div className="flex flex-col gap-3 lg:gap-5 w-3/4">
					<h1 className="text-5xl font-semibold text-center lg:text-left ">About</h1>
					<p className="font-semibold text-center lg:text-left text-lg">
						Commonly asked questions, help with general usage and contact information.
					</p>
				</div>
				<Image className={"hidden lg:block"} src={"/title.png"} alt={"SkyWarsTools title logo"} width={300} height={60}></Image>
			</div>

			<div className="flex flex-col gap-4">
				<div className="rounded-lg px-4 lg:px-8">
					<div className="flex flex-row gap-2 justify-center lg:justify-between flex-wrap">
						<HelpCard title="Snapshots">
							SkyWarsTools uses snapshots. Every time a player is searched for, a snapshot of their stats is saved. This
							allows us to track progress over time, and display graphs. Snapshots are taken at most once every 16 hours per
							player to reduce load on the Hypixel API.
						</HelpCard>
						<HelpCard title="Compare & Session">
							Use these snapshots to compare, or to see how you did in a single session between two snapshots. This works best
							by looking up your stats at the start of a session, and then creating a session using that snapshot and your
							most recent stats.
						</HelpCard>
						<HelpCard title="Leaderboards">
							Infinite leaderboards are generated using the snapshots. Only players who have been searched for are included,
							so the more people use the site, the better the leaderboards will be! The Level leaderboard is updated
							automatically every 24 hours, others are generated on command, and cached.
						</HelpCard>
						<HelpCard title="Calculate">
							You can use snapshots to calculate your progress over time, and predict when you will reach a certain goal.
						</HelpCard>
						<HelpCard title="Tools">Various other tools, non-specific to players, are available in the Tools section!</HelpCard>
						<HelpCard title="Other Questions?">
							Have more questions, a feature request, or found a bug? Contact me using the links below, or join the{" "}
							<Link href="/discord" className="underline">
								Discord server
							</Link>
							!
						</HelpCard>
					</div>
				</div>
				<div className="rounded-lg px-4 lg:px-8">
					<h2 className="text-2xl font-bold mb-1">Contact</h2>
					<div className="flex flex-row gap-4 mt-2 overflow-x-auto">
						<div className="flex flex-row gap-2 lg:gap-4 min-w-max">
							<a
								href="/discord"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-content rounded-lg shadow-md flex items-center justify-center w-16 h-16 cursor-pointer animate-press transition aspect-square"
							>
								<Tooltip title="Discord">
									<span>
										<Image src="/icons/discord.png" alt="Discord" width={42} height={42} />
									</span>
								</Tooltip>
							</a>
							<a
								href="/patreon"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-content rounded-lg shadow-md flex items-center justify-center w-16 h-16 cursor-pointer animate-press transition aspect-square"
							>
								<Tooltip title="Patreon">
									<span>
										<Image src="/icons/patreon.png" alt="Patreon" width={42} height={42} />
									</span>
								</Tooltip>
							</a>
							<a
								href="https://twitter.com/NerdLifeless"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-content rounded-lg shadow-md flex items-center justify-center w-16 h-16 cursor-pointer animate-press transition aspect-square"
							>
								<Tooltip title="Twitter">
									<span>
										<Image src="/icons/twitter.png" alt="Twitter" width={42} height={42} />
									</span>
								</Tooltip>
							</a>
							<a
								href="https://github.com/LukaDeVrij/SkyWarsTools"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-content rounded-lg shadow-md flex items-center justify-center w-16 h-16 cursor-pointer animate-press transition aspect-square"
							>
								<Tooltip title="GitHub">
									<span>
										<Image src="/icons/github.png" alt="GitHub" width={42} height={42} />
									</span>
								</Tooltip>
							</a>
							<a
								href="mailto:lukatools@zohomail.eu"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-content rounded-lg shadow-md flex items-center justify-center w-16 h-16 cursor-pointer animate-press transition aspect-square"
							>
								<Tooltip title="Email">
									<span>
										<Mail width={42} height={42}></Mail>
									</span>
								</Tooltip>
							</a>
						</div>
					</div>
				</div>
				<Contributors></Contributors>
			</div>
		</div>
	);
}
