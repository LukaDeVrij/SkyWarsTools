import { OverallResponse } from "@/app/types/OverallResponse";
import React from "react";
import KitPrestigeCard from "./KitPrestigeCard";
import { getKitPrestigeInfo, getKitPrestigeInfoByPrestige, KitPrestigeInfo } from "@/app/utils/Utils";

type KitStats = {
	wins?: number;
	losses?: number;
	kills?: number;
	deaths?: number;
	timePlayed?: number;
	xp?: number;
};

const KitPrestiges: React.FC<OverallResponse> = (response) => {
	const { stats } = response;

	// Extract kit names - every kit should have time_played, if not theres no stats anyway
	const kitNames = Object.keys(stats)
		.filter((key) => key.startsWith("time_played_kit_"))
		.map((key) => key.replace(/^time_played_/, ""));

	const [search, setSearch] = React.useState("");
	const [order, setOrder] = React.useState<"xp" | "prestige">("xp");

	const filteredKitNames = kitNames.filter((kit) => kit.toLowerCase().includes(search.toLowerCase()));

	function closestPrestige(xp: number, nextPrestige: KitPrestigeInfo): number {
		return (xp / nextPrestige.minXp) % 1;
	}

	return (
		<div className="min-h-160">
			<div className="flex flex-col lg:flex-row lg:justify-between gap-4 items-center mb-4">
				<input
					type="text"
					placeholder="Search kits..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="bg-layer rounded-xl h-12 p-3"
				/>
                <p className="text-center"></p>
				<select
					id="kitPrestigeSortMode"
					title="Sort by"
					className="w-200px rounded-xl bg-layer p-3  h-12"
					onChange={(e) => setOrder(e.target.value as "xp" | "prestige")}
				>
					<option value="xp">Highest EXP</option>
					<option value="prestige">Highest %</option>
				</select>
                
			</div>
			<div className="flex flex-wrap gap-2 lg:gap-3 justify-center lg:justify-start">
				{filteredKitNames
					.map((kit) => {
						const kitStats: KitStats = {
							wins:
								typeof stats[`wins_${kit}` as keyof typeof stats] === "number"
									? (stats[`wins_${kit}` as keyof typeof stats] as number)
									: Number(stats[`wins_${kit}` as keyof typeof stats]),
							losses:
								typeof stats[`losses_${kit}` as keyof typeof stats] === "number"
									? (stats[`losses_${kit}` as keyof typeof stats] as number)
									: Number(stats[`losses_${kit}` as keyof typeof stats]),
							kills:
								typeof stats[`kills_${kit}` as keyof typeof stats] === "number"
									? (stats[`kills_${kit}` as keyof typeof stats] as number)
									: Number(stats[`kills_${kit}` as keyof typeof stats]),
							deaths:
								typeof stats[`deaths_${kit}` as keyof typeof stats] === "number"
									? (stats[`deaths_${kit}` as keyof typeof stats] as number)
									: Number(stats[`deaths_${kit}` as keyof typeof stats]),
							timePlayed:
								typeof stats[`time_played_${kit}` as keyof typeof stats] === "number"
									? (stats[`time_played_${kit}` as keyof typeof stats] as number)
									: Number(stats[`time_played_${kit}` as keyof typeof stats]),
							xp:
								typeof stats[`xp_${kit}` as keyof typeof stats] === "number"
									? (stats[`xp_${kit}` as keyof typeof stats] as number)
									: Number(stats[`xp_${kit}` as keyof typeof stats]),
						};

						const currentPrestige: KitPrestigeInfo = getKitPrestigeInfo(kitStats.xp ?? 0);
						const nextPrestige: KitPrestigeInfo = getKitPrestigeInfoByPrestige(currentPrestige.key + 1);

						return { kit, kitStats, currentPrestige, nextPrestige };
					})
					.sort((a, b) => {
						if (order === "xp") {
							return (b.kitStats.xp ?? 0) - (a.kitStats.xp ?? 0);
						} else {
							// prestige order
							const prestigeA = closestPrestige(a.kitStats.xp ?? 0, a.nextPrestige);
							const prestigeB = closestPrestige(b.kitStats.xp ?? 0, b.nextPrestige);
							// console.log(prestigeA, prestigeB);
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
