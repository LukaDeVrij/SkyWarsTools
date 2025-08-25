import Title from "@/app/components/universal/Title";
import React from "react";

const SoulUpgrades: React.FC<{ response: APIResponse }> = ({ response }) => {
	return (
		<div className="w-full h-auto bg-content rounded-2xl py-3 px-4 flex flex-col justify-center gap-2 font-semibold items-center">
			<Title color="text-blue-400">Angel&apos;s Descent Soul Upgrades</Title>
			<table className="text-lg w-full">
				<tbody>
					<tr>
						<td>Grand Slam</td>
						<td className={`pr-4 ${response.descentStats.grand_slam == 3 ? "text-green-600" : ""}`}>
							{response.descentStats.grand_slam}/3
						</td>
						<td>+{2 * (response.descentStats.grand_slam ?? 0)}</td>
					</tr>
					<tr>
						<td>Soul Seeker</td>
						<td className={`pr-4 ${response.descentStats.shard_seeker == 5 ? "text-green-600" : ""}`}>
							{response.descentStats.shard_seeker}/5
						</td>
						<td>+{2 * (response.descentStats.shard_seeker ?? 0)}%</td>
					</tr>
					<tr>
						<td>Xezbeth Luck</td>
						<td className={`pr-4 ${response.descentStats.xezbeth_luck == 2 ? "text-green-600" : ""}`}>
							{(response.descentStats.xezbeth_luck ?? 0) + 1}/3
						</td>
						<td>+{(response.descentStats.xezbeth_luck ?? 0) + 1}</td>
					</tr>
					<tr>
						<td>Harvesting Season</td>
						<td className={`pr-4 ${response.descentStats.harvesting_season == 4 ? "text-green-600" : ""}`}>
							{(response.descentStats.harvesting_season ?? 0) + 1}/5
						</td>
						<td>{((response.descentStats.harvesting_season ?? 0) + 1) * 2}%</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default SoulUpgrades;
