import { DescentItem, DescentMap } from "../types/DescentMap";

export function calcLevel(xp: number): number {
	const perLevelXp = [10, 25, 50, 75, 100, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 4500, 5000];

	let level = 1;
	for (let i = 0; i < perLevelXp.length; i++) {
		if (xp < perLevelXp[i]) {
			return level + xp / perLevelXp[i];
		}
		xp -= perLevelXp[i];
		level++;
	}

	level += Math.floor(xp / 5000);
	const remainder = xp % 5000;
	return level + remainder / 5000;
}

export function calcLevelOld(xp: number): number {
	const xps = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000];
	let exactLevel = 0;
	if (xp >= 15000) {
		exactLevel = (xp - 15000) / 10000 + 12;
		// Calculate the exactLevel for players whose level is 12 or above.
	} else {
		for (let i = 0; i < xps.length; i++) {
			// Loop through the xps array and determine the integer value of the player's level.
			if (xp < xps[i]) {
				exactLevel = i + (xp - xps[i - 1]) / (xps[i] - xps[i - 1]);
				break;
				// If xp < xps[i], the integer value of level is found. Hence, calculate the exactLevel and stop the loop.
			}
		}
	}
	return exactLevel;
}

export function formatPlaytime(playtime: number): string {
	const days = Math.floor(playtime / (24 * 3600));
	playtime %= 24 * 3600;
	const hours = Math.floor(playtime / 3600);
	playtime %= 3600;
	const minutes = Math.floor(playtime / 60);

	const result = [];
	if (days > 0) result.push(`${days}d`);
	if (hours > 0) result.push(`${hours}h`);
	result.push(`${minutes}m`);
	return result.join(" ");
}

export function toCamelCase(input: string): string {
	// Convert input string to lower case and split by non-alphanumeric characters
	const words = input.toLowerCase().split(/[^a-z0-9]+/);

	// Combine the words into camel case
	return words
		.map((word, index) => {
			// Capitalize the first letter of each word
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
}

export function parseKitStatsKey(key: string): {
	original: string;
	stat: string;
	mode: string;
	kit: string;
} {
	let stat;
	let mode;
	let kitName;
	if (key.includes("mythical")) {
		const parts = key.split("_kit_");
		stat = parts[0];
		const kit = parts[1];

		const kitParts = kit.split("_");
		mode = "mythical";
		kitName = kitParts[1];
	} else {
		const parts = key.split("kit_");
		stat = parts[0];
		const kit = parts[1];

		const kitParts = kit.split("_");
		mode = kitParts[1];
		kitName = kitParts[2];
	}
	// console.log(key, stat, mode, kitName);
	return {
		original: key,
		stat: stat,
		mode: mode,
		kit: toCamelCase(kitName),
	};
}

export function calcHypixelLevel(experience: number) {
	const level = Math.sqrt(experience / 1250 + 12.25) - 2.5;
	const floored = Math.round((level + Number.EPSILON) * 100) / 100;
	return floored.toString();
}

type TimeAgoOptions = {
	showSeconds?: boolean;
	showMinutes?: boolean;
	showHours?: boolean;
	showDays?: boolean;
	showYears?: boolean;
};
export function timeAgo(
	unixTimestamp: number,
	options: TimeAgoOptions = {
		showSeconds: false,
		showMinutes: true,
		showHours: true,
		showDays: true,
		showYears: true,
	}
): string {
	const now = Math.floor(Date.now() / 1000);
	let diff = now - unixTimestamp;

	if (diff < 0) return "in the future";

	const years = Math.floor(diff / (365 * 24 * 3600));
	diff %= 365 * 24 * 3600;
	const days = Math.floor(diff / (24 * 3600));
	diff %= 24 * 3600;
	const hours = Math.floor(diff / 3600);
	diff %= 3600;
	const minutes = Math.floor(diff / 60);
	const seconds = diff % 60;

	const parts: string[] = [];
	if (options.showYears && years > 0) parts.push(`${years}y`);
	if (options.showDays && days > 0) parts.push(`${days}d`);
	if (options.showHours && hours > 0) parts.push(`${hours}h`);
	if (options.showMinutes && minutes > 0) parts.push(`${minutes}m`);
	if (options.showSeconds && seconds > 0 && parts.length === 0) parts.push(`${seconds}s`);

	return parts.length > 0 ? `${parts.join(" ")} ago` : "just now";
}

export function formatTimestampToVerboseDate(timestamp: number): string {
	if (isNaN(timestamp)) {
		return "Invalid date"; // Handle NaN case
	}
	const date = new Date(timestamp);

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};
	return date.toLocaleDateString("en-US", options);
}

export function calcKitPrestigeLevel(xp: number): number {
	const perLevelXp = [1000, 2500, 5000, 10000, 25000, 50000, 75000];

	if (xp > perLevelXp[perLevelXp.length - 1]) {
		return 7;
	}

	let level = 0;
	for (let i = 0; i < perLevelXp.length; i++) {
		if (xp < perLevelXp[i]) {
			return level + xp / perLevelXp[i];
		}
		level++;
	}
	return 0; // shouldnt be hit - this keeps typescript happy
}
export function calcKitPrestigeExp(level: number): number {
	const perLevelXp = [1000, 2500, 5000, 10000, 25000, 50000, 75000];
	return perLevelXp[level - 1] || 0; // Return 0 if level is out of bounds
}

export function calcEXPFromLevel(level: number): number {
	// sw level that is

	const perLevelXp = [10, 25, 50, 75, 100, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 4500, 5000];

	if (level <= 1) return 0;

	const fullLevel = Math.floor(level);
	const fractional = level - fullLevel;
	let xp = 0;

	for (let i = 0; i < fullLevel - 1 && i < perLevelXp.length; i++) {
		xp += perLevelXp[i];
	}

	if (fullLevel - 1 < perLevelXp.length) {
		xp += fractional * perLevelXp[fullLevel - 1];
	} else {
		xp += (fullLevel - 1 - perLevelXp.length) * 5000;
		xp += fractional * 5000;
	}

	return xp;
}

// Skywars leveling system

export type PrestigeObject = {
	currentColor: string;
	emblem: string;
	icon: string;
	name: string;
	rank: string | string[];
};

const prestigeColors: { [key: number]: PrestigeObject } = {
	0: {
		rank: "§7",
		emblem: "§7",
		name: "Default",
		currentColor: "#808080", // GRAY
		icon: "✯",
	}, // GRAY
	10: {
		rank: "§f",
		emblem: "§f",
		name: "Iron",
		currentColor: "#D4D4D4", // SILVER
		icon: "✙",
	}, // WHITE
	20: {
		rank: "§6",
		emblem: "§6",
		name: "Gold",
		currentColor: "#FFD700", // GOLD
		icon: "❤",
	}, // GOLD
	30: {
		rank: "§b",
		emblem: "§b",
		name: "Diamond",
		currentColor: "#00FFFF", // DIAMOND BLUE
		icon: "☠",
	}, // AQUA
	40: {
		rank: "§c",
		emblem: "§c",
		name: "Ruby",
		currentColor: "#E0115F", // RUBY RED
		icon: "❦",
	}, // RED
	50: {
		rank: "§d",
		emblem: "§d",
		name: "Crystal",
		currentColor: "#E6E6FA", // LAVENDER
		icon: "✵",
	}, // LIGHT_PURPLE
	60: {
		rank: "§5",
		emblem: "§5",
		name: "Amethyst",
		currentColor: "#9966CC", // AMETHYST PURPLE
		icon: "☯",
	}, // DARK_PURPLE
	70: {
		rank: "§9",
		emblem: "§9",
		name: "Opal",
		currentColor: "#1E90FF", // DODGER BLUE
		icon: "❣",
	}, // BLUE
	80: {
		rank: "§e",
		emblem: "§e",
		name: "Topaz",
		currentColor: "#FFC87C", // TOPAZ ORANGE
		icon: "✦",
	}, // YELLOW
	90: {
		rank: "§a",
		emblem: "§a",
		name: "Jade",
		currentColor: "#00A86B", // JADE GREEN
		icon: "✰",
	}, // GREEN
	100: {
		rank: ["§c", "§6", "§e", "§a", "§d"],
		emblem: "§b",
		name: "Mythic I",
		currentColor: "#FF69B4", // HOT PINK
		icon: "@_@",
	}, // MYTHIC 1
	110: {
		rank: ["§4", "§c", "§c", "§c", "§4"],
		emblem: "§c",
		name: "Bloody",
		currentColor: "#8B0000", // DARK RED
		icon: "✈",
	}, // BLOODY
	120: {
		rank: "§1",
		emblem: "§1",
		name: "Cobalt",
		currentColor: "#0047AB", // COBALT BLUE
		icon: "✈",
	},
	130: {
		rank: ["§c", "§f", "§f", "§f", "§c"],
		emblem: "§f",
		name: "Content",
		currentColor: "#FFDAB9", // PEACH
		icon: "✠",
	}, // CONTENT
	140: {
		rank: "§4",
		emblem: "§4",
		name: "Crimson",
		currentColor: "#DC143C", // CRIMSON RED
		icon: "♕",
	}, // CRIMSON
	150: {
		rank: ["§6", "§e", "§e", "§e", "§6"],
		emblem: "§e",
		name: "Firefly",
		currentColor: "#FFA500", // ORANGE
		icon: "δvδ",
	}, // TITANIUM II
	160: {
		rank: "§2",
		emblem: "§2",
		name: "Emerald",
		currentColor: "#50C878", // EMERALD GREEN
		icon: "∴",
	}, // EMERALD
	170: {
		rank: ["§1", "§9", "§9", "§9", "§1"],
		emblem: "§9",
		name: "Abyss",
		currentColor: "#191970", // MIDNIGHT BLUE
		icon: "✰",
	}, // ABYSS
	180: {
		rank: "§3",
		emblem: "§3",
		name: "Sapphire",
		currentColor: "#0F52BA", // SAPPHIRE BLUE
		icon: "⁑",
	}, // Sapphire
	190: {
		rank: ["§4", "§e", "§e", "§e", "§4"],
		emblem: "§e",
		name: "Emergency",
		currentColor: "#FF4500", // ORANGE RED
		icon: "☢",
	}, // Emergency
	200: {
		rank: ["§6", "§e", "§a", "§b", "§c"],
		emblem: "§d",
		name: "Mythic II",
		currentColor: "#FF1493", // DEEP PINK
		icon: "zz_zz",
	}, // Mythic II
	210: {
		rank: ["§5", "§d", "§d", "§d", "§5"],
		emblem: "§d",
		name: "Mulberry",
		currentColor: "#C54B8C", // MULBERRY
		icon: "♝",
	},
	220: {
		rank: "§8",
		emblem: "§8",
		name: "Slate",
		currentColor: "#708090", // SLATE GRAY
		icon: "🔱",
	},
	230: {
		rank: ["§d", "§b", "§b", "§b", "§d"],
		emblem: "§b",
		name: "Blood God",
		currentColor: "#8B0000", // DARK BLOOD RED
		icon: "☁",
	},
	240: {
		rank: "§0",
		emblem: "§0",
		name: "Midnight",
		currentColor: "#191970", // MIDNIGHT BLUE
		icon: "⍟",
	},
	250: {
		rank: ["§c", "§e", "§e", "§e", "§c"],
		emblem: "§6",
		name: "Sun",
		currentColor: "#FFD700", // SUN YELLOW
		icon: "♗",
	},
	260: {
		rank: ["§1", "§6", "§6", "§6", "§0"],
		emblem: "§e",
		name: "Bulb",
		currentColor: "#FFFFE0", // LIGHT YELLOW
		icon: "♔",
	},
	270: {
		rank: ["§1", "§3", "§3", "§3", "§1"],
		emblem: "§3",
		name: "Twilight",
		currentColor: "#483D8B", // DARK SLATE BLUE
		icon: "♞",
	},
	280: {
		rank: ["§a", "§1", "§a", "§e", "§1"],
		emblem: "§a",
		name: "Natural",
		currentColor: "#228B22", // FOREST GREEN
		icon: "✏",
	},
	290: {
		rank: ["§9", "§c", "§c", "§c", "§9"],
		emblem: "§c",
		name: "Icicle",
		currentColor: "#ADD8E6", // LIGHT BLUE
		icon: "❈",
	},
	300: {
		rank: ["§f", "§a", "§c", "§d", "§6"],
		emblem: "§c",
		name: "Mythic III",
		currentColor: "#FF69B4", // HOT PINK
		icon: "ಠ_ಠ",
	},
	310: {
		rank: ["§8", "§7", "§7", "§7", "§8"],
		emblem: "§7",
		name: "Graphite",
		currentColor: "#2F4F4F", // DARK SLATE GRAY
		icon: "ಠ_ಠ",
	},
	320: {
		rank: ["§d", "§a", "§a", "§a", "§d"],
		emblem: "§a",
		name: "Punk",
		currentColor: "#FF4500", // ORANGE RED
		icon: "ಠ_ಠ",
	},
	330: {
		rank: ["§e", "§c", "§c", "§c", "§e"],
		emblem: "§c",
		name: "Meltdown",
		currentColor: "#FF6347", // TOMATO
		icon: "ಠ_ಠ",
	},
	340: {
		rank: ["§c", "§a", "§b", "§d", "§a"],
		emblem: "§a",
		name: "Iridescent",
		currentColor: "#DA70D6", // ORCHID
		icon: "ಠ_ಠ",
	},
	350: {
		rank: ["§f", "§f", "§e", "§e", "§6"],
		emblem: "§6",
		name: "Marigold",
		currentColor: "#FFB347", // MARIGOLD ORANGE
		icon: "o...0",
	},
	360: {
		rank: ["§9", "§9", "§b", "§f", "§e"], // need proof
		emblem: "§e",
		name: "Beach",
		currentColor: "#87CEEB", // SKY BLUE
		icon: "ಠ_ಠ",
	},
	370: {
		rank: ["§e", "§e", "§f", "§f", "§6"],
		emblem: "§6",
		name: "Spark",
		currentColor: "#FFD700", // GOLDEN YELLOW
		icon: "ಠ_ಠ",
	},
	380: {
		rank: "§c",
		emblem: "§f",
		name: "Target",
		currentColor: "#FF0000", // BRIGHT RED
		icon: "ಠ_ಠ",
	},
	390: {
		rank: ["§2", "§a", "§a", "§a", "§2"],
		emblem: "§a",
		name: "Limelight",
		currentColor: "#32CD32", // LIME GREEN
		icon: "ಠ_ಠ",
	},
	400: {
		rank: ["§a", "§b", "§d", "§c", "§e"],
		emblem: "§6",
		name: "Mythic IV",
		currentColor: "#FF69B4", // HOT PINK
		icon: ">u<",
	},
	410: {
		rank: ["§3", "§c", "§c", "§c", "§3"],
		emblem: "§c",
		name: "Cerulean",
		currentColor: "#007BA7", // CERULEAN BLUE
		icon: "ಠ_ಠ",
	},
	420: {
		rank: ["§1", "§8", "§8", "§8", "§1"],
		emblem: "§5",
		name: "Magical",
		currentColor: "#8A2BE2", // BLUE VIOLET
		icon: "ಠ_ಠ",
	},
	430: {
		rank: ["§6", "§f", "§f", "§f", "§3"],
		emblem: "§b",
		name: "Luminous",
		currentColor: "#FFFFE0", // LIGHT YELLOW
		icon: "ಠ_ಠ",
	},
	440: {
		rank: ["§a", "§a", "§e", "§e", "§f"],
		emblem: "§f",
		name: "Synthesis",
		currentColor: "#00FA9A", // MEDIUM SPRING GREEN
		icon: "ಠ_ಠ",
	},
	450: {
		rank: ["§4", "§6", "§c", "§6", "§f"], // need proof
		emblem: "§e",
		name: "Burn",
		currentColor: "#FF4500", // ORANGE RED
		icon: "v_v",
	},
	460: {
		rank: ["§9", "§3", "§d", "§9", "§4"], // idk need proof
		emblem: "§5",
		name: "Dramatic",
		currentColor: "#8B0000", // DARK RED
		icon: "ಠ_ಠ",
	},
	470: {
		rank: ["§1", "§7", "§f", "§8", "§8"], // idk need proof
		emblem: "§7",
		name: "Radiant",
		currentColor: "#FFD700", // GOLDEN YELLOW
		icon: "ಠ_ಠ",
	},
	480: {
		rank: ["§1", "§1", "§9", "§3", "§f"],
		emblem: "§b",
		name: "Tidal",
		currentColor: "#4682B4", // STEEL BLUE
		icon: "ಠ_ಠ",
	},
	490: {
		rank: ["§9", "§b", "§f", "§f", "§4"],
		emblem: "§c",
		name: "Firework",
		currentColor: "#FF6347", // TOMATO
		icon: "ಠ_ಠ",
	},
	500: {
		rank: ["§b", "§d", "§c", "§6", "§a"],
		emblem: "§e",
		name: "Mythic V",
		currentColor: "#FF69B4", // HOT PINK
		icon: "ಠ_ಠ",
	},
	9999: {
		rank: "§c",
		emblem: "§c",
		name: "???",
		currentColor: "#FF0000", // BRIGHT RED
		icon: "",
	},
};

export function calcPrestigeObj(level: number): [PrestigeObject, number] {
	if (level === 9999) {
		return [prestigeColors[9999], 9999]; // Return the ??? prestige object directly
	} // Special case for ??? prestige
	if (level >= 500) {
		return [prestigeColors[500], 500];
	}

	const base = Math.floor(level / 10) * 10;

	return [prestigeColors[base], base];
}

export function calcPrestigeTag(level: number): string {
	const prestigeLevel = calcPrestigeObj(level)[1];
	let prestigeTag = `[${level}]`;

	const prestigeLevelKey = prestigeLevel as keyof typeof prestigeColors;

	const prestigeData = prestigeColors[prestigeLevelKey];

	if (Array.isArray(prestigeData?.rank)) {
		prestigeTag = prestigeTag
			.split("")
			.map((char, index) => {
				return prestigeData.rank[index] + char;
			})
			.join("");
	} else {
		prestigeTag = prestigeData.rank + prestigeTag;
		// TODO
	}

	prestigeTag = prestigeTag.slice(0, -1) + prestigeData.emblem + "✯" + prestigeTag.slice(-1);
	return prestigeTag;
}

export function calcNextPrestigeObj(level: number): [PrestigeObject, number] {
	const prestige = calcPrestigeObj(level);
	const prestigeKey = prestige[1];
	const prestigeKeys = Object.keys(prestigeColors).map(Number);
	const currentIndex = prestigeKeys.indexOf(prestigeKey);
	if (currentIndex === -1 || currentIndex === prestigeKeys.length - 1) {
		return [prestigeColors[prestigeKey], prestigeKey]; // Return current prestige if it's the last one or not found
	}
	const nextPrestigeKey = prestigeKeys[currentIndex + 1] as keyof typeof prestigeColors;
	return [prestigeColors[nextPrestigeKey], nextPrestigeKey]; // Return next prestige object and its key as a tuple
}

export function romanize(num: number): string {
	if (isNaN(num)) return "";
	const lookup: [number, string][] = [
		[1000, "M"],
		[900, "CM"],
		[500, "D"],
		[400, "CD"],
		[100, "C"],
		[90, "XC"],
		[50, "L"],
		[40, "XL"],
		[10, "X"],
		[9, "IX"],
		[5, "V"],
		[4, "IV"],
		[1, "I"],
	];
	let roman = "";
	for (const [value, numeral] of lookup) {
		while (num >= value) {
			roman += numeral;
			num -= value;
		}
	}
	return roman;
}

// Descent stuff (ported from JS)
export function combineDescentData(descentPlayer: APIResponse["descentStats"], descentData: DescentMap) {
	const combinedData = { ...descentData };
	Object.keys(combinedData).forEach((key) => {
		const typedKey = key as keyof DescentMap;
		const playerKey = key as keyof APIResponse["descentStats"];
		combinedData[typedKey]["playerOwns"] = descentPlayer[playerKey] ? descentPlayer[playerKey] : false;
	});
	return combinedData;
}

export function calculateOpalsSpent(playerDescentData: DescentMap): number {
	let spent = 0;

	Object.keys(playerDescentData).forEach((key) => {
		const object: DescentItem = playerDescentData[key as keyof DescentMap];
		if (object.playerOwns != false && object.playerOwns) {
			if (object.tiers.length > 1) {
				spent += object.tiers[0].cost * (object.playerOwns as number);
				// Not really a safe cast, but this is ported over from JS, the edge case in which this errors does not occur
			} else {
				spent += object.tiers[0].cost;
			}
		}
	});

	return spent;
}

export function calculateCraftableOpals(souls: number, opalsmith: number) {
	let craftable = 0;
	if (opalsmith == 1) {
		craftable = Math.floor(souls / 1250);
	} else {
		craftable = Math.floor(souls / 1500);
	}
	return craftable;
}

export function calculateOpalProgress(souls: number, opalsmith: number) {
	let progress = 0;
	if (opalsmith == 1) {
		progress = (souls / 1250) % 1;
	} else {
		progress = (souls / 1500) % 1;
	}
	progress *= 100;
	return progress;
}

export type KitPrestigeInfo = {
	name: string;
	minXp: number;
	color: string;
};
export const kitPrestiges: Record<number, KitPrestigeInfo & { rewards: string[] }> = {
	0: { name: "-", minXp: 0, color: "#808080", rewards: [] }, // Gray
	1: { name: "I", minXp: 1000, color: "#ffffff", rewards: ["§650,000 Coins", "§fSilver §7Particle Trail"] }, // Silver
	2: { name: "II", minXp: 2500, color: "#00ff22", rewards: ["§6100,000 Coins", "§2Green §7Particle Trail"] }, // Green
	3: { name: "III", minXp: 5000, color: "#0088ff", rewards: ["§6250,000 Coins", "§9Blue §7Particle Trail"] }, // Blue
	4: { name: "IV", minXp: 10000, color: "#9911aa", rewards: ["§31 §7Opal", "§dPurple §7Particle Trail"] }, // Purple
	5: { name: "V", minXp: 25000, color: "orange", rewards: ["§31 §7Opal", "§6Gold §7Particle Trail"] }, // Gold
	6: { name: "VI", minXp: 50000, color: "#ff22ff", rewards: ["§31 §7Opal", "§dPink §7Particle Trail"] }, // Pink
	7: {
		name: "VII",
		minXp: 75000,
		color: "linear-gradient(90deg, #FF0000 0%, #FF7F00 16%, #FFFF00 33%, #00FF00 50%, #0000FF 66%, #4B0082 83%, #9400D3 100%)",
		rewards: ["§31 §7Opal", "§cR§6a§ei§an§bb§3o§dw §7Particle Trail", "§bPrestige Scheme"],
	}, // Rainbow Gradient
};

export function getKitPrestigeInfo(kitExp: number): KitPrestigeInfo {
	const levels = Object.keys(kitPrestiges)
		.map(Number)
		.sort((a, b) => a - b);

	let lastPrestige = kitPrestiges[0];
	for (const lvl of levels) {
		if (kitExp >= kitPrestiges[lvl].minXp) {
			lastPrestige = kitPrestiges[lvl];
		} else {
			break;
		}
	}
	return lastPrestige;
}

export const fetcher = <T = unknown>(...args: [RequestInfo, RequestInit?]): Promise<T> =>
	fetch(...args).then((res) => res.json() as Promise<T>);
// no explicit any, this is some AI typescript magic
