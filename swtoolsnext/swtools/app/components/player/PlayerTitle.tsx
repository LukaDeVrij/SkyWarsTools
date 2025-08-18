import React from "react";
import twemoji from "@twemoji/api";
import Image from "next/image";
import MinecraftText from "../MinecraftText";
import { getPlayerRank } from "@/app/utils/RankTag";

interface PlayerTitleProps {
	playerName: string;
	data: {
		nextSave: {
			saved: false;
			lastSaved: 1755513818000;
		};
		took: 45;
		success: true;
		queried: 1755527383628;
		uuid: "0068d9ff-46fa-4aae-8bcf-86a215cd4264";
		player: "LifelessNerd";
		statsVersion: 3;
		stats: {
			skywars_experience: 375340.6;
			coins: 25976238;
			opals: 5;
			heads: 13875;
			souls: 1303;
			kills: 101496;
			deaths: 45425;
			wins: 14608;
			losses: 44732;
			time_played: 4295059;
			wins_solo: 10587;
			losses_solo: 34282;
			kills_solo: 74896;
			deaths_solo: 34267;
			time_played_solo: 3025007;
			wins_team: 3019;
			losses_team: 8238;
			kills_team: 22675;
			deaths_team: 8901;
			time_played_team: 974853;
			wins_mini: 256;
			kills_mini: 561;
			time_played_mini: 30434;
		};
		generic: {
			display: {
				levelFormattedWithBrackets: "§d[§d8§d8§dΩ§d]§r ";
				levelFormatted: "§d8§d8";
				newPackageRank: "MVP_PLUS";
				monthlyPackageRank: "SUPERSTAR";
				rankPlusColor: "BLACK";
				monthlyRankColor: "GOLD";
				skywarsActiveScheme: "scheme_crystal_prestige";
				tagColor?: string;
				tag?: string;
			};
			stats: {
				karma: 25694452;
				networkExp: 105044164;
				firstLogin: 1413026450000;
				lastLogin: 1755524069466;
				achievementPoints: 7350;
				guild: "The Dawns Awakening";
				guildRank: "Members";
				guildJoined: 1731702523610;
			};
		};
		extendedStats: {
			activeKit_SOLO: "kit_basic_solo_archeologist";
			activeKit_TEAM: "kit_defending_team_armorer";
			activeKit_RANKED: "kit_ranked_ranked_scout";
			angel_of_death_level: 11;
			angels_offering: 1;
			survived_players: 484731;
			blocks_broken: 56569;
			blocks_placed: 852049;
			egg_thrown: 175112;
			enderpearls_thrown: 18596;
			souls_gathered: 121777;
			souls: 1303;
			opals: 5;
			soul_well: 5863;
			paid_souls: 1365;
			assists: 13156;
			arrows_hit: 48567;
			arrows_shot: 146171;
			items_enchanted: 5078;
			chests_opened: 171982;
			melee_kills: 61389;
			void_kills: 27705;
			bow_kills: 1569;
			mob_kills: 304;
			kitsMaxPrestige: 1;
			time_played_solo: 3025007;
			time_played_team: 974853;
			time_played_mega: 72065;
			time_played_ranked: 155723;
			time_played_lab: 48799;
			time_played_mini: 30434;
			heads_eww: 656;
			heads_yucky: 1151;
			heads_meh: 1784;
			heads_decent: 1697;
			heads_salty: 1622;
			heads_tasty: 2055;
			heads_succulent: 1417;
			heads_divine: 1520;
			heads_heavenly: 1802;
			heads_ethereal: 89;
			heads_indescribable: 81;
			heads_special: 1;
			heads_sweet: null;
			perkslot: {
				normal: {
					"1": "solo_fat";
					"2": "fortune_teller";
					"3": "solo_resistance_boost";
					"4": "solo_savior";
					"5": "solo_environmental_expert";
					"6": "solo_black_magic";
					"7": "solo_lucky_charm";
				};
				insane: {
					"1": "team_resistance_boost";
					"2": "team_robbery";
					"3": "team_diamondpiercer";
					"4": "team_savior";
					"5": "team_fat";
					"6": "team_black_magic";
				};
				mega: {
					"1": "mega_rusher";
					"2": "mega_arrow_recovery";
					"3": "mega_rusher";
					"4": "mega_black_magic";
					"5": "mega_notoriety";
					"6": "mega_tank";
					"7": "mega_environmental_expert";
				};
			};
			SkyWars_skywars_rating_3_18_position: 5746;
			SkyWars_skywars_rating_3_18_rating: 985;
			SkyWars_skywars_rating_4_18_position: 27898;
			SkyWars_skywars_rating_4_18_rating: 150;
			SkyWars_skywars_rating_5_18_position: 34651;
			SkyWars_skywars_rating_5_18_rating: 50;
			SkyWars_skywars_rating_6_18_position: null;
			SkyWars_skywars_rating_6_18_rating: null;
			SkyWars_skywars_rating_7_18_position: 25468;
			SkyWars_skywars_rating_7_18_rating: 200;
			SkyWars_skywars_rating_8_18_position: 5148;
			SkyWars_skywars_rating_8_18_rating: 1007;
			SkyWars_skywars_rating_9_18_position: 46905;
			SkyWars_skywars_rating_9_18_rating: 0;
			SkyWars_skywars_rating_10_18_position: null;
			SkyWars_skywars_rating_10_18_rating: null;
			SkyWars_skywars_rating_11_18_position: null;
			SkyWars_skywars_rating_11_18_rating: null;
			SkyWars_skywars_rating_12_18_position: null;
			SkyWars_skywars_rating_12_18_rating: null;
			SkyWars_skywars_rating_1_19_position: null;
			SkyWars_skywars_rating_1_19_rating: null;
			SkyWars_skywars_rating_2_19_position: null;
			SkyWars_skywars_rating_2_19_rating: null;
			SkyWars_skywars_rating_3_19_position: null;
			SkyWars_skywars_rating_3_19_rating: null;
			SkyWars_skywars_rating_4_19_position: null;
			SkyWars_skywars_rating_4_19_rating: null;
			SkyWars_skywars_rating_5_19_position: null;
			SkyWars_skywars_rating_5_19_rating: null;
			SkyWars_skywars_rating_6_19_position: 3708;
			SkyWars_skywars_rating_6_19_rating: 987;
			SkyWars_skywars_rating_7_19_position: 10128;
			SkyWars_skywars_rating_7_19_rating: 768;
			SkyWars_skywars_rating_8_19_position: 11008;
			SkyWars_skywars_rating_8_19_rating: 791;
			SkyWars_skywars_rating_9_19_position: 30336;
			SkyWars_skywars_rating_9_19_rating: 250;
			SkyWars_skywars_rating_10_19_position: 13070;
			SkyWars_skywars_rating_10_19_rating: 645;
			SkyWars_skywars_rating_11_19_position: 25228;
			SkyWars_skywars_rating_11_19_rating: 200;
			SkyWars_skywars_rating_12_19_position: 25850;
			SkyWars_skywars_rating_12_19_rating: 200;
			SkyWars_skywars_rating_1_20_position: null;
			SkyWars_skywars_rating_1_20_rating: null;
			SkyWars_skywars_rating_2_20_position: null;
			SkyWars_skywars_rating_2_20_rating: null;
			SkyWars_skywars_rating_3_20_position: null;
			SkyWars_skywars_rating_3_20_rating: null;
			SkyWars_skywars_rating_4_20_position: null;
			SkyWars_skywars_rating_4_20_rating: null;
			SkyWars_skywars_rating_5_20_position: null;
			SkyWars_skywars_rating_5_20_rating: null;
			SkyWars_skywars_rating_6_20_position: null;
			SkyWars_skywars_rating_6_20_rating: null;
			SkyWars_skywars_rating_7_20_position: null;
			SkyWars_skywars_rating_7_20_rating: null;
			SkyWars_skywars_rating_8_20_position: 6483;
			SkyWars_skywars_rating_8_20_rating: 1048;
			SkyWars_skywars_rating_9_20_position: 49710;
			SkyWars_skywars_rating_9_20_rating: 300;
			SkyWars_skywars_rating_10_20_position: null;
			SkyWars_skywars_rating_10_20_rating: null;
			SkyWars_skywars_rating_11_20_position: null;
			SkyWars_skywars_rating_11_20_rating: null;
			SkyWars_skywars_rating_12_20_position: null;
			SkyWars_skywars_rating_12_20_rating: null;
			SkyWars_skywars_rating_1_21_position: null;
			SkyWars_skywars_rating_1_21_rating: null;
			SkyWars_skywars_rating_2_21_position: null;
			SkyWars_skywars_rating_2_21_rating: null;
			SkyWars_skywars_rating_3_21_position: null;
			SkyWars_skywars_rating_3_21_rating: null;
			SkyWars_skywars_rating_4_21_position: 7748;
			SkyWars_skywars_rating_4_21_rating: 867;
			SkyWars_skywars_rating_5_21_position: null;
			SkyWars_skywars_rating_5_21_rating: null;
			SkyWars_skywars_rating_6_21_position: null;
			SkyWars_skywars_rating_6_21_rating: null;
			SkyWars_skywars_rating_7_21_position: null;
			SkyWars_skywars_rating_7_21_rating: null;
			SkyWars_skywars_rating_8_21_position: 11510;
			SkyWars_skywars_rating_8_21_rating: 687;
			SkyWars_skywars_rating_9_21_position: null;
			SkyWars_skywars_rating_9_21_rating: null;
			SkyWars_skywars_rating_10_21_position: null;
			SkyWars_skywars_rating_10_21_rating: null;
			SkyWars_skywars_rating_11_21_position: null;
			SkyWars_skywars_rating_11_21_rating: null;
			SkyWars_skywars_rating_12_21_position: null;
			SkyWars_skywars_rating_12_21_rating: null;
			SkyWars_skywars_rating_1_22_position: null;
			SkyWars_skywars_rating_1_22_rating: null;
			SkyWars_skywars_rating_2_22_position: null;
			SkyWars_skywars_rating_2_22_rating: null;
			SkyWars_skywars_rating_3_22_position: null;
			SkyWars_skywars_rating_3_22_rating: null;
			SkyWars_skywars_rating_4_22_position: null;
			SkyWars_skywars_rating_4_22_rating: null;
			SkyWars_skywars_rating_5_22_position: null;
			SkyWars_skywars_rating_5_22_rating: null;
			SkyWars_skywars_rating_6_22_position: null;
			SkyWars_skywars_rating_6_22_rating: null;
			SkyWars_skywars_rating_7_22_position: null;
			SkyWars_skywars_rating_7_22_rating: null;
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
		kitStats: {
			wins_kit_advanced_solo_armorer: 1725;
			losses_kit_advanced_solo_armorer: 5856;
			kills_kit_advanced_solo_armorer: 12816;
			deaths_kit_advanced_solo_armorer: 5903;
			time_played_kit_advanced_solo_armorer: 524211;
			xp_kit_advanced_solo_armorer: 43024;
			wins_kit_basic_solo_archeologist: 2253;
			losses_kit_basic_solo_archeologist: 5979;
			kills_kit_basic_solo_archeologist: 15353;
			deaths_kit_basic_solo_archeologist: 5999;
			time_played_kit_basic_solo_archeologist: 548222;
			xp_kit_basic_solo_archeologist: 68695;
			wins_kit_basic_solo_armorsmith: 48;
			losses_kit_basic_solo_armorsmith: 201;
			kills_kit_basic_solo_armorsmith: 338;
			deaths_kit_basic_solo_armorsmith: 201;
			time_played_kit_basic_solo_armorsmith: 19918;
			xp_kit_basic_solo_armorsmith: 1162;
			"wins_kit_basic_solo_baseball-player": 10;
			"losses_kit_basic_solo_baseball-player": 40;
			"kills_kit_basic_solo_baseball-player": 84;
			"deaths_kit_basic_solo_baseball-player": 40;
			"time_played_kit_basic_solo_baseball-player": 3821;
			"xp_kit_basic_solo_baseball-player": 268;
			wins_kit_basic_solo_batguy: 2;
			losses_kit_basic_solo_batguy: 6;
			kills_kit_basic_solo_batguy: 19;
			deaths_kit_basic_solo_batguy: 6;
			time_played_kit_basic_solo_batguy: 665;
			xp_kit_basic_solo_batguy: 58;
			wins_kit_basic_solo_cactus: 3;
			losses_kit_basic_solo_cactus: 21;
			kills_kit_basic_solo_cactus: 26;
			deaths_kit_basic_solo_cactus: 21;
			time_played_kit_basic_solo_cactus: 1429;
			xp_kit_basic_solo_cactus: 82;
			wins_kit_advanced_solo_cannoneer: 23;
			losses_kit_advanced_solo_cannoneer: 187;
			kills_kit_advanced_solo_cannoneer: 180;
			deaths_kit_advanced_solo_cannoneer: 187;
			time_played_kit_advanced_solo_cannoneer: 16727;
			xp_kit_advanced_solo_cannoneer: 596;
			wins_kit_basic_solo_default: 9;
			losses_kit_basic_solo_default: 63;
			kills_kit_basic_solo_default: 70;
			deaths_kit_basic_solo_default: 63;
			time_played_kit_basic_solo_default: 1750;
			xp_kit_basic_solo_default: 110;
			wins_kit_basic_solo_disco: 267;
			losses_kit_basic_solo_disco: 947;
			kills_kit_basic_solo_disco: 1915;
			deaths_kit_basic_solo_disco: 951;
			time_played_kit_basic_solo_disco: 76995;
			xp_kit_basic_solo_disco: 6500;
			wins_kit_basic_solo_ecologist: 40;
			losses_kit_basic_solo_ecologist: 518;
			kills_kit_basic_solo_ecologist: 446;
			deaths_kit_basic_solo_ecologist: 518;
			time_played_kit_basic_solo_ecologist: 10631;
			xp_kit_basic_solo_ecologist: 1292;
			wins_kit_advanced_solo_enchanter: 7;
			losses_kit_advanced_solo_enchanter: 14;
			kills_kit_advanced_solo_enchanter: 39;
			deaths_kit_advanced_solo_enchanter: 14;
			time_played_kit_advanced_solo_enchanter: 2614;
			xp_kit_advanced_solo_enchanter: 165;
			wins_kit_enderchest_solo_enderchest: 135;
			losses_kit_enderchest_solo_enderchest: 778;
			kills_kit_enderchest_solo_enderchest: 1225;
			deaths_kit_enderchest_solo_enderchest: 779;
			time_played_kit_enderchest_solo_enderchest: 76270;
			xp_kit_enderchest_solo_enderchest: 3807;
			wins_kit_advanced_solo_enderman: 246;
			losses_kit_advanced_solo_enderman: 713;
			kills_kit_advanced_solo_enderman: 1577;
			deaths_kit_advanced_solo_enderman: 713;
			time_played_kit_advanced_solo_enderman: 81157;
			xp_kit_advanced_solo_enderman: 6641;
			wins_kit_basic_solo_energix: 568;
			losses_kit_basic_solo_energix: 2303;
			kills_kit_basic_solo_energix: 4516;
			deaths_kit_basic_solo_energix: 2303;
			time_played_kit_basic_solo_energix: 249331;
			xp_kit_basic_solo_energix: 14712;
			wins_kit_advanced_solo_farmer: 2711;
			losses_kit_advanced_solo_farmer: 8622;
			kills_kit_advanced_solo_farmer: 19641;
			deaths_kit_advanced_solo_farmer: 8637;
			time_played_kit_advanced_solo_farmer: 741185;
			xp_kit_advanced_solo_farmer: 75674;
			wins_kit_basic_solo_fisherman: 45;
			losses_kit_basic_solo_fisherman: 180;
			kills_kit_basic_solo_fisherman: 342;
			deaths_kit_basic_solo_fisherman: 181;
			time_played_kit_basic_solo_fisherman: 17860;
			xp_kit_basic_solo_fisherman: 1271;
			wins_kit_basic_solo_frog: 17;
			losses_kit_basic_solo_frog: 114;
			kills_kit_basic_solo_frog: 151;
			deaths_kit_basic_solo_frog: 114;
			time_played_kit_basic_solo_frog: 8650;
			xp_kit_basic_solo_frog: 472;
			wins_kit_basic_solo_grenade: 55;
			losses_kit_basic_solo_grenade: 251;
			kills_kit_basic_solo_grenade: 458;
			deaths_kit_basic_solo_grenade: 251;
			time_played_kit_basic_solo_grenade: 23935;
			xp_kit_basic_solo_grenade: 1527;
			wins_kit_advanced_solo_guardian: 2;
			losses_kit_advanced_solo_guardian: 7;
			kills_kit_advanced_solo_guardian: 23;
			deaths_kit_advanced_solo_guardian: 7;
			time_played_kit_advanced_solo_guardian: 1174;
			xp_kit_advanced_solo_guardian: 66;
			wins_kit_basic_solo_healer: 4;
			losses_kit_basic_solo_healer: 16;
			kills_kit_basic_solo_healer: 25;
			deaths_kit_basic_solo_healer: 16;
			time_played_kit_basic_solo_healer: 1137;
			xp_kit_basic_solo_healer: 90;
			wins_kit_advanced_solo_hunter: 3;
			losses_kit_advanced_solo_hunter: 29;
			kills_kit_advanced_solo_hunter: 45;
			deaths_kit_advanced_solo_hunter: 29;
			time_played_kit_advanced_solo_hunter: 2774;
			xp_kit_advanced_solo_hunter: 120;
			wins_kit_advanced_solo_jester: 8;
			losses_kit_advanced_solo_jester: 14;
			kills_kit_advanced_solo_jester: 43;
			deaths_kit_advanced_solo_jester: 15;
			time_played_kit_advanced_solo_jester: 1785;
			xp_kit_advanced_solo_jester: 166;
			wins_kit_advanced_solo_knight: 62;
			losses_kit_advanced_solo_knight: 324;
			kills_kit_advanced_solo_knight: 552;
			deaths_kit_advanced_solo_knight: 324;
			time_played_kit_advanced_solo_knight: 26116;
			xp_kit_advanced_solo_knight: 1967;
			wins_kit_advanced_solo_magician: 1;
			losses_kit_advanced_solo_magician: 8;
			kills_kit_advanced_solo_magician: 15;
			deaths_kit_advanced_solo_magician: 8;
			time_played_kit_advanced_solo_magician: 432;
			xp_kit_advanced_solo_magician: 40;
			wins_kit_basic_solo_pharaoh: 3;
			losses_kit_basic_solo_pharaoh: 11;
			kills_kit_basic_solo_pharaoh: 24;
			deaths_kit_basic_solo_pharaoh: 11;
			time_played_kit_basic_solo_pharaoh: 1127;
			xp_kit_basic_solo_pharaoh: 78;
			"wins_kit_advanced_solo_pig-rider": 2;
			"losses_kit_advanced_solo_pig-rider": 10;
			"kills_kit_advanced_solo_pig-rider": 20;
			"deaths_kit_advanced_solo_pig-rider": 10;
			"time_played_kit_advanced_solo_pig-rider": 1160;
			"xp_kit_advanced_solo_pig-rider": 60;
			wins_kit_advanced_solo_pyro: 418;
			losses_kit_advanced_solo_pyro: 1254;
			kills_kit_advanced_solo_pyro: 2830;
			deaths_kit_advanced_solo_pyro: 1256;
			time_played_kit_advanced_solo_pyro: 124446;
			xp_kit_advanced_solo_pyro: 10045;
			wins_kit_basic_solo_princess: 2;
			losses_kit_basic_solo_princess: 8;
			kills_kit_basic_solo_princess: 16;
			deaths_kit_basic_solo_princess: 8;
			time_played_kit_basic_solo_princess: 524;
			xp_kit_basic_solo_princess: 52;
			wins_kit_basic_solo_rookie: 60;
			losses_kit_basic_solo_rookie: 1062;
			kills_kit_basic_solo_rookie: 933;
			deaths_kit_basic_solo_rookie: 1062;
			time_played_kit_basic_solo_rookie: 11578;
			xp_kit_basic_solo_rookie: 2532;
			wins_kit_advanced_solo_salmon: 18;
			losses_kit_advanced_solo_salmon: 32;
			kills_kit_advanced_solo_salmon: 86;
			deaths_kit_advanced_solo_salmon: 35;
			time_played_kit_advanced_solo_salmon: 4625;
			xp_kit_advanced_solo_salmon: 352;
			wins_kit_basic_solo_scout: 505;
			losses_kit_basic_solo_scout: 909;
			kills_kit_basic_solo_scout: 3316;
			deaths_kit_basic_solo_scout: 911;
			time_played_kit_basic_solo_scout: 135377;
			xp_kit_basic_solo_scout: 11682;
			wins_kit_advanced_solo_slime: 1;
			losses_kit_advanced_solo_slime: 5;
			kills_kit_advanced_solo_slime: 5;
			deaths_kit_advanced_solo_slime: 5;
			time_played_kit_advanced_solo_slime: 403;
			xp_kit_advanced_solo_slime: 20;
			wins_kit_advanced_solo_sloth: 1;
			losses_kit_advanced_solo_sloth: 7;
			kills_kit_advanced_solo_sloth: 17;
			deaths_kit_advanced_solo_sloth: 7;
			time_played_kit_advanced_solo_sloth: 857;
			xp_kit_advanced_solo_sloth: 44;
			wins_kit_basic_solo_snowman: 15;
			losses_kit_basic_solo_snowman: 148;
			kills_kit_basic_solo_snowman: 168;
			deaths_kit_basic_solo_snowman: 148;
			time_played_kit_basic_solo_snowman: 694;
			xp_kit_basic_solo_snowman: 486;
			wins_kit_basic_solo_speleologist: 42;
			losses_kit_basic_solo_speleologist: 159;
			kills_kit_basic_solo_speleologist: 294;
			deaths_kit_basic_solo_speleologist: 159;
			time_played_kit_basic_solo_speleologist: 14661;
			xp_kit_basic_solo_speleologist: 1040;
			wins_kit_basic_solo_troll: 8;
			losses_kit_basic_solo_troll: 58;
			kills_kit_basic_solo_troll: 58;
			deaths_kit_basic_solo_troll: 58;
			time_played_kit_basic_solo_troll: 2567;
			xp_kit_basic_solo_troll: 196;
			wins_kit_basic_solo_warlock: 88;
			losses_kit_basic_solo_warlock: 330;
			kills_kit_basic_solo_warlock: 642;
			deaths_kit_basic_solo_warlock: 330;
			time_played_kit_basic_solo_warlock: 25279;
			xp_kit_basic_solo_warlock: 2164;
			wins_kit_advanced_solo_zookeeper: 17;
			losses_kit_advanced_solo_zookeeper: 32;
			kills_kit_advanced_solo_zookeeper: 113;
			deaths_kit_advanced_solo_zookeeper: 32;
			time_played_kit_advanced_solo_zookeeper: 4473;
			xp_kit_advanced_solo_zookeeper: 396;
			"wins_kit_basic_solo_fallen-angel": null;
			"losses_kit_basic_solo_fallen-angel": null;
			"kills_kit_basic_solo_fallen-angel": null;
			"deaths_kit_basic_solo_fallen-angel": null;
			"time_played_kit_basic_solo_fallen-angel": null;
			"xp_kit_basic_solo_fallen-angel": null;
			wins_kit_advanced_solo_engineer: 1;
			losses_kit_advanced_solo_engineer: 6;
			kills_kit_advanced_solo_engineer: 9;
			deaths_kit_advanced_solo_engineer: 6;
			time_played_kit_advanced_solo_engineer: 275;
			xp_kit_advanced_solo_engineer: 28;
			wins_kit_defending_team_armorer: 1956;
			losses_kit_defending_team_armorer: 4100;
			kills_kit_defending_team_armorer: 13552;
			deaths_kit_defending_team_armorer: 4529;
			time_played_kit_defending_team_armorer: 579514;
			xp_kit_defending_team_armorer: 46664;
			wins_kit_attacking_team_archeologist: null;
			losses_kit_attacking_team_archeologist: null;
			kills_kit_attacking_team_archeologist: null;
			deaths_kit_attacking_team_archeologist: null;
			time_played_kit_attacking_team_archeologist: null;
			xp_kit_attacking_team_archeologist: null;
			wins_kit_supporting_team_armorsmith: 25;
			losses_kit_supporting_team_armorsmith: 82;
			kills_kit_supporting_team_armorsmith: 195;
			deaths_kit_supporting_team_armorsmith: 85;
			time_played_kit_supporting_team_armorsmith: 11868;
			xp_kit_supporting_team_armorsmith: 640;
			"wins_kit_defending_team_baseball-player": 43;
			"losses_kit_defending_team_baseball-player": 126;
			"kills_kit_defending_team_baseball-player": 377;
			"deaths_kit_defending_team_baseball-player": 133;
			"time_played_kit_defending_team_baseball-player": 17198;
			"xp_kit_defending_team_baseball-player": 1184;
			wins_kit_defending_team_batguy: null;
			losses_kit_defending_team_batguy: 5;
			kills_kit_defending_team_batguy: 6;
			deaths_kit_defending_team_batguy: 5;
			time_played_kit_defending_team_batguy: 371;
			xp_kit_defending_team_batguy: 12;
			wins_kit_defending_team_cactus: null;
			losses_kit_defending_team_cactus: 1;
			kills_kit_defending_team_cactus: null;
			deaths_kit_defending_team_cactus: 1;
			time_played_kit_defending_team_cactus: 67;
			xp_kit_defending_team_cactus: null;
			wins_kit_mining_team_cannoneer: 32;
			losses_kit_mining_team_cannoneer: 357;
			kills_kit_mining_team_cannoneer: 192;
			deaths_kit_mining_team_cannoneer: 366;
			time_played_kit_mining_team_cannoneer: 21345;
			xp_kit_mining_team_cannoneer: 704;
			wins_kit_mining_team_default: null;
			losses_kit_mining_team_default: 15;
			kills_kit_mining_team_default: 1;
			deaths_kit_mining_team_default: 15;
			time_played_kit_mining_team_default: 311;
			xp_kit_mining_team_default: null;
			wins_kit_defending_team_disco: 3;
			losses_kit_defending_team_disco: 8;
			kills_kit_defending_team_disco: 15;
			deaths_kit_defending_team_disco: 8;
			time_played_kit_defending_team_disco: 954;
			xp_kit_defending_team_disco: 60;
			wins_kit_supporting_team_ecologist: 13;
			losses_kit_supporting_team_ecologist: 72;
			kills_kit_supporting_team_ecologist: 81;
			deaths_kit_supporting_team_ecologist: 74;
			time_played_kit_supporting_team_ecologist: 5721;
			xp_kit_supporting_team_ecologist: 292;
			wins_kit_supporting_team_enchanter: 3;
			losses_kit_supporting_team_enchanter: 13;
			kills_kit_supporting_team_enchanter: 19;
			deaths_kit_supporting_team_enchanter: 13;
			time_played_kit_supporting_team_enchanter: 1893;
			xp_kit_supporting_team_enchanter: 68;
			wins_kit_enderchest_team_enderchest: null;
			losses_kit_enderchest_team_enderchest: 3;
			kills_kit_enderchest_team_enderchest: 1;
			deaths_kit_enderchest_team_enderchest: 3;
			time_played_kit_enderchest_team_enderchest: 342;
			xp_kit_enderchest_team_enderchest: 2;
			wins_kit_attacking_team_enderman: 69;
			losses_kit_attacking_team_enderman: 194;
			kills_kit_attacking_team_enderman: 455;
			deaths_kit_attacking_team_enderman: 197;
			time_played_kit_attacking_team_enderman: 21131;
			xp_kit_attacking_team_enderman: 1600;
			wins_kit_attacking_team_energix: 3;
			losses_kit_attacking_team_energix: 27;
			kills_kit_attacking_team_energix: 34;
			deaths_kit_attacking_team_energix: 27;
			time_played_kit_attacking_team_energix: 2215;
			xp_kit_attacking_team_energix: 98;
			wins_kit_defending_team_farmer: 37;
			losses_kit_defending_team_farmer: 70;
			kills_kit_defending_team_farmer: 187;
			deaths_kit_defending_team_farmer: 78;
			time_played_kit_defending_team_farmer: 10813;
			xp_kit_defending_team_farmer: 744;
			wins_kit_attacking_team_fisherman: 4;
			losses_kit_attacking_team_fisherman: 7;
			kills_kit_attacking_team_fisherman: 16;
			deaths_kit_attacking_team_fisherman: 7;
			time_played_kit_attacking_team_fisherman: 872;
			xp_kit_attacking_team_fisherman: 72;
			wins_kit_defending_team_frog: 279;
			losses_kit_defending_team_frog: 544;
			kills_kit_defending_team_frog: 1791;
			deaths_kit_defending_team_frog: 554;
			time_played_kit_defending_team_frog: 73990;
			xp_kit_defending_team_frog: 6372;
			wins_kit_attacking_team_grenade: 32;
			losses_kit_attacking_team_grenade: 196;
			kills_kit_attacking_team_grenade: 359;
			deaths_kit_attacking_team_grenade: 198;
			time_played_kit_attacking_team_grenade: 18155;
			xp_kit_attacking_team_grenade: 1038;
			wins_kit_defending_team_golem: 1;
			losses_kit_defending_team_golem: 3;
			kills_kit_defending_team_golem: 3;
			deaths_kit_defending_team_golem: 4;
			time_played_kit_defending_team_golem: 335;
			xp_kit_defending_team_golem: 16;
			wins_kit_defending_team_guardian: 2;
			losses_kit_defending_team_guardian: 8;
			kills_kit_defending_team_guardian: 15;
			deaths_kit_defending_team_guardian: 9;
			time_played_kit_defending_team_guardian: 715;
			xp_kit_defending_team_guardian: 50;
			wins_kit_supporting_team_healer: 8;
			losses_kit_supporting_team_healer: 48;
			kills_kit_supporting_team_healer: 82;
			deaths_kit_supporting_team_healer: 49;
			time_played_kit_supporting_team_healer: 4851;
			xp_kit_supporting_team_healer: 244;
			wins_kit_attacking_team_hunter: 3;
			losses_kit_attacking_team_hunter: 11;
			kills_kit_attacking_team_hunter: 17;
			deaths_kit_attacking_team_hunter: 13;
			time_played_kit_attacking_team_hunter: 1467;
			xp_kit_attacking_team_hunter: 64;
			wins_kit_attacking_team_jester: 23;
			losses_kit_attacking_team_jester: 20;
			kills_kit_attacking_team_jester: 121;
			deaths_kit_attacking_team_jester: 22;
			time_played_kit_attacking_team_jester: 4779;
			xp_kit_attacking_team_jester: 472;
			wins_kit_attacking_team_knight: 87;
			losses_kit_attacking_team_knight: 644;
			kills_kit_attacking_team_knight: 933;
			deaths_kit_attacking_team_knight: 663;
			time_played_kit_attacking_team_knight: 20533;
			xp_kit_attacking_team_knight: 2736;
			wins_kit_supporting_team_pharaoh: null;
			losses_kit_supporting_team_pharaoh: 10;
			kills_kit_supporting_team_pharaoh: 9;
			deaths_kit_supporting_team_pharaoh: 10;
			time_played_kit_supporting_team_pharaoh: 1203;
			xp_kit_supporting_team_pharaoh: 18;
			"wins_kit_attacking_team_pig-rider": 2;
			"losses_kit_attacking_team_pig-rider": 11;
			"kills_kit_attacking_team_pig-rider": 15;
			"deaths_kit_attacking_team_pig-rider": 11;
			"time_played_kit_attacking_team_pig-rider": 1050;
			"xp_kit_attacking_team_pig-rider": 50;
			wins_kit_supporting_team_pyro: null;
			losses_kit_supporting_team_pyro: 4;
			kills_kit_supporting_team_pyro: 9;
			deaths_kit_supporting_team_pyro: 4;
			time_played_kit_supporting_team_pyro: 275;
			xp_kit_supporting_team_pyro: 18;
			wins_kit_supporting_team_princess: 2;
			losses_kit_supporting_team_princess: null;
			kills_kit_supporting_team_princess: 9;
			deaths_kit_supporting_team_princess: null;
			time_played_kit_supporting_team_princess: 311;
			xp_kit_supporting_team_princess: 38;
			wins_kit_supporting_team_rookie: 36;
			losses_kit_supporting_team_rookie: 434;
			kills_kit_supporting_team_rookie: 444;
			deaths_kit_supporting_team_rookie: 443;
			time_played_kit_supporting_team_rookie: 11817;
			xp_kit_supporting_team_rookie: 1248;
			wins_kit_attacking_team_salmon: 10;
			losses_kit_attacking_team_salmon: 20;
			kills_kit_attacking_team_salmon: 60;
			deaths_kit_attacking_team_salmon: 23;
			time_played_kit_attacking_team_salmon: 3501;
			xp_kit_attacking_team_salmon: 220;
			wins_kit_attacking_team_scout: 724;
			losses_kit_attacking_team_scout: 1840;
			kills_kit_attacking_team_scout: 4701;
			deaths_kit_attacking_team_scout: 1858;
			time_played_kit_attacking_team_scout: 198959;
			xp_kit_attacking_team_scout: 16763;
			wins_kit_attacking_team_slime: null;
			losses_kit_attacking_team_slime: 4;
			kills_kit_attacking_team_slime: 1;
			deaths_kit_attacking_team_slime: 4;
			time_played_kit_attacking_team_slime: 234;
			xp_kit_attacking_team_slime: 2;
			wins_kit_attacking_team_sloth: null;
			losses_kit_attacking_team_sloth: null;
			kills_kit_attacking_team_sloth: null;
			deaths_kit_attacking_team_sloth: null;
			time_played_kit_attacking_team_sloth: null;
			xp_kit_attacking_team_sloth: null;
			wins_kit_attacking_team_snowman: null;
			losses_kit_attacking_team_snowman: 2;
			kills_kit_attacking_team_snowman: 1;
			deaths_kit_attacking_team_snowman: 2;
			time_played_kit_attacking_team_snowman: 101;
			xp_kit_attacking_team_snowman: 2;
			wins_kit_mining_team_speleologist: 67;
			losses_kit_mining_team_speleologist: 213;
			kills_kit_mining_team_speleologist: 473;
			deaths_kit_mining_team_speleologist: 226;
			time_played_kit_mining_team_speleologist: 25078;
			xp_kit_mining_team_speleologist: 1616;
			wins_kit_supporting_team_troll: 4;
			losses_kit_supporting_team_troll: 6;
			kills_kit_supporting_team_troll: 25;
			deaths_kit_supporting_team_troll: 6;
			time_played_kit_supporting_team_troll: 1140;
			xp_kit_supporting_team_troll: 90;
			wins_kit_supporting_team_warlock: null;
			losses_kit_supporting_team_warlock: 2;
			kills_kit_supporting_team_warlock: 3;
			deaths_kit_supporting_team_warlock: 2;
			time_played_kit_supporting_team_warlock: 166;
			xp_kit_supporting_team_warlock: 6;
			wins_kit_supporting_team_zookeeper: 1;
			losses_kit_supporting_team_zookeeper: 12;
			kills_kit_supporting_team_zookeeper: 12;
			deaths_kit_supporting_team_zookeeper: 12;
			time_played_kit_supporting_team_zookeeper: 958;
			xp_kit_supporting_team_zookeeper: 34;
			"wins_kit_attacking_team_fallen-angel": null;
			"losses_kit_attacking_team_fallen-angel": null;
			"kills_kit_attacking_team_fallen-angel": null;
			"deaths_kit_attacking_team_fallen-angel": null;
			"time_played_kit_attacking_team_fallen-angel": null;
			"xp_kit_attacking_team_fallen-angel": null;
			"wins_kit_mythical_end-lord": 662;
			"losses_kit_mythical_end-lord": 2056;
			"kills_kit_mythical_end-lord": 4581;
			"deaths_kit_mythical_end-lord": 2064;
			"time_played_kit_mythical_end-lord": 176610;
			"xp_kit_mythical_end-lord": 31558;
			wins_kit_mythical_thundermeister: 33;
			losses_kit_mythical_thundermeister: 89;
			kills_kit_mythical_thundermeister: 249;
			deaths_kit_mythical_thundermeister: 91;
			time_played_kit_mythical_thundermeister: 10315;
			xp_kit_mythical_thundermeister: 1656;
			wins_kit_mythical_cryomancer: 12;
			losses_kit_mythical_cryomancer: 37;
			kills_kit_mythical_cryomancer: 84;
			deaths_kit_mythical_cryomancer: 37;
			time_played_kit_mythical_cryomancer: 3031;
			xp_kit_mythical_cryomancer: 576;
			wins_kit_mythical_fishmonger: 1;
			losses_kit_mythical_fishmonger: 3;
			kills_kit_mythical_fishmonger: 5;
			deaths_kit_mythical_fishmonger: 3;
			time_played_kit_mythical_fishmonger: 412;
			xp_kit_mythical_fishmonger: 40;
			wins_kit_mythical_chronobreaker: 8;
			losses_kit_mythical_chronobreaker: 25;
			kills_kit_mythical_chronobreaker: 46;
			deaths_kit_mythical_chronobreaker: 25;
			time_played_kit_mythical_chronobreaker: 1888;
			xp_kit_mythical_chronobreaker: 344;
			"wins_kit_mythical_monster-trainer": null;
			"losses_kit_mythical_monster-trainer": 1;
			"kills_kit_mythical_monster-trainer": 2;
			"deaths_kit_mythical_monster-trainer": 1;
			"time_played_kit_mythical_monster-trainer": 51;
			"xp_kit_mythical_monster-trainer": 8;
			"wins_kit_mythical_nether-lord": 1;
			"losses_kit_mythical_nether-lord": 4;
			"kills_kit_mythical_nether-lord": 9;
			"deaths_kit_mythical_nether-lord": 4;
			"time_played_kit_mythical_nether-lord": 381;
			"xp_kit_mythical_nether-lord": 56;
			wins_kit_mini_solo_armorer: null;
			losses_kit_mini_solo_armorer: null;
			kills_kit_mini_solo_armorer: null;
			deaths_kit_mini_solo_armorer: null;
			time_played_kit_mini_solo_armorer: null;
			xp_kit_mini_solo_armorer: null;
			wins_kit_mini_solo_athlete: null;
			losses_kit_mini_solo_athlete: null;
			kills_kit_mini_solo_athlete: 3;
			deaths_kit_mini_solo_athlete: null;
			time_played_kit_mini_solo_athlete: 158;
			xp_kit_mini_solo_athlete: 14;
			wins_kit_mini_solo_blacksmith: null;
			losses_kit_mini_solo_blacksmith: null;
			kills_kit_mini_solo_blacksmith: null;
			deaths_kit_mini_solo_blacksmith: null;
			time_played_kit_mini_solo_blacksmith: null;
			xp_kit_mini_solo_blacksmith: null;
			wins_kit_mini_solo_bowman: null;
			losses_kit_mini_solo_bowman: null;
			kills_kit_mini_solo_bowman: null;
			deaths_kit_mini_solo_bowman: null;
			time_played_kit_mini_solo_bowman: null;
			xp_kit_mini_solo_bowman: null;
			wins_kit_mini_solo_champion: 24;
			losses_kit_mini_solo_champion: null;
			kills_kit_mini_solo_champion: 59;
			deaths_kit_mini_solo_champion: null;
			time_played_kit_mini_solo_champion: 4129;
			xp_kit_mini_solo_champion: 577;
			wins_kit_mini_solo_healer: 1;
			losses_kit_mini_solo_healer: null;
			kills_kit_mini_solo_healer: 2;
			deaths_kit_mini_solo_healer: null;
			time_played_kit_mini_solo_healer: 43;
			xp_kit_mini_solo_healer: 19;
			wins_kit_mini_solo_hound: null;
			losses_kit_mini_solo_hound: null;
			kills_kit_mini_solo_hound: null;
			deaths_kit_mini_solo_hound: null;
			time_played_kit_mini_solo_hound: null;
			xp_kit_mini_solo_hound: null;
			wins_kit_mini_solo_magician: 46;
			losses_kit_mini_solo_magician: null;
			kills_kit_mini_solo_magician: 110;
			deaths_kit_mini_solo_magician: null;
			time_played_kit_mini_solo_magician: 4927;
			xp_kit_mini_solo_magician: 1083;
			wins_kit_mini_solo_paladin: 28;
			losses_kit_mini_solo_paladin: null;
			kills_kit_mini_solo_paladin: 51;
			deaths_kit_mini_solo_paladin: null;
			time_played_kit_mini_solo_paladin: 3975;
			xp_kit_mini_solo_paladin: 651;
			wins_kit_mini_solo_pyromancer: null;
			losses_kit_mini_solo_pyromancer: null;
			kills_kit_mini_solo_pyromancer: null;
			deaths_kit_mini_solo_pyromancer: null;
			time_played_kit_mini_solo_pyromancer: null;
			xp_kit_mini_solo_pyromancer: null;
			wins_kit_mini_solo_scout: 157;
			losses_kit_mini_solo_scout: null;
			kills_kit_mini_solo_scout: 336;
			deaths_kit_mini_solo_scout: null;
			time_played_kit_mini_solo_scout: 17202;
			xp_kit_mini_solo_scout: 3556;
		};
		descentStats: {
			avarice: 5;
			projectiletrail_kings: true;
			grand_slam: 3;
			tenacity: 1;
			shard_seeker: 5;
			emblem_sigma_icon: false;
			meticulous_miner: 5;
			hide_and_seek: 1;
			killeffect_vaporized: true;
			midas_gift: 4;
			angels_offering: 1;
			killmessages_flex: true;
			first_blood: 1;
			fortune_teller: 1;
			fireproof: 1;
			cage_piston: false;
			corrupted_coinage: 2;
			librarian: 1;
			luckier_charm: 3;
			apothecary: 1;
			victorydance_super_sheep: true;
			cloak_falling_angel: true;
			killeffect_purple_tornado: true;
			sorcerers_spell: 5;
			fruit_finder: 1;
			ender_end_game: 1;
			smarty_pants: 1;
			killmessages_rainbow: true;
			diamond_in_the_rough: 1;
			telekinesis: 1;
			cage_balancing_act: true;
			distillery_discount: 1;
			archeologist_kit_opal: true;
			opalsmith: 1;
			double_edged_sword: 1;
			quest_masters_friend: 4;
			balloon_dual_dragon: false;
			deathcry_eponymous_dragon: false;
			kill_xp_boost: 1;
			perk_slot: 1;
			projectiletrail_descent_dragon: false;
			emblem_delta_icon: false;
			victorydance_double_dragons_descent: false;
			cloak_angels_prestige: false;
			scheme_demigod: false;
			fallen_angel_kit: false;
			xezbeth_luck: 2;
			harvesting_season: 4;
			favor_of_the_angel: true;
		};
		source: "cache";
	};
}

const PlayerTitle: React.FC<PlayerTitleProps> = async ({ playerName, data }) => {
	const statusRes = await fetch(`https://skywarstools.com/api/status?player=${encodeURIComponent(playerName)}`);
	if (!statusRes.ok) {
		console.error(statusRes.statusText);
		throw new Error("Failed to fetch player status");
	}
	const statusData = await statusRes.json();

	let level: string = data.generic.display.levelFormattedWithBrackets;
	if (!level) level = "§7[1★]";

	const rank = getPlayerRank(data.generic.display);

	let guildColor: string = "§7";
	if (data.generic.display.tag) {
		switch (data.generic.display.tagColor) {
			case "YELLOW":
				guildColor = "§e";
				break;
			case "DARK_AQUA":
				guildColor = "§3";
				break;
			case "DARK_GREEN":
				guildColor = "§2";
				break;
			case "GOLD":
				guildColor = "§6";
				break;
			default:
				guildColor = "§7";
		}
	}

	return (
		<div className="bg-gray-900 h-22 lg:h-25 w-full flex items-center">
			<div className="z-10 relative">
				<Image
					alt="player avatar"
					width={100}
					height={100}
					className="rounded h-20 w-20 lg:h-28 lg:w-28 mb-6 lg:mb-12 mx-2 lg:mx-4 z-10 hidden lg:inline"
					src={`https://www.mc-heads.net/avatar/${playerName}`}
				/>
				{/* Online status indicator overlay */}
				{statusData.session && (
					// TODO Refactor this, pull JS out of the component (instead of nested ternaries)
					<span
						title={
							statusData.session.online
								? statusData.session.gameType === "SKYWARS"
									? `Player is in SkyWars! (${statusData.session.gameType} - ${statusData.session.mode})`
									: `${statusData.session.gameType} - ${statusData.session.mode}`
								: "(Appears) Offline"
						}
						// Bit fucky this - absolute positioning to the right of playerName
						className={`absolute top-[-12px] right-[-25px] lg:top-[-8] lg:right-[-10] border-2 border-black rounded-full w-5 h-5 block ${
							statusData.session.online
								? statusData.session.gameType === "SKYWARS"
									? "bg-green-500"
									: "bg-yellow-400"
								: "bg-red-500"
						}`}
					></span>
				)}
			</div>

			<div className="w-full lg:h-22 text-3xl lg:text-4xl flex flex-col justify-center px-4 text-center lg:text-left">
				<MinecraftText>{`${level} ${rank.prefix} ${data.player} ${guildColor}[${data.generic.display.tag}]`}</MinecraftText>{" "}
				{/* Ideally we only have guild tag on desktop*/}
				<div className="text-xl font-montserrat justify-between lg:flex">
					<div className="flex items-center gap-2 text-sm lg:text-lg">
						{/* <span className="text-2xl">🇳🇱</span> */}
						<span className="font-semibold hidden lg:inline">
							{data.generic.stats.guild} ({data.generic.stats.guildRank})
						</span>
					</div>

					<div className="hidden lg:flex items-center gap-2 mx-4">
						<a
							href={`https://namemc.com/profile/${playerName}`}
							target="_blank"
							rel="noopener noreferrer"
							className="animate-press-hard"
							style={{ display: "flex" }}
							title="View on NameMC"
						>
							<Image
								src="/namemc.png"
								alt="NameMC logo"
								width={32}
								height={32}
								className="inline h-6 w-6"
							/>
						</a>
						<a
							href={`https://www.shmeado.club/player/stats/${playerName}/SkyWars/Table/`}
							target="_blank"
							rel="noopener noreferrer"
							className="inline h-6 w-6 animate-press-hard"
							style={{ display: "flex" }}
							title="View on Shmeado"
						>
							{/* Twemoji smile emoji */}
							<span
								dangerouslySetInnerHTML={{
									__html: twemoji.parse("😁", { folder: "svg", ext: ".svg" }),
								}}
								style={{ width: 42, height: 42, display: "inline-block" }}
							/>
						</a>
						<a
							href={`https://plancke.io/hypixel/player/stats/${playerName}`}
							target="_blank"
							rel="noopener noreferrer"
							className="animate-press-hard"
							style={{ display: "flex" }}
							title="View on Plancke"
						>
							<Image
								src="/plancke.png"
								alt="Plancke logo"
								width={32}
								height={32}
								className="inline h-6 w-6"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlayerTitle;
