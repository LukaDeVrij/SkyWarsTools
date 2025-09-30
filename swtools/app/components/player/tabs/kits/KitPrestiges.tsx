import React from "react";
import KitPrestigeCard from "./KitPrestigeCard";
import { getKitPrestigeInfo, getKitPrestigeInfoByPrestige, KitPrestigeInfo } from "@/app/utils/Utils";
import { KitStats } from "@/app/types/KitStats";

const KitPrestiges: React.FC< Record<string, number|undefined>> = (stats) => {

	// Extract kit names - every kit should have time_played, if not theres no stats anyway
	const kitNames = Object.keys(stats)
		.filter((key) => key.startsWith("time_played_kit_"))
		.map((key) => key.replace(/^time_played_/, ""));
		

	const [search, setSearch] = React.useState("");
	const [order, setOrder] = React.useState<"xp" | "prestige" | "opal">("xp");

	const filteredKitNames = kitNames.filter((kit) => kit.toLowerCase().includes(search.toLowerCase()));
	// const filteredKitNames = ["kit_mythical_end-lord"]
	// TODO add search by mode properly (with 3rd party lib? this is what i did in the old site)

	function closestPrestige(xp: number, nextPrestige: KitPrestigeInfo): number {
		if (nextPrestige.minXp === 0) return -1;
		return (xp / nextPrestige.minXp) % 1;
	}
	function closestToOpal(xp: number, nextPrestige: KitPrestigeInfo): number {
		if (nextPrestige.minXp === 0) return -1;
		if (nextPrestige.key < 5) return -1;
		return (xp / nextPrestige.minXp) % 1;

	}

	return (
		<div className="min-h-160">
			<div className="flex flex-row lg:justify-between gap-4 items-center mb-4">
				<input
					type="text"
					placeholder="Search kits..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-2/5 lg:w-[200px] bg-layer rounded-xl h-12 p-3 "
				/>
				<select
					id="kitPrestigeSortMode"
					title="Sort by"
					className="w-3/5 lg:w-[200px] rounded-xl bg-layer p-3  h-12"
					onChange={(e) => setOrder(e.target.value as "xp" | "prestige" | "opal")}
				>
					<option value="xp">Highest EXP</option>
					<option value="prestige">Highest %</option>
					<option value="opal">Closest Opal</option>
				</select>
			</div>
			<div className="flex flex-wrap gap-2 lg:gap-3 justify-center">
				{filteredKitNames
					.map((kit) => {
						// console.log(kit);
						const kitStats: KitStats = {
							wins:
								typeof stats[`wins_${kit}` as keyof typeof stats] === "number"
									? (stats[`wins_${kit}` as keyof typeof stats] as number)
									: 0,
							kills:
								typeof stats[`kills_${kit}` as keyof typeof stats] === "number"
									? (stats[`kills_${kit}` as keyof typeof stats] as number)
									: 0,
							timePlayed:
								typeof stats[`time_played_${kit}` as keyof typeof stats] === "number"
									? (stats[`time_played_${kit}` as keyof typeof stats] as number)
									: 0,
							xp:
								typeof stats[`xp_${kit}` as keyof typeof stats] === "number"
									? (stats[`xp_${kit}` as keyof typeof stats] as number)
									: 0,
						};

						const currentPrestige: KitPrestigeInfo = getKitPrestigeInfo(kitStats.xp ?? 0);
						const nextPrestige: KitPrestigeInfo = getKitPrestigeInfoByPrestige(currentPrestige.key + 1);

						return { kit, kitStats, currentPrestige, nextPrestige };
					})
					.sort((a, b) => {
						if (order === "xp") {
							return (b.kitStats.xp ?? 0) - (a.kitStats.xp ?? 0);
						} else if (order === "prestige") {
							const prestigeA = closestPrestige(a.kitStats.xp ?? 0, a.nextPrestige);
							const prestigeB = closestPrestige(b.kitStats.xp ?? 0, b.nextPrestige);
							return prestigeB - prestigeA;
						} else {
							const prestigeA = closestToOpal(a.kitStats.xp ?? 0, a.nextPrestige);
							const prestigeB = closestToOpal(b.kitStats.xp ?? 0, b.nextPrestige);
							return prestigeB - prestigeA;
						}

					})
					.map(({ kit, kitStats, currentPrestige, nextPrestige }) => (
						<KitPrestigeCard
							key={kit}
							kitName={kit}
							stats={kitStats}
							currentPrestige={currentPrestige}
							nextPrestige={nextPrestige}
						/>
					))}
			</div>
		</div>
	);
};

export default KitPrestiges;
