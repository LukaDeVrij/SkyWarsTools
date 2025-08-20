import React from "react";
import { toCamelCase } from "@/app/utils/Utils";

const Extended: React.FC<APIResponse> = (response) => {
	function kitProcessing(value: string): string {
		const parts = value.split("_");
		return toCamelCase(parts[parts.length - 1]);
	}

	return (
		<div className="extended-table p-4 lg:p-6 w-full text-left bg-gray-800 font-bold font flex flex-col lg:flex-row lg:text-lg lg:justify-center">
			<table className="p-4 w-full lg:w-[65%] text-left bg-gray-800 ">
				<tbody>
					<tr className="border-b-1 border-white">
						<td>Current Kit (Normal)</td>
						<td>{kitProcessing(response.extendedStats.activeKit_SOLO ?? "None")}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Current Kit (Insane)</td>
						<td>{kitProcessing(response.extendedStats.activeKit_TEAM ?? "None")}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Current Kit (Mini)</td>
						<td>{kitProcessing(response.extendedStats.activeKit_RANKED ?? "None")}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Max Prestige Kits</td>
						<td>{response.extendedStats.kitsMaxPrestige ?? "0"}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Display Scheme</td>
						<td>{response.generic.display.skywarsActiveScheme ?? "Unknown"}</td>
					</tr>
					<tr>
						<td colSpan={2} style={{ height: "24px" }}></td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Angel of Death Level</td>
						<td>{response.extendedStats.angel_of_death_level ?? 0}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Angels Offering</td>
						<td>{response.extendedStats.angels_offering == 1 ? "Yes" : "No"}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Total Corruption Chance</td>
						<td>
							{(response.extendedStats.angel_of_death_level ?? 0) +
								(response.extendedStats.angels_offering ?? 0) +
								(response.descentStats.favor_of_the_angel ? 1 : 0)}{" "}
							%
						</td>
					</tr>
					<tr>
						<td colSpan={2} style={{ height: "24px" }}></td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Experience</td>
						<td>{response.stats.skywars_experience?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Coins</td>
						<td>{response.stats.coins?.toLocaleString()}</td>
					</tr>
					{/* <tr className="border-b-1 border-white">
						<td>Tokens</td>
						<td>{stats.extendedStats.tokens?.toLocaleString()}</td>
					</tr> */}
					<tr className="border-b-1 border-white">
						<td>Opals</td>
						<td>{response.extendedStats.opals ?? "None"}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Souls</td>
						<td>{response.extendedStats.souls?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Paid Souls</td>
						<td>{response.extendedStats.paid_souls?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Total Souls</td>
						<td>{response.extendedStats.souls_gathered?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Soul Well Uses</td>
						<td>{response.extendedStats.soul_well?.toLocaleString()}</td>
					</tr>
					<tr>
						<td colSpan={2} style={{ height: "24px" }}></td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Assists</td>
						<td>{response.extendedStats.assists?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Melee Kills</td>
						<td>{response.extendedStats.melee_kills?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Void Kills</td>
						<td>{response.extendedStats.void_kills?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Mob Kills</td>
						<td>{response.extendedStats.mob_kills?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Bow Kills</td>
						<td>{response.extendedStats.bow_kills?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Arrows Shot</td>
						<td>{response.extendedStats.arrows_shot?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Arrows Hit</td>
						<td>{response.extendedStats.arrows_hit?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Arrows Hit/Miss</td>
						<td>
							{response.extendedStats.arrows_shot > 0
								? `${((response.extendedStats.arrows_hit / response.extendedStats.arrows_shot) * 100).toFixed(2)}%`
								: "N/A"}
						</td>
					</tr>
					<tr>
						<td colSpan={2} style={{ height: "24px" }}></td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Kill/Win Ratio</td>
						<td>
							{response.stats.kills && response.stats.wins ? (response.stats.kills / response.stats.wins).toFixed(2) : "N/A"}
						</td>
					</tr>
					{/* <tr className="border-b-1 border-white">
						<td>Kill/Game Ratio</td>
						<td>
							{stats?.kills && stats?.games_played
								? (stats.kills / stats.games_played).toFixed(2)
								: "N/A"}
						</td>
					</tr> */}
					<tr className="border-b-1 border-white">
						<td>Survived Players</td>
						<td>{response.extendedStats.survived_players?.toLocaleString()}</td>
					</tr>
					<tr>
						<td colSpan={2} style={{ height: "24px" }}></td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Eggs Thrown</td>
						<td>{response.extendedStats.egg_thrown?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Pearls Thrown</td>
						<td>{response.extendedStats.enderpearls_thrown?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Blocks Broken</td>
						<td>{response.extendedStats.blocks_broken?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Blocks Placed</td>
						<td>{response.extendedStats.blocks_placed?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Items Enchanted</td>
						<td>{response.extendedStats.items_enchanted?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Chests Opened</td>
						<td>{response.extendedStats.chests_opened?.toLocaleString()}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Extended;
