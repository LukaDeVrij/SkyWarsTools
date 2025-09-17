"use client";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import HelpCard from "../components/HelpCard";

export default function AboutPage() {
	return (
		<div className="flex h-fit flex-col bg-main w-full rounded-xl">
			<div className="w-full flex flex-col lg:flex-row items-center justify-between h-fit p-5 lg:p-8 gap-2">
				<div className="flex flex-col gap-3 lg:gap-5 w-3/4">
					<h1 className="text-5xl font-semibold text-center lg:text-left ">About</h1>
					<p className="font-semibold text-center lg:text-left text-lg">
						Find out about the technical details and general usage of SkyWarsTools, its contributors, and how you can help!
					</p>
				</div>
				<Image className={"hidden lg:block"} src={"/title_750.png"} alt={"SkyWarsTools title logo"} width={200} height={60}></Image>
			</div>

			<div className="flex flex-col gap-4">
				<div className="rounded-lg px-4 lg:px-8">
					<h2 className="text-2xl font-bold mb-1">Help</h2>
					<div className="flex flex-col lg:flex-row gap-4 justify-between">
						<HelpCard title="Snapshots">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique odio at quis iste dolorem quibusdam, quod
							impedit! Commodi, tenetur? Tempore cum perspiciatis saepe distinctio voluptatibus cumque quis expedita magnam
							quibusdam!
						</HelpCard>
						<HelpCard title="Compare & Session">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique odio at quis iste dolorem quibusdam, quod
							impedit! Commodi, tenetur? Tempore cum perspiciatis saepe distinctio voluptatibus cumque quis expedita magnam
							quibusdam!
						</HelpCard>
						<HelpCard title="Leaderboards">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique odio at quis iste dolorem quibusdam, quod
							impedit! Commodi, tenetur? Tempore cum perspiciatis saepe distinctio voluptatibus cumque quis expedita magnam
							quibusdam!
						</HelpCard>
					</div>
				</div>
				<div className="rounded-lg px-4 lg:px-8">
					<h2 className="text-2xl font-bold mb-1">FAQ</h2>
				</div>
				<div className="rounded-lg px-4 lg:px-8">
					<h2 className="text-2xl font-bold mb-1">Contact</h2>
					<div className="flex flex-row gap-4 mt-2">
						<a
							href="mailto:lukatools@zohomail.eu"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-content rounded-lg shadow-md flex items-center justify-center w-16 h-16 cursor-pointer animate-press transition"
						>
							<Tooltip title="Email">
								<span>
									<Image src="/icons/email.png" alt="Email" width={32} height={32} />
								</span>
							</Tooltip>
						</a>
						<a
							href="https://discord.gg/yourdiscord"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-content rounded-lg shadow-md flex items-center justify-center w-16 h-16 cursor-pointer animate-press transition"
						>
							<Tooltip title="Discord">
								<span>
									<Image src="/icons/discord.png" alt="Discord" width={32} height={32} />
								</span>
							</Tooltip>
						</a>
						<a
							href="https://github.com/LifelessNerd/SkyWarsTools"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-content rounded-lg shadow-md flex items-center justify-center w-16 h-16 cursor-pointer animate-press transition"
						>
							<Tooltip title="GitHub">
								<span>
									<Image src="/icons/github.png" alt="GitHub" width={32} height={32} />
								</span>
							</Tooltip>
						</a>
						<a
							href="https://twitter.com/yourtwitter"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-content rounded-lg shadow-md flex items-center justify-center w-16 h-16 cursor-pointer animate-press transition"
						>
							<Tooltip title="Twitter">
								<span>
									<Image src="/icons/twitter.png" alt="Twitter" width={32} height={32} />
								</span>
							</Tooltip>
						</a>
						<a
							href="https://patreon.com/yourpatreon"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-content rounded-lg shadow-md flex items-center justify-center w-16 h-16 cursor-pointer animate-press transition"
						>
							<Tooltip title="Patreon">
								<span>
									<Image src="/icons/patreon.png" alt="Patreon" width={32} height={32} />
								</span>
							</Tooltip>
						</a>
					</div>
				</div>
				<div className="rounded-lg px-4 lg:px-8 w-full flex flex-col mb-5">
					<h2 className="text-2xl font-bold">Contributors</h2>
					<span className="font-semibold mb-1">Special thanks to these people for contributing to the project!</span>
					<div className="flex flex-col">
						<span>LifelessNerd</span>
						<span>Forums_</span>
						<span>abald</span>
					</div>
				</div>
			</div>
		</div>
	);
}
