import { Brewery, OverallResponse } from "@/app/types/OverallResponse";
import React from "react";
import { calcLevel } from "@/app/utils/Utils";
import MinecraftText from "@/app/utils/MinecraftText";
import { Check, X } from "lucide-react";

const Potions: React.FC<{ response: OverallResponse }> = ({ response }) => {
	const brewery: Brewery = response.stats.brewery as Brewery;

	const potions = {
		gilded_tonic: {
			name: "Gilded Tonic",
			icon: "items/blaze_powder.png",
			lore: {
				"0": "§6Gilded Tonic§r",

				"2": "",
				"3": "§5§7§7Grants a §a10% §7chance to earn a",
				"4": "§5§7§6Golden Apple §7on kill.",
				"5": "§5§7§8(stacks with Lucky Charm)",
				"6": "",
				"7": "§5§a+10% §7chance to get §bx2 Souls §7for wins",
				"8": "§5§dx1.1 SkyWars XP §7for wins",
				"9": "§5§6x2 Coins §7for wins",
				"10": "",
				"11": "§5§7Cost:",
				"12": "§5§91 Opal",
			},
		},
		ender_elixir: {
			name: "Ender Elixir",
			icon: "items/ender_eye.png",
			lore: {
				"0": "§dEnder Elixir§r",

				"2": "",
				"3": "§5§7§7Grants a §a15% §7chance to earn an",
				"4": "§5§7§3Ender Pearl §7on void kill.",
				"5": "§5§7§8(stacks with Black Magic)",
				"6": "",
				"7": "§5§bx2 Souls §7for wins",
				"8": "§5§dx1.1 SkyWars XP §7for wins",
				"9": "§5§6+10% Coins §7for wins",
				"10": "",
				"11": "§5§7Cost:",
				"12": "§5§61,000,000 Coins",
			},
		},
		corrupting_brew: {
			name: "Corrupting Brew",
			icon: "items/spider_eye_fermented.png",
			lore: {
				"0": "§5Corrupting Brew§r",

				"2": "",
				"3": "§5§7§5x2 Corruption Chance",
				"4": "",
				"5": "§5§a+20% §7chance to get §bx2 Souls §7for wins",
				"6": "§5§dx1.2 SkyWars XP §7for wins",
				"7": "§5§6+20% Coins §7for wins",
				"8": "",
				"9": "§5§7Cost:",
				"10": "§5§91 Opal",
				"11": "§5§6500,000 Coins",
			},
		},
		builders_blend: {
			name: "Builder's Blend",
			icon: "items/magma_cream.png",
			lore: {
				"0": "§2Builder's Blend§r",
				"2": "",
				"3": "§5§7§7Grants a §a90% §7chance to not consume",
				"4": "§5§7placeable blocks.",
				"5": "§5§7§8(stacks with Bridger)",
				"6": "",
				"7": "§5§a+30% §7chance to get §bx2 Souls §7for wins",
				"8": "§5§dx1.3 SkyWars XP §7for wins",
				"9": "§5§6+30% Coins §7for wins",
				"10": "",
				"11": "§5§7Cost:",
				"12": "§5§91 Opal",
				"13": "§5§61,000,000 Coins",
			},
		},
		robinhoods_concoction: {
			name: "Robinhood's Concoction",
			icon: "items/ghast_tear.png",
			lore: {
				"0": "§aRobinhood's Concoction§r",

				"2": "",
				"3": "§5§7§7Earn §a3 §7Arrows on bow kills. Also",
				"4": "§5§7grants a §a5% §7chance for Arrows you",
				"5": "§5§7shoot to light on fire.",
				"6": "§5§7§8(stacks with Blazing Arrows)",
				"7": "",
				"8": "§5§d+1 SkyWars XP §7for bow kills",
				"9": "§5§dx1.2 SkyWars XP §7for wins",
				"10": "§5§6+30% Coins §7for wins",
				"11": "",
				"12": "§5§7Cost:",
				"13": "§5§92 Opals",
				"14": "§5§6500,000 Coins",
			},
		},
		brawlers_refreshment: {
			name: "Brawler's Refreshment",
			icon: "items/carrot_golden.png",
			lore: {
				"0": "§9Brawler's Refreshment§r",

				"2": "",
				"3": "§5§7§7Heal §c1❤ §7on melee kills.",
				"4": "",
				"5": "§5§a+10% §7chance to get §bx2 Souls §7for wins",
				"6": "§5§d+1 SkyWars XP §7for melee kills",
				"7": "§5§dx1.2 SkyWars XP §7for wins",
				"8": "§5§6+30% Coins §7for wins",
				"9": "",
				"10": "§5§7Cost:",
				"11": "§5§92 Opals",
				"12": "§5§61,000,000 Coins",
			},
		},
		level_up_energy: {
			name: "Level Up Energy",
			icon: "items/melon_speckled.png",
			lore: {
				"0": "§cLevel UP Energy§r",

				"2": "",
				"3": "§5§a+50% §7chance to get §bx2 Souls §7for wins",
				"4": "§5§d+1 SkyWars XP §7for kills and assists",
				"5": "§5§dx1.3 SkyWars XP §7for wins",
				"6": "§5§6+50% Coins §7for wins",
				"7": "",
				"8": "§5§7Cost:",
				"9": "§5§93 Opals",
				"10": "§5§62,500,000 Coins",
			},
		},
	};

	return (
		<>
			<span className="text-2xl text-red-500">Angel&apos;s Brewery</span>
			<span className="flex flex-row gap-2">
				Eligibility: ({Math.floor(calcLevel(response.stats.skywars_experience ?? 0))}/25)
				{Math.floor(calcLevel(response.stats.skywars_experience ?? 0)) >= 25 ? (
					<Check className="text-green-500" />
				) : (
					<X className="text-red-500" />
				)}
			</span>
			<div className="w-full flex flex-col items-center py-4 gap-4">
				{Object.keys(potions).map((key) => {
					const potion = potions[key as keyof typeof potions];
					let gamesLeft = brewery ? (brewery[key as keyof Brewery] as number) ?? 0 : 0;
					gamesLeft = Math.max(0, gamesLeft);

					return (
						<div key={key} className="flex flex-row justify-center items-center gap-6 w-full p-0 rounded-2xl">
							<div
								className={`h-fit w-75 bg-layer rounded-2xl p-4 flex flex-col text-center items-center relative gap-2${
									response.stats.brewery_active === key ? " enchanted" : ""
								}`}
							>
								<h2 className="font-semibold text-l lg:text-xl h-15">
									<MinecraftText>{potion.lore[0]}</MinecraftText>
								</h2>
								<img
									src={"/" + potion.icon}
									height={50}
									width={50}
									style={{ imageRendering: "pixelated" }}
									className="p-0.5"
									alt=""
								/>
								{response.stats.brewery_active && response.stats.brewery_active == key ? (
									<span className="text-green-500 font-semibold">Enabled</span>
								) : (
									<span className="text-red-500 font-semibold">Disabled</span>
								)}
								<span className="font-semibold">{gamesLeft} games left</span>
							</div>
							<div className="flex flex-col justify-center w-120 p-3 lg:p-4 text-sm lg:text-lg bg-layer rounded-2xl">
								{Object.values(potion.lore)
									.filter((_, i) => i !== 0)
									.map((line, i) => (
										<MinecraftText key={i}>{line}</MinecraftText>
									))}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Potions;
