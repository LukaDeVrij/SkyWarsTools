import { getKitPrestigeInfo, KitPrestigeInfo } from "@/app/utils/Utils";
import React from "react";

interface KitPrestigeStringProps {
	kit?: string;
	kitStats: Record<string, number | null>;
}

const KitPrestigeString: React.FC<KitPrestigeStringProps> = ({ kit, kitStats }) => {
	const xp: number = kitStats["xp_" + kit] || 0;

	let prestige: KitPrestigeInfo = getKitPrestigeInfo(xp);

	return (
		<span style={{ color: prestige.color }}>
			({prestige.name})
		</span>
	);
};

export default KitPrestigeString;
