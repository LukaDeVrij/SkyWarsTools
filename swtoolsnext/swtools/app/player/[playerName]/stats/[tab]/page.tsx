import { notFound } from "next/navigation";
import Table from "@/app/components/player/tabs/Table";
import Extended from "@/app/components/player/tabs/Extended";
import Prestige from "@/app/components/player/tabs/Prestige";
import GrimReaper from "@/app/components/player/tabs/GrimReaper";
import Playtime from "@/app/components/player/tabs/Playtime";
import Legacy from "@/app/components/player/tabs/Legacy";

const tabs = [
	{ label: "Table", value: "table" },
	{ label: "Extended", value: "extended" },
	{ label: "Prestige", value: "prestige" },
	{ label: "Grim Reaper", value: "grimreaper" },
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

	const res = await fetch(`https://skywarstools.com/api/overall?player=${encodeURIComponent(playerName)}`, {
		next: { revalidate: 300 },
	});
	if (!res.ok) {
		console.log(res.statusText);
		throw new Error("Failed to fetch player data");
	}
	const overallData: APIResponse = await res.json();

	return (
		<>
			{currentTab.value === "table" && <Table {...overallData} />}
			{currentTab.value === "extended" && <Extended {...overallData} />}
			{currentTab.value === "prestige" && <Prestige {...overallData} />}
			{currentTab.value === "grimreaper" && <GrimReaper {...overallData} />}
			{currentTab.value === "playtime" && <Playtime {...overallData} />}
			{currentTab.value === "kits" && <div>Kits stats for {playerName}</div>}
			{currentTab.value === "legacy" && <Legacy {...overallData}></Legacy>}
		</>
	);
}
