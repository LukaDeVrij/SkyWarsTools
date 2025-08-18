import React from "react";
import { toCamelCase } from "@/app/utils/Utils";
interface ExtendedProps {
	extendedStats: {
		activeKit_SOLO: "kit_mythical_fishmonger";
		activeKit_TEAM: "kit_attacking_team_knight";
		activeKit_RANKED: "kit_ranked_ranked_scout";
		angel_of_death_level: 12;
		angels_offering: 1;
		survived_players: 864183;
		blocks_broken: 156854;
		blocks_placed: 1921689;
		egg_thrown: 392457;
		enderpearls_thrown: 30491;
		souls_gathered: 186681;
		souls: 157;
		opals: 1;
		soul_well: 14462;
		paid_souls: 3305;
		assists: 23039;
		arrows_hit: 85638;
		arrows_shot: 227710;
		items_enchanted: 13956;
		chests_opened: 312765;
		melee_kills: 152920;
		void_kills: 66779;
		bow_kills: 5788;
		mob_kills: 785;
		kitsMaxPrestige: 4;
		time_played_solo: 6216213;
		time_played_team: 1322112;
		time_played_mega: 55216;
		time_played_ranked: 255738;
		time_played_lab: 222030;
		time_played_mini: 102884;
		heads_eww: 2953;
		heads_yucky: 3685;
		heads_meh: 4886;
		heads_decent: 4666;
		heads_salty: 5084;
		heads_tasty: 6480;
		heads_succulent: 4338;
		heads_divine: 4517;
		heads_heavenly: 3950;
		heads_ethereal: 385;
		heads_indescribable: 260;
		heads_special: 6;
		heads_sweet: 2;
		perkslot: {
			insane: {
				"1": "team_black_magic";
				"2": "team_lucky_charm";
				"3": "tenacity";
				"4": "team_savior";
				"5": "team_mining_expertise";
				"6": "team_diamondpiercer";
			};
			normal: {
				"1": "solo_resistance_boost";
				"2": "solo_savior";
				"3": "solo_fat";
				"4": "solo_lucky_charm";
				"5": "solo_environmental_expert";
				"6": "solo_black_magic";
				"7": "tenacity";
			};
			mega: {
				"1": "mega_lucky_charm";
				"2": "mega_environmental_expert";
				"3": "mega_black_magic";
				"4": "mega_notoriety";
				"5": "mega_tank";
				"6": "ender_end_game";
				"7": "mega_rusher";
			};
		};
		SkyWars_skywars_rating_3_18_position: 4673;
		SkyWars_skywars_rating_3_18_rating: 1041;
		SkyWars_skywars_rating_4_18_position: 6372;
		SkyWars_skywars_rating_4_18_rating: 891;
		SkyWars_skywars_rating_5_18_position: 12858;
		SkyWars_skywars_rating_5_18_rating: 571;
		SkyWars_skywars_rating_6_18_position: 2420;
		SkyWars_skywars_rating_6_18_rating: 1181;
		SkyWars_skywars_rating_7_18_position: 13921;
		SkyWars_skywars_rating_7_18_rating: 607;
		SkyWars_skywars_rating_8_18_position: 6979;
		SkyWars_skywars_rating_8_18_rating: 910;
		SkyWars_skywars_rating_9_18_position: 20489;
		SkyWars_skywars_rating_9_18_rating: 297;
		SkyWars_skywars_rating_10_18_position: 19948;
		SkyWars_skywars_rating_10_18_rating: 300;
		SkyWars_skywars_rating_11_18_position: 20234;
		SkyWars_skywars_rating_11_18_rating: 300;
		SkyWars_skywars_rating_12_18_position: 27828;
		SkyWars_skywars_rating_12_18_rating: 150;
		SkyWars_skywars_rating_1_19_position: 36447;
		SkyWars_skywars_rating_1_19_rating: 50;
		SkyWars_skywars_rating_2_19_position: 45156;
		SkyWars_skywars_rating_2_19_rating: 0;
		SkyWars_skywars_rating_3_19_position: 22082;
		SkyWars_skywars_rating_3_19_rating: 200;
		SkyWars_skywars_rating_4_19_position: 42929;
		SkyWars_skywars_rating_4_19_rating: 0;
		SkyWars_skywars_rating_5_19_position: 45752;
		SkyWars_skywars_rating_5_19_rating: 0;
		SkyWars_skywars_rating_6_19_position: null;
		SkyWars_skywars_rating_6_19_rating: null;
		SkyWars_skywars_rating_7_19_position: 18867;
		SkyWars_skywars_rating_7_19_rating: 523;
		SkyWars_skywars_rating_8_19_position: 23432;
		SkyWars_skywars_rating_8_19_rating: 487;
		SkyWars_skywars_rating_9_19_position: 20272;
		SkyWars_skywars_rating_9_19_rating: 490;
		SkyWars_skywars_rating_10_19_position: 36480;
		SkyWars_skywars_rating_10_19_rating: 100;
		SkyWars_skywars_rating_11_19_position: 27648;
		SkyWars_skywars_rating_11_19_rating: 150;
		SkyWars_skywars_rating_12_19_position: 20716;
		SkyWars_skywars_rating_12_19_rating: 300;
		SkyWars_skywars_rating_1_20_position: null;
		SkyWars_skywars_rating_1_20_rating: null;
		SkyWars_skywars_rating_2_20_position: 24329;
		SkyWars_skywars_rating_2_20_rating: 250;
		SkyWars_skywars_rating_3_20_position: null;
		SkyWars_skywars_rating_3_20_rating: null;
		SkyWars_skywars_rating_4_20_position: 5580;
		SkyWars_skywars_rating_4_20_rating: 1027;
		SkyWars_skywars_rating_5_20_position: 4938;
		SkyWars_skywars_rating_5_20_rating: 1092;
		SkyWars_skywars_rating_6_20_position: 18189;
		SkyWars_skywars_rating_6_20_rating: 799;
		SkyWars_skywars_rating_7_20_position: 14592;
		SkyWars_skywars_rating_7_20_rating: 850;
		SkyWars_skywars_rating_8_20_position: 19055;
		SkyWars_skywars_rating_8_20_rating: 798;
		SkyWars_skywars_rating_9_20_position: 4224;
		SkyWars_skywars_rating_9_20_rating: 1102;
		SkyWars_skywars_rating_10_20_position: 5654;
		SkyWars_skywars_rating_10_20_rating: 1040;
		SkyWars_skywars_rating_11_20_position: 12410;
		SkyWars_skywars_rating_11_20_rating: 841;
		SkyWars_skywars_rating_12_20_position: 15954;
		SkyWars_skywars_rating_12_20_rating: 767;
		SkyWars_skywars_rating_1_21_position: 6000;
		SkyWars_skywars_rating_1_21_rating: 1017;
		SkyWars_skywars_rating_2_21_position: 8094;
		SkyWars_skywars_rating_2_21_rating: 910;
		SkyWars_skywars_rating_3_21_position: 7990;
		SkyWars_skywars_rating_3_21_rating: 892;
		SkyWars_skywars_rating_4_21_position: 6469;
		SkyWars_skywars_rating_4_21_rating: 913;
		SkyWars_skywars_rating_5_21_position: 8045;
		SkyWars_skywars_rating_5_21_rating: 826;
		SkyWars_skywars_rating_6_21_position: 4032;
		SkyWars_skywars_rating_6_21_rating: 921;
		SkyWars_skywars_rating_7_21_position: 3973;
		SkyWars_skywars_rating_7_21_rating: 982;
		SkyWars_skywars_rating_8_21_position: 1315;
		SkyWars_skywars_rating_8_21_rating: 1268;
		SkyWars_skywars_rating_9_21_position: 27674;
		SkyWars_skywars_rating_9_21_rating: 250;
		SkyWars_skywars_rating_10_21_position: null;
		SkyWars_skywars_rating_10_21_rating: null;
		SkyWars_skywars_rating_11_21_position: null;
		SkyWars_skywars_rating_11_21_rating: null;
		SkyWars_skywars_rating_12_21_position: 9482;
		SkyWars_skywars_rating_12_21_rating: 250;
		SkyWars_skywars_rating_1_22_position: 5358;
		SkyWars_skywars_rating_1_22_rating: 595;
		SkyWars_skywars_rating_2_22_position: 34108;
		SkyWars_skywars_rating_2_22_rating: 0;
		SkyWars_skywars_rating_3_22_position: 4992;
		SkyWars_skywars_rating_3_22_rating: 397;
		SkyWars_skywars_rating_4_22_position: 3441;
		SkyWars_skywars_rating_4_22_rating: 659;
		SkyWars_skywars_rating_5_22_position: null;
		SkyWars_skywars_rating_5_22_rating: null;
		SkyWars_skywars_rating_6_22_position: 26661;
		SkyWars_skywars_rating_6_22_rating: 0;
		SkyWars_skywars_rating_7_22_position: 11801;
		SkyWars_skywars_rating_7_22_rating: 250;
		SkyWars_skywars_rating_8_22_position: null;
		SkyWars_skywars_rating_8_22_rating: null;
		SkyWars_skywars_rating_9_22_position: null;
		SkyWars_skywars_rating_9_22_rating: null;
		SkyWars_skywars_rating_10_22_position: null;
		SkyWars_skywars_rating_10_22_rating: null;
		SkyWars_skywars_rating_11_22_position: null;
		SkyWars_skywars_rating_11_22_rating: null;
		SkyWars_skywars_rating_12_22_position: null;
		SkyWars_skywars_rating_12_22_rating: null;
	};
	stats: {
		skywars_experience: number;
		coins: number;
		opals: number;
		heads: number;
		souls: number;
		kills: number;
		deaths: number;
		wins: number;
		losses: number;
		time_played: number;
		wins_solo: number;
		losses_solo: number;
		kills_solo: number;
		deaths_solo: number;
		time_played_solo: number;
		wins_team: number;
		losses_team: number;
		kills_team: number;
		deaths_team: number;
		time_played_team: number;
		wins_mini: number;
		kills_mini: number;
		time_played_mini: number;
	};
}
const Extended: React.FC<ExtendedProps> = ({ extendedStats, stats }) => {
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
						<td>{kitProcessing(extendedStats.activeKit_SOLO)}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Current Kit (Insane)</td>
						<td>{kitProcessing(extendedStats.activeKit_TEAM)}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Current Kit (Mini)</td>
						<td>{kitProcessing(extendedStats.activeKit_RANKED)}</td>
					</tr>
					<tr>
						<td colSpan={2} style={{ height: "24px" }}></td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Angel of Death Level</td>
						<td>{extendedStats.angel_of_death_level}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Angels Offering</td>
						<td>{extendedStats.angels_offering == 1 ? "Yes" : "No"}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Total Corruption Chance</td>
						<td>{extendedStats.angel_of_death_level + extendedStats.angels_offering} %</td>
					</tr>
					<tr>
						<td colSpan={2} style={{ height: "24px" }}></td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Experience</td>
						<td>{stats.skywars_experience?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Coins</td>
						<td>{stats.coins?.toLocaleString()}</td>
					</tr>
					{/* <tr className="border-b-1 border-white">
						<td>Tokens</td>
						<td>{extendedStats.tokens?.toLocaleString()}</td>
					</tr> */}
					<tr className="border-b-1 border-white">
						<td>Opals</td>
						<td>{extendedStats.opals ?? "None"}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Souls</td>
						<td>{extendedStats.souls?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Paid Souls</td>
						<td>{extendedStats.paid_souls?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Total Souls</td>
						<td>{extendedStats.souls_gathered?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Soul Well Uses</td>
						<td>{extendedStats.soul_well?.toLocaleString()}</td>
					</tr>
					<tr>
						<td colSpan={2} style={{ height: "24px" }}></td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Assists</td>
						<td>{extendedStats.assists?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Melee Kills</td>
						<td>{extendedStats.melee_kills?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Void Kills</td>
						<td>{extendedStats.void_kills?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Mob Kills</td>
						<td>{extendedStats.mob_kills?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Bow Kills</td>
						<td>{extendedStats.bow_kills?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Arrows Shot</td>
						<td>{extendedStats.arrows_shot?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Arrows Hit</td>
						<td>{extendedStats.arrows_hit?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Arrows Hit/Miss</td>
						<td>
							{extendedStats.arrows_shot > 0
								? `${((extendedStats.arrows_hit / extendedStats.arrows_shot) * 100).toFixed(2)}%`
								: "N/A"}
						</td>
					</tr>
					<tr>
						<td colSpan={2} style={{ height: "24px" }}></td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Kill/Win Ratio</td>
						<td>{stats?.kills && stats?.wins ? (stats.kills / stats.wins).toFixed(2) : "N/A"}</td>
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
						<td>{extendedStats.survived_players?.toLocaleString()}</td>
					</tr>
					<tr>
						<td colSpan={2} style={{ height: "24px" }}></td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Eggs Thrown</td>
						<td>{extendedStats.egg_thrown?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Pearls Thrown</td>
						<td>{extendedStats.enderpearls_thrown?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Blocks Broken</td>
						<td>{extendedStats.blocks_broken?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Blocks Placed</td>
						<td>{extendedStats.blocks_placed?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Items Enchanted</td>
						<td>{extendedStats.items_enchanted?.toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Chests Opened</td>
						<td>{extendedStats.chests_opened?.toLocaleString()}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Extended;
