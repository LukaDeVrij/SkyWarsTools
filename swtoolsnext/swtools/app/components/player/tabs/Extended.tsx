import React from "react";
import { toCamelCase } from "@/app/utils/Utils";
import KitPrestigeString from "../../universal/KitPrestigeString";
import TabContent from "./TabContent";
import { OverallResponse } from "@/app/types/OverallResponse";
import MinecraftText from "@/app/utils/MinecraftText";

const Extended: React.FC<OverallResponse> = (response) => {
	function kitProcessing(value: string): string {
		const parts = value.split("_");
		return toCamelCase(parts[parts.length - 1]);
	}

	// response = useOverall(response.player); // Temp hook fix

	return (
		<TabContent>
			<div className="extended-table w-full text-left bg-content font-bold font flex flex-col lg:flex-row lg:text-lg lg:justify-center">
				<table className="p-4 w-full lg:w-[65%] text-left bg-content ">
					<tbody>
						<tr className="border-b-1 border-white">
							<td>Current Kit (Normal)</td>
							<td>
								{kitProcessing(response.stats.activeKit_SOLO ?? "None")}{" "}
								{<KitPrestigeString kit={response.stats.activeKit_SOLO} response={response} />}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Current Kit (Insane)</td>
							<td>
								{kitProcessing(response.stats.activeKit_TEAM ?? "None")}{" "}
								{<KitPrestigeString kit={response.stats.activeKit_TEAM} response={response} />}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Current Kit (Mini)</td>
							<td>
								{kitProcessing(response.stats.activeKit_MINI ?? "None")}{" "}
								{<KitPrestigeString kit={response.stats.activeKit_MINI} response={response} />}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Max Prestige Kits</td>
							<td>
								<MinecraftText>{response.stats.kitsMaxPrestige ?? "0"}</MinecraftText>
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Display Scheme</td>
							<td>{response.display.active_scheme ?? "Unknown"}</td>
						</tr>
						<tr>
							<td colSpan={2} style={{ height: "24px" }}></td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Angel of Death Level</td>
							<td>{response.stats.angel_of_death_level ?? 0}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Angels Offering</td>
							<td>{response.stats.angels_offering == 1 ? "Yes" : "No"}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Favour of the Angel</td>
							<td>{response.stats.packages?.includes("favor_of_the_angel") ? "Yes" : "No"}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Total Corruption Chance</td>
							<td>
								{(response.stats.angel_of_death_level ?? 0) +
									(response.stats.angels_offering ?? 0) +
									(response.stats.packages?.includes("favor_of_the_angel") ? 1 : 0)}{" "}
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
						<td>{stats.stats.tokens?.toLocaleString()}</td>
					</tr> */}
						<tr className="border-b-1 border-white">
							<td>Opals</td>
							<td>{response.stats.opals ?? "None"}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Souls</td>
							<td>{response.stats.souls?.toLocaleString()}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Paid Souls</td>
							<td>{response.stats.paid_souls?.toLocaleString()}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Total Souls</td>
							<td>{response.stats.souls_gathered?.toLocaleString()}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Soul Well Uses</td>
							<td>{response.stats.soul_well?.toLocaleString()}</td>
						</tr>
						<tr>
							<td colSpan={2} style={{ height: "24px" }}></td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Assists</td>
							<td>{response.stats.assists?.toLocaleString()}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Melee Kills</td>
							<td>{response.stats.melee_kills?.toLocaleString()}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Void Kills</td>
							<td>{response.stats.void_kills?.toLocaleString()}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Mob Kills</td>
							<td>{response.stats.mob_kills?.toLocaleString() ?? 0}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Bow Kills</td>
							<td>{response.stats.bow_kills?.toLocaleString()}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Arrows Shot</td>
							<td>{response.stats.arrows_shot?.toLocaleString()}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Arrows Hit</td>
							<td>{response.stats.arrows_hit?.toLocaleString()}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Arrows Hit/Miss</td>
							<td>
								{/* 	TODO Refactor this bs */}
								{(() => {
									const arrowsShot = response.stats.arrows_shot ?? 0;
									const arrowsHit = response.stats.arrows_hit ?? 0;
									if (arrowsShot > 0) {
										const hitMissRatio = ((arrowsHit / arrowsShot) * 100).toFixed(2);
										return `${hitMissRatio}%`;
									}
									return "N/A";
								})()}
							</td>
						</tr>
						<tr>
							<td colSpan={2} style={{ height: "24px" }}></td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Kill/Win Ratio</td>
							<td>
								{response.stats.kills && response.stats.wins
									? (response.stats.kills / response.stats.wins).toFixed(2)
									: "N/A"}
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
							<td>{response.stats.survived_players?.toLocaleString()}</td>
						</tr>
						<tr>
							<td colSpan={2} style={{ height: "24px" }}></td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Eggs Thrown</td>
							<td>{response.stats.egg_thrown?.toLocaleString()}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Pearls Thrown</td>
							<td>{response.stats.enderpearls_thrown?.toLocaleString()}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Blocks Broken</td>
							<td>{response.stats.blocks_broken?.toLocaleString()}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Blocks Placed</td>
							<td>{response.stats.blocks_placed?.toLocaleString()}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Items Enchanted</td>
							<td>{response.stats.items_enchanted?.toLocaleString()}</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Chests Opened</td>
							<td>{response.stats.chests_opened?.toLocaleString()}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</TabContent>
	);
};

export default Extended;
