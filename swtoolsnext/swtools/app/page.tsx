"use client";
import Image from "next/image";
import FreqPlayerList from "./components/start/FreqPlayerList";
import PatreonPlayerList from "./components/start/PatreonPlayerList";
import HoverableSpan from "./components/universal/HoverableSpan";

export default function Home() {
	return (
		<div className="flex h-200 flex-col bg-main w-full rounded-xl">
			<div className="w-full flex flex-col lg:flex-row items-center justify-between h-fit p-5 lg:p-8 gap-2">
				<div className="flex flex-col gap-3 lg:gap-5 w-3/4">
					<h1 className="text-5xl font-semibold text-center lg:text-left ">Welcome</h1>
					<p className="font-semibold text-center lg:text-left text-lg">
						SkyWarsTools has standard features such as player stats and information, along with snapshots, which allow for
						session tracking, leaderboards and more!
					</p>
				</div>
				<Image className={"hidden lg:block"} src={"/title_750.png"} alt={"SkyWarsTools title logo"} width={200} height={60}></Image>
			</div>

			<div className="flex flex-col gap-4">
				<div className="rounded-lg px-4 lg:px-8">
					<h2 className="text-2xl font-bold mb-1">
						Patreon Supporters{" "}
						<HoverableSpan
							hoverText="Subscribe to Patreon to get a custom background, emoji and a spot right here!"
							className="text-sm mx-2"
						>
							Learn more
						</HoverableSpan>
					</h2>
					<PatreonPlayerList></PatreonPlayerList>
				</div>
				<div className="rounded-lg px-4 lg:px-8">
					<h2 className="text-2xl font-bold mb-1">Popular Players</h2>
					<FreqPlayerList></FreqPlayerList>
				</div>
			</div>

			<div className="">
				<h2>Contributors</h2>
			</div>
		</div>
	);
}
