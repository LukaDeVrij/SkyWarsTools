import { toCamelCase } from "./Utils";

export const keys = [
	{ name: "Survived Players", value: "survived_players" },
	{ name: "Blocks Broken", value: "blocks_broken" },
	{ name: "Blocks Placed", value: "blocks_placed" },
	{ name: "Eggs Thrown", value: "egg_thrown" },
	{ name: "Enderpearls Thrown", value: "enderpearls_thrown" },
	{ name: "Souls Gathered", value: "souls_gathered" },
	{ name: "Souls", value: "souls" },
	{ name: "Opals", value: "opals" },
	{ name: "Soul Well", value: "soul_well" },
	{ name: "Paid Souls", value: "paid_souls" },
	{ name: "Assists", value: "assists" },
	{ name: "Arrows Hit", value: "arrows_hit" },
	{ name: "Arrows Shot", value: "arrows_shot" },
	{ name: "Items Enchanted", value: "items_enchanted" },
	{ name: "Chests Opened", value: "chests_opened" },
	{ name: "Melee Kills", value: "melee_kills" },
	{ name: "Void Kills", value: "void_kills" },
	{ name: "Bow Kills", value: "bow_kills" },
	{ name: "Mob Kills", value: "mob_kills" },
	{ name: "Kits Max Prestige", value: "kitsMaxPrestige" },
	{ name: "Time Played Solo", value: "time_played_solo" },
	{ name: "Time Played Team", value: "time_played_team" },
	{ name: "Time Played Mega", value: "time_played_mega" },
	{ name: "Time Played Ranked", value: "time_played_ranked" },
	{ name: "Time Played Lab", value: "time_played_lab" },
	{ name: "Time Played Mini", value: "time_played_mini" },
	{ name: "Heads Eww", value: "heads_eww" },
	{ name: "Heads Yucky", value: "heads_yucky" },
	{ name: "Heads Meh", value: "heads_meh" },
	{ name: "Heads Decent", value: "heads_decent" },
	{ name: "Heads Salty", value: "heads_salty" },
	{ name: "Heads Tasty", value: "heads_tasty" },
	{ name: "Heads Succulent", value: "heads_succulent" },
	{ name: "Heads Divine", value: "heads_divine" },
	{ name: "Heads Heavenly", value: "heads_heavenly" },
	{ name: "Heads Ethereal", value: "heads_ethereal" },
	{ name: "Heads Indescribable", value: "heads_indescribable" },
	{ name: "Heads Special", value: "heads_special" },
	// Ratings pattern: SkyWars_skywars_rating_{season}_{year}_{type}
	...[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].flatMap((season) =>
		[18, 19, 20, 21, 22].flatMap((year) => [
			{ name: `Ranked S${season} 20${year} Position`, value: `SkyWars_skywars_rating_${season}_${year}_position` },
			{ name: `Ranked S${season} 20${year} Rating`, value: `SkyWars_skywars_rating_${season}_${year}_rating` },
		])
	),
	...[1, 2]
		.flatMap((season) =>
			[19, 20, 21, 22].map((year) => [
				{ name: `Ranked S${season} 20${year} Position`, value: `SkyWars_skywars_rating_${season}_${year}_position` },
				{ name: `Ranked S${season} 20${year} Rating`, value: `SkyWars_skywars_rating_${season}_${year}_rating` },
			])
		)
		.flat(),
	// Kit stats pattern: {stat}_kit_{type}_{mode}_{kit}
	...[
		{
			type: "advanced",
			mode: "solo",
			kits: [
				"armorer",
				"cannoneer",
				"enchanter",
				"enderman",
				"farmer",
				"guardian",
				"hunter",
				"jester",
				"knight",
				"magician",
				"pig-rider",
				"pyro",
				"salmon",
				"slime",
				"sloth",
				"zookeeper",
				"engineer",
			],
		},
		{
			type: "basic",
			mode: "solo",
			kits: [
				"archeologist",
				"armorsmith",
				"baseball-player",
				"batguy",
				"cactus",
				"default",
				"disco",
				"ecologist",
				"energix",
				"fallen-angel",
				"fisherman",
				"frog",
				"grenade",
				"healer",
				"pharaoh",
				"princess",
				"rookie",
				"scout",
				"snowman",
				"speleologist",
				"troll",
				"warlock",
			],
		},
		{ type: "enderchest", mode: "solo", kits: ["enderchest"] },
		{
			type: "defending",
			mode: "team",
			kits: ["armorer", "baseball-player", "batguy", "cactus", "disco", "farmer", "frog", "golem", "guardian"],
		},
		{
			type: "supporting",
			mode: "team",
			kits: [
				"armorsmith",
				"ecologist",
				"enchanter",
				"healer",
				"pharaoh",
				"pyro",
				"princess",
				"rookie",
				"troll",
				"warlock",
				"zookeeper",
			],
		},
		{
			type: "attacking",
			mode: "team",
			kits: [
				"archeologist",
				"enderman",
				"energix",
				"fallen-angel",
        "engineer",
				"fisherman",
				"grenade",
				"hunter",
				"jester",
				"knight",
				"pig-rider",
				"salmon",
				"scout",
				"slime",
				"sloth",
				"snowman",
			],
		},
		{ type: "mining", mode: "team", kits: ["cannoneer", "default", "speleologist"] },
		{
			type: "mythical",
			mode: "",
			kits: ["end-lord", "thundermeister", "cryomancer", "fishmonger", "chronobreaker", "monster-trainer", "nether-lord"],
		},
		{ type: "mini", mode: "solo", kits: ["armorer","athlete","blacksmith", "bowman", "champion", "healer", "hound", "magician", "paladin", "pyromancer", "scout"] },
	].flatMap(({ type, mode, kits }) =>
		kits.flatMap((kit) =>
			["wins", "losses", "kills", "deaths", "time_played", "xp"].map((stat) => {
				const value = `${stat}_kit_${type}${mode ? `_${mode}` : ""}_${kit}`;
				let name;
				if (type == "mini") {
					name = `${toCamelCase(stat)}${type ? ` ${toCamelCase(type)}` : ""} ${toCamelCase(kit.replace(/-/g, " "))}`;
				} else {
					name = `${toCamelCase(stat)}${
						mode ? ` ${toCamelCase(mode === "solo" ? "normal" : mode === "team" ? "insane" : mode)}` : ""
					} ${toCamelCase(kit.replace(/-/g, " "))}`;
				}
				return { name, value };
			})
		)
	),
	// Misc stats
	{ name: "SkyWars Experience", value: "skywars_experience" },
	{ name: "Coins", value: "coins" },
	{ name: "Heads", value: "heads" },
	{ name: "Kills", value: "kills" },
	{ name: "Deaths", value: "deaths" },
	{ name: "Wins", value: "wins" },
	{ name: "Losses", value: "losses" },
	{ name: "Time Played", value: "time_played" },
	// Game mode stats
	...["solo", "team", "mini", "lab"].flatMap((mode) => [
		{ name: `Wins ${mode.charAt(0).toUpperCase() + mode.slice(1)}`, value: `wins_${mode}` },
		{ name: `Losses ${mode.charAt(0).toUpperCase() + mode.slice(1)}`, value: `losses_${mode}` },
		{ name: `Kills ${mode.charAt(0).toUpperCase() + mode.slice(1)}`, value: `kills_${mode}` },
		{ name: `Deaths ${mode.charAt(0).toUpperCase() + mode.slice(1)}`, value: `deaths_${mode}` },
	]),
	...["solo_normal", "solo_insane", "team_normal", "team_insane"].flatMap((mode) => [
		{ name: `Wins ${mode.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}`, value: `wins_${mode}` },
		{ name: `Losses ${mode.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}`, value: `losses_${mode}` },
		{ name: `Kills ${mode.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}`, value: `kills_${mode}` },
		{ name: `Deaths ${mode.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}`, value: `deaths_${mode}` },
	]),
	{ name: "Games Mini", value: "games_mini" },
];
