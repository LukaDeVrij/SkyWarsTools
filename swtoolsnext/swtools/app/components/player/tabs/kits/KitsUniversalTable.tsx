import { KitStats } from "@/app/types/KitStats";
import { OverallResponse } from "@/app/types/OverallResponse";
import { parseKitStatsKey } from "@/app/utils/Utils";
import React from "react";

interface KitsUniversalTableProps {
	kitData: { [key: string]: OverallResponse["stats"][keyof OverallResponse["stats"]] };
}

const KitsUniversalTable: React.FC<KitsUniversalTableProps> = ({ kitData }) => {
	const kitStats: { [key: string]: KitStats } = {};

	Object.keys(kitData).forEach((key) => {
		const kit = parseKitStatsKey(key); //TODO throws cuz this function fucking sucks and is used on stuopid variations

		// Initialize the object if it doesn't exist
		if (!kitStats[kit.kit]) {
			kitStats[kit.kit] = {
				wins: 0,
				losses: 0,
				kills: 0,
				deaths: 0,
				xp: 0,
			};
		}
		if (key.endsWith("_wins")) {
			kitStats[kit.kit].wins = (kitData[key] as number) ?? 0;
		} else if (key.startsWith("losses_")) {
			kitStats[kit.kit].losses = (kitData[key] as number) ?? 0;
		} else if (key.startsWith("kills_")) {
			kitStats[kit.kit].kills = (kitData[key] as number) ?? 0;
		} else if (key.startsWith("deaths_")) {
			kitStats[kit.kit].deaths = (kitData[key] as number) ?? 0;
		} else if (key.startsWith("xp_")) {
			kitStats[kit.kit].xp = (kitData[key] as number) ?? 0;
		}
	});
	console.log(kitStats);

	return <div>{}</div>;
};

export default KitsUniversalTable;
