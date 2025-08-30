import { OverallResponse } from "@/app/types/OverallResponse";
import { getKitPrestigeInfo, KitPrestigeInfo } from "@/app/utils/Utils";
import React from "react";

interface KitPrestigeStringProps {
	kit?: string;
	response: OverallResponse;
}

const KitPrestigeString: React.FC<KitPrestigeStringProps> = ({ kit, response }) => {
	// console.log(response)
	const indexer = ("xp_" + kit) as keyof OverallResponse["stats"];
	const xp: number = (response.stats[indexer] || 0) as number; // sorry ts

	const prestige: KitPrestigeInfo = getKitPrestigeInfo(xp);

	return <span style={{ color: prestige.color }}>({prestige.name})</span>;
};

export default KitPrestigeString;
