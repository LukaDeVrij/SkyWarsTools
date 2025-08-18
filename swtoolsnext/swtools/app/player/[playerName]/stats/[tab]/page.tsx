import { notFound } from "next/navigation";
import Table from "@/app/components/player/tabs/Table";
import Extended from "@/app/components/player/tabs/Extended";
import Prestige from "@/app/components/player/tabs/Prestige";

const tabs = [
	{ label: "Table", value: "table" },
	{ label: "Extended", value: "extended" },
	{ label: "Prestige", value: "prestige" },
	{ label: "Descent", value: "descent" },
	{ label: "Playtime", value: "playtime" },
	{ label: "Kits", value: "kits" },
	{ label: "Legacy", value: "legacy" },
];

interface PageProps {
	params: Promise<{ playerName: string; tab: string }>;
}

export default async function PlayerStatsTabPage({ params }: PageProps) {
	const awaitedParams = await params;
	const { playerName, tab } = awaitedParams;
	const currentTab = tabs.find((t) => t.value === tab);
	if (!currentTab) {
		notFound();
	}

	const res = await fetch(`https://skywarstools.com/api/overall?player=${encodeURIComponent(playerName)}`);
	if (!res.ok) {
		console.log(res.statusText);
		throw new Error("Failed to fetch player data");
	}
	const overallData = await res.json();
	// console.log(overallData);

	return (
		<>
			{currentTab.value === "table" && <Table stats={overallData.stats}></Table>}
			{currentTab.value === "extended" && (
				<Extended extendedStats={overallData.extendedStats} stats={overallData.stats}></Extended>
			)}
			{currentTab.value === "prestige" && (
				<Prestige
					display={overallData.generic.display}
					stats={overallData.stats}
					player={overallData.player}
				></Prestige>
			)}
			{currentTab.value === "descent" && <div>Descent stats for {playerName}</div>}
			{currentTab.value === "playtime" && <div>Playtime stats for {playerName}</div>}
			{currentTab.value === "kits" && <div>Kits stats for {playerName}</div>}
			{currentTab.value === "legacy" && <div>Legacy stats for {playerName}</div>}
		</>
	);
}
