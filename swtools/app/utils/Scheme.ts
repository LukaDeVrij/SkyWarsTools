import { OverallResponse } from "../types/OverallResponse";
import { calcPrestigeObj } from "./Utils";

type Scheme = {
	name: string;
	rankColor: string | string[];
	iconColor: string;
	req?: string | number;
};

// These are somewhat unconfirmed scheme names - these do make sense and if hypixel designed their scheme names normally this will work
const schemes: Scheme[] = [
	{
		name: "stone_prestige",
		rankColor: "§7",
		iconColor: "§7",
		req: 0,
	},
	{
		name: "iron_prestige",
		rankColor: "§f",
		iconColor: "§f",
		req: 10,
	},
	{
		name: "gold_prestige",
		rankColor: "§6",
		iconColor: "§6",
		req: 20,
	},
	{
		name: "diamond_prestige",
		rankColor: "§b",
		iconColor: "§b",
		req: 30,
	},
	{
		name: "ruby_prestige",
		rankColor: "§c",
		iconColor: "§c",
		req: 40,
	},
	{
		name: "crystal_prestige",
		rankColor: "§d",
		iconColor: "§d",
		req: 50,
	},
	{
		name: "amethyst_prestige",
		rankColor: "§5",
		iconColor: "§5",
		req: 60,
	},
	{
		name: "opal_prestige",
		rankColor: "§9",
		iconColor: "§9",
		req: 70,
	},
	{
		name: "Topaz_prestige",
		rankColor: "§e",
		iconColor: "§e",
		req: 80,
	},
	{
		name: "Jade_prestige",
		rankColor: "§a",
		iconColor: "§a",
		req: 90,
	},
	{
		name: "Cobalt_prestige",
		rankColor: "§1",
		iconColor: "§1",
		req: 120,
	},
	{
		name: "Crimson_prestige",
		rankColor: "§4",
		iconColor: "§4",
		req: 140,
	},
	{
		name: "Emerald_prestige",
		rankColor: "§2",
		iconColor: "§2",
		req: 160,
	},
	{
		name: "Sapphire_prestige",
		rankColor: "§3",
		iconColor: "§3",
		req: 180,
	},
	{
		name: "Slate_prestige",
		rankColor: "§8",
		iconColor: "§8",
		req: 220,
	},
	{
		name: "Midnight_prestige",
		rankColor: "§0",
		iconColor: "§0",
		req: 240,
	},
	{
		name: "Bloody_prestige",
		rankColor: ["§4", "§c", "§c", "§c", "§4"],
		iconColor: "§c",
		req: 110,
	},
	{
		name: "Content_prestige",
		rankColor: ["§c", "§f", "§f", "§f", "§c"],
		iconColor: "",
		req: 130,
	},
	{
		name: "Firefly_prestige",
		rankColor: ["§6", "§e", "§e", "§e", "§6"],
		iconColor: "§e",
		req: 150,
	},
	{
		name: "Abyss_prestige",
		rankColor: ["§1", "§9", "§9", "§9", "§1"],
		iconColor: "§9",
		req: 170,
	},
	{
		name: "Emergency_prestige",
		rankColor: ["§4", "§e", "§e", "§e", "§4"],
		iconColor: "§e",
		req: 190,
	},
	{
		name: "Mulberry_prestige",
		rankColor: ["§5", "§d", "§d", "§d", "§5"],
		iconColor: "§d",
		req: 210,
	},
	{
		name: "Blood_God_prestige",
		rankColor: ["§d", "§b", "§b", "§b", "§d"],
		iconColor: "§b",
		req: 230,
	},
	{
		name: "Twilight_prestige",
		rankColor: ["§1", "§3", "§3", "§3", "§1"],
		iconColor: "§3",
		req: 270,
	},
	{
		name: "Icicle_prestige",
		rankColor: ["§9", "§c", "§c", "§c", "§9"],
		iconColor: "§c",
		req: 290,
	},
	{
		name: "Graphite_prestige",
		rankColor: ["§8", "§7", "§7", "§7", "§8"],
		iconColor: "§7",
		req: 310,
	},
	{
		name: "Punk_prestige",
		rankColor: ["§d", "§a", "§a", "§a", "§d"],
		iconColor: "§a",
		req: 320,
	},
	{
		name: "Meltdown_prestige",
		rankColor: ["§e", "§c", "§c", "§c", "§e"],
		iconColor: "§c",
		req: 330,
	},
	{
		name: "Target_prestige",
		rankColor: "§c",
		iconColor: "§f",
		req: 380,
	},
	{
		name: "Limelight_prestige",
		rankColor: ["§2", "§a", "§a", "§a", "§2"],
		iconColor: "§a",
		req: 390,
	},
	{
		name: "Cerulean_prestige",
		rankColor: ["§3", "§c", "§c", "§c", "§3"],
		iconColor: "§c",
		req: 410,
	},
	{
		name: "Ancient",
		rankColor: "§7",
		iconColor: "§7",
		req: "§5§o§cUnlocked at Archeologist Normal Kit Prestige VII!",
	},
	{
		name: "The_New_Default",
		rankColor: ["§6", "§7", "§7", "§7", "§6"],
		iconColor: "",
		req: "§5§o§cUnlocked at Armorer Normal Kit Prestige VII!",
	},
	{
		name: "The_New_New_Default",
		rankColor: ["§b", "§7", "§7", "§7", "§b"],
		iconColor: "§b",
		req: "§5§o§cUnlocked at Armorer Insane Kit Prestige VII!",
	},
	{
		name: "Launch",
		rankColor: ["§6", "§6", "§6", "§6", "§8"],
		iconColor: "§8",
		req: "§5§o§cUnlocked at Baseball Player Normal Kit Prestige VII!",
	},
	{
		name: "Spotlight",
		rankColor: ["§0", "§f", "§f", "§f", "§0"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Disco Normal Kit Prestige VII!",
	},
	{
		name: "Earth",
		rankColor: ["§4", "§4", "§4", "§4", "§4"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Ecologist Normal Kit Prestige VII!",
	},
	{
		name: "Glint",
		rankColor: ["§d", "§d", "§d", "§d", "§d"],
		iconColor: "§b",
		req: "§5§o§cUnlocked at Enchanter Insane Kit Prestige VII!",
	},
	{
		name: "Strength",
		rankColor: ["§c", "§d", "§d", "§d", "§c"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Energix Normal Kit Prestige VII!",
	},
	{
		name: "Adrenaline",
		rankColor: ["§c", "§a", "§a", "§a", "§c"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Energix Insane Kit Prestige VII!",
	},
	{
		name: "Pumpkin",
		rankColor: ["§4", "§6", "§6", "§6", "§4"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Farmer Insane Kit Prestige VII!",
	},
	{
		name: "Seashell",
		rankColor: ["§e", "§e", "§e", "§e", "§e"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Fisherman Mega Kit Prestige VII!",
	},
	{
		name: "Obsidian",
		rankColor: ["§8", "§8", "§8", "§8", "§8"],
		iconColor: "§5",
		req: "§5§o§cUnlocked at Guardian Normal Kit Prestige VII!",
	},
	{
		name: "Support",
		rankColor: ["§f", "§c", "§c", "§c", "§f"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Healer Mega Kit Prestige VII!",
	},
	{
		name: "Mahogany",
		rankColor: ["§e", "§6", "§6", "§6", "§e"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Hunter Mega Kit Prestige VII!",
	},
	{
		name: "Spell",
		rankColor: ["§d", "§d", "§d", "§e", "§e"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Magician Insane Kit Prestige VII!",
	},
	{
		name: "Pillar",
		rankColor: ["§f", "§6", "§6", "§6", "§f"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Paladin Mega Kit Prestige VII!",
	},
	{
		name: "Agile",
		rankColor: ["§a", "§f", "§f", "§f", "§a"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Scout Insane Kit Prestige VII!",
	},
	{
		name: "Bone",
		rankColor: ["§f", "§7", "§7", "§7", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Skeletor Mega Kit Prestige VII!",
	},
	{
		name: "Slimy",
		rankColor: ["§a", "§2", "§2", "§2", "§a"],
		iconColor: "§2",
		req: "§5§o§cUnlocked at Slime Normal Kit Prestige VII!",
	},
	{
		name: "Holiday",
		rankColor: ["§4", "§a", "§a", "§a", "§4"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Snowman Normal Kit Prestige VII!",
	},
	{
		name: "Iconic",
		rankColor: ["§0", "§0", "§0", "§0", "§0"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Troll Normal Kit Prestige VII!",
	},
	{
		name: "Level_conic",
		rankColor: ["§0", "§f", "§f", "§f", "§0"],
		iconColor: "§0",
		req: "§5§o§cUnlocked at Troll Insane Kit Prestige VII!",
	},
	{
		name: "Safari",
		rankColor: ["§2", "§2", "§2", "§6", "§6"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Monster Trainer Kit Prestige VII!",
	},
	{
		name: "Gummy_Worm",
		rankColor: ["§c", "§c", "§c", "§b", "§b"],
		iconColor: "§b",
		req: "§5§o§cUnlocked at Fishmonger Kit Prestige VII!",
	},
	{
		name: "Timetravel",
		rankColor: ["§7", "§0", "§0", "§7", "§7"],
		iconColor: "§7",
		req: "§5§o§cUnlocked at Chronobreaker Kit Prestige VII!",
	},
	{
		name: "Horned",
		rankColor: ["§c", "§8", "§8", "§8", "§c"],
		iconColor: "§8",
		req: "§5§o§cUnlocked at Fallen Angel Insane Kit Prestige VII!",
	},
	{
		name: "Basic",
		rankColor: ["§7", "§f", "§f", "§f", "§7"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Default Normal Kit Prestige VII!",
	},
	{
		name: "Basic+",
		rankColor: ["§7", "§6", "§6", "§6", "§7"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Default Insane Kit Prestige VII!",
	},
	{
		name: "Basic++",
		rankColor: ["§7", "§b", "§b", "§b", "§7"],
		iconColor: "§b",
		req: "§5§o§cUnlocked at Default Mega Kit Prestige VII!",
	},
	{
		name: "Sun_prestige",
		rankColor: ["§c", "§e", "§e", "§e", "§c"],
		iconColor: "§6",
		req: 250,
	},
	{
		name: "Bulb_prestige",
		rankColor: ["§0", "§e", "§6", "§6", "§0"],
		iconColor: "§e",
		req: 260,
	},
	{
		name: "Natural_prestige",
		rankColor: ["§a", "§2", "§a", "§e", "§2"],
		iconColor: "§a",
		req: 280,
	},
	{
		name: "Iridescent_prestige",
		rankColor: ["§b", "§b", "§b", "§d", "§a"],
		iconColor: "§a",
		req: 340,
	},
	{
		name: "Marigold_prestige",
		rankColor: ["§f", "§f", "§e", "§e", "§6"],
		iconColor: "§6",
		req: 350,
	},
	{
		name: "Spark_prestige",
		rankColor: ["§e", "§e", "§f", "§f", "§8"],
		iconColor: "§8",
		req: 370,
	},
	{
		name: "Magical_prestige",
		rankColor: ["§0", "§5", "§8", "§8", "§0"],
		iconColor: "§5",
		req: 420,
	},
	{
		name: "Luminous_prestige",
		rankColor: ["§6", "§6", "§f", "§f", "§3"],
		iconColor: "§b",
		req: 430,
	},
	{
		name: "Synthesis_prestige",
		rankColor: ["§a", "§2", "§a", "§e", "§f"],
		iconColor: "§f",
		req: 440,
	},
	{
		name: "Dramatic_prestige",
		rankColor: ["§9", "§b", "§3", "§d", "§4"],
		iconColor: "§5",
		req: 460,
	},
	{
		name: "Radiant_prestige",
		rankColor: ["§0", "§0", "§7", "§f", "§8"],
		iconColor: "§7",
		req: 470,
	},
	{
		name: "Sandy",
		rankColor: ["§6", "§e", "§f", "§e", "§e"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Archeologist Insane Kit Prestige VII!",
	},
	{
		name: "Brutus",
		rankColor: ["§9", "§9", "§8", "§8", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Armorer Mini Kit Prestige VII!",
	},
	{
		name: "Coinsmith",
		rankColor: ["§e", "§8", "§8", "§8", "§e"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Armorsmith Normal Kit Prestige VII!",
	},
	{
		name: "Soulsmith",
		rankColor: ["§7", "§b", "§b", "§f", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Armorsmith Mega Kit Prestige VII!",
	},
	{
		name: "Grand_Slam",
		rankColor: ["§2", "§a", "§a", "§a", "§2"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Baseball Player Mega Kit Prestige VII!",
	},
	{
		name: "Fleet",
		rankColor: ["§0", "§c", "§e", "§a", "§0"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Batguy Normal Kit Prestige VII!",
	},
	{
		name: "Vengeance",
		rankColor: ["§0", "§8", "§8", "§8", "§0"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Batguy Insane Kit Prestige VII!",
	},
	{
		name: "Dry",
		rankColor: ["§e", "§f", "§f", "§f", "§e"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Cactus Normal Kit Prestige VII!",
	},
	{
		name: "Prickly",
		rankColor: ["§e", "§a", "§a", "§a", "§e"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Cactus Insane Kit Prestige VII!",
	},
	{
		name: "Cast_Iron",
		rankColor: ["§7", "§7", "§8", "§8", "§3"],
		iconColor: "§3",
		req: "§5§o§cUnlocked at Cannoneer Normal Kit Prestige VII!",
	},
	{
		name: "Explosive",
		rankColor: ["§c", "§c", "§e", "§e", "§6"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Cannoneer Mega Kit Prestige VII!",
	},
	{
		name: "Verdant",
		rankColor: ["§2", "§a", "§a", "§e", "§e"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Ecologist Insane Kit Prestige VII!",
	},
	{
		name: "Enchantment",
		rankColor: ["§f", "§d", "§5", "§5", "§f"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Enchanter Normal Kit Prestige VII!",
	},
	{
		name: "Void",
		rankColor: ["§8", "§5", "§5", "§5", "§8"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Enderchest Normal Kit Prestige VII!",
	},
	{
		name: "Fragile",
		rankColor: ["§0", "§3", "§3", "§3", "§0"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Enderchest Insane Kit Prestige VII!",
	},
	{
		name: "Mite",
		rankColor: ["§5", "§d", "§d", "§6", "§e"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Enderman Normal Kit Prestige VII!",
	},
	{
		name: "Ender",
		rankColor: ["§3", "§2", "§8", "§2", "§3"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Enderman Insane Kit Prestige VII!",
	},
	{
		name: "Shulker",
		rankColor: ["§5", "§e", "§e", "§e", "§5"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Enderman Mega Kit Prestige VII!",
	},
	{
		name: "Redstone",
		rankColor: ["§0", "§c", "§c", "§c", "§0"],
		iconColor: "§4",
		req: "§5§o§cUnlocked at Engineer Normal Kit Prestige VII!",
	},
	{
		name: "Technical",
		rankColor: ["§c", "§c", "§7", "§7", "§8"],
		iconColor: "§8",
		req: "§5§o§cUnlocked at Engineer Insane Kit Prestige VII!",
	},
	{
		name: "Melon",
		rankColor: ["§a", "§2", "§a", "§2", "§a"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Farmer Normal Kit Prestige VII!",
	},
	{
		name: "Driftwood",
		rankColor: ["§3", "§3", "§e", "§e", "§4"],
		iconColor: "§4",
		req: "§5§o§cUnlocked at Fisherman Normal Kit Prestige VII!",
	},
	{
		name: "River",
		rankColor: ["§2", "§9", "§9", "§9", "§2"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Fisherman Insane Kit Prestige VII!",
	},
	{
		name: "Mangrove",
		rankColor: ["§4", "§4", "§c", "§c", "§2"],
		iconColor: "§2",
		req: "§5§o§cUnlocked at Frog Normal Kit Prestige VII!",
	},
	{
		name: "Jeremiah",
		rankColor: ["§3", "§6", "§6", "§6", "§3"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Frog Insane Kit Prestige VII!",
	},
	{
		name: "Poppy",
		rankColor: ["§c", "§4", "§0", "§0", "§c"],
		iconColor: "§4",
		req: "§5§o§cUnlocked at Golem Insane Kit Prestige VII!",
	},
	{
		name: "Creeper",
		rankColor: ["§f", "§f", "§a", "§a", "§2"],
		iconColor: "§2",
		req: "§5§o§cUnlocked at Grenade Normal Kit Prestige VII!",
	},
	{
		name: "Camo",
		rankColor: ["§8", "§8", "§2", "§2", "§a"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Grenade Insane Kit Prestige VII!",
	},
	{
		name: "First_Aid",
		rankColor: ["§4", "§f", "§f", "§f", "§4"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Healer Insane Kit Prestige VII!",
	},
	{
		name: "Penguin",
		rankColor: ["§8", "§9", "§9", "§9", "§8"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Healer Mini Kit Prestige VII!",
	},
	{
		name: "Nether",
		rankColor: ["§7", "§7", "§3", "§3", "§7"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Hellhound Mega Kit Prestige VII!",
	},
	{
		name: "Wilderness",
		rankColor: ["§2", "§2", "§3", "§3", "§6"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Hunter Normal Kit Prestige VII!",
	},
	{
		name: "One_Stone",
		rankColor: ["§7", "§7", "§2", "§2", "§8"],
		iconColor: "§8",
		req: "§5§o§cUnlocked at Hunter Insane Kit Prestige VII!",
	},
	{
		name: "Circus",
		rankColor: ["§c", "§c", "§6", "§6", "§2"],
		iconColor: "§2",
		req: "§5§o§cUnlocked at Jester Normal Kit Prestige VII!",
	},
	{
		name: "Veracious",
		rankColor: ["§5", "§f", "§f", "§f", "§5"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Knight Normal Kit Prestige VII!",
	},
	{
		name: "Valiant",
		rankColor: ["§c", "§f", "§f", "§f", "§c"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Knight Insane Kit Prestige VII!",
	},
	{
		name: "Venerable",
		rankColor: ["§9", "§f", "§f", "§f", "§9"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Knight Mega Kit Prestige VII!",
	},
	{
		name: "Portal",
		rankColor: ["§a", "§a", "§d", "§d", "§c"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Magician Normal Kit Prestige VII!",
	},
	{
		name: "Socratic",
		rankColor: ["§8", "§f", "§f", "§f", "§8"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Magician Mini Kit Prestige VII!",
	},
	{
		name: "Parallel_Dimension",
		rankColor: ["§9", "§9", "§8", "§8", "§d"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Paladin Mini Kit Prestige VII!",
	},
	{
		name: "Tomb",
		rankColor: ["§6", "§9", "§6", "§9", "§e"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Pharaoh Normal Kit Prestige VII!",
	},
	{
		name: "Irigation",
		rankColor: ["§b", "§b", "§a", "§6", "§e"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Pharaoh Insane Kit Prestige VII!",
	},
	{
		name: "Snout",
		rankColor: ["§5", "§0", "§d", "§d", "§5"],
		iconColor: "§0",
		req: "§5§o§cUnlocked at Pig Rider Normal Kit Prestige VII!",
	},
	{
		name: "Potato",
		rankColor: ["§e", "§d", "§d", "§c", "§8"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Pig Rider Insane Kit Prestige VII!",
	},
	{
		name: "Royal",
		rankColor: ["§9", "§9", "§6", "§6", "§c"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Princess Normal Kit Prestige VII!",
	},
	{
		name: "Bubblegum",
		rankColor: ["§5", "§d", "§d", "§f", "§d"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Princess Insane Kit Prestige VII!",
	},
	{
		name: "Insane",
		rankColor: ["§7", "§f", "§f", "§f", "§7"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Pro Insane Kit Prestige VII!",
	},
	{
		name: "Smoke",
		rankColor: ["§0", "§0", "§8", "§8", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Pyro Normal Kit Prestige VII!",
	},
	{
		name: "Scarlet",
		rankColor: ["§8", "§8", "§4", "§4", "§c"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Pyro Insane Kit Prestige VII!",
	},
	{
		name: "Afterburn",
		rankColor: ["§b", "§b", "§6", "§8", "§7"],
		iconColor: "§8",
		req: "§5§o§cUnlocked at Pyro Mega Kit Prestige VII!",
	},
	{
		name: "Normal",
		rankColor: ["§8", "§7", "§7", "§7", "§8"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Rookie Normal Kit Prestige VII!",
	},
	{
		name: "Salmon",
		rankColor: ["§c", "§c", "§3", "§3", "§2"],
		iconColor: "§2",
		req: "§5§o§cUnlocked at Salmon Insane Kit Prestige VII!",
	},
	{
		name: "Lucky",
		rankColor: ["§0", "§2", "§2", "§2", "§0"],
		iconColor: "§6",
		req: "§5§o§cUnlocked at Scout Normal Kit Prestige VII!",
	},
	{
		name: "Likeable",
		rankColor: ["§4", "§4", "§c", "§c", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Scout Mini Kit Prestige VII!",
	},
	{
		name: "Lunar",
		rankColor: ["§f", "§f", "§f", "§7", "§8"],
		iconColor: "§8",
		req: "§5§o§cUnlocked at Slime Insane Kit Prestige VII!",
	},
	{
		name: "Hypixel",
		rankColor: ["§4", "§6", "§6", "§6", "§4"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Sloth Normal Kit Prestige VII!",
	},
	{
		name: "Sky",
		rankColor: ["§e", "§f", "§b", "§b", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Sloth Insane Kit Prestige VII!",
	},
	{
		name: "Frosty",
		rankColor: ["§8", "§f", "§f", "§f", "§8"],
		iconColor: "§7",
		req: "§5§o§cUnlocked at Snowman Insane Kit Prestige VII!",
	},
	{
		name: "Treasure",
		rankColor: ["§6", "§6", "§f", "§f", "§e"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Speleologist Normal Kit Prestige VII!",
	},
	{
		name: "Gemstone",
		rankColor: ["§4", "§c", "§f", "§f", "§4"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Speleologist Insane Kit Prestige VII!",
	},
	{
		name: "Dark_Magic",
		rankColor: ["§4", "§4", "§5", "§5", "§c"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Warlock Normal Kit Prestige VII!",
	},
	{
		name: "Reflections",
		rankColor: ["§1", "§0", "§0", "§d", "§5"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Warlock Insane Kit Prestige VII!",
	},
	{
		name: "Brewery",
		rankColor: ["§5", "§a", "§a", "§a", "§5"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Witch Mega Kit Prestige VII!",
	},
	{
		name: "Leo",
		rankColor: ["§e", "§e", "§e", "§6", "§4"],
		iconColor: "§4",
		req: "§5§o§cUnlocked at Zookeeper Normal Kit Prestige VII!",
	},
	{
		name: "Zebra",
		rankColor: ["§7", "§8", "§7", "§8", "§8"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Zookeeper Insane Kit Prestige VII!",
	},
	{
		name: "Emit",
		rankColor: ["§5", "§d", "§f", "§f", "§5"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at End Lord Kit Prestige VII!",
	},
	{
		name: "Smoldering",
		rankColor: ["§0", "§4", "§4", "§4", "§0"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Nether Lord Kit Prestige VII!",
	},
	{
		name: "Stormy",
		rankColor: ["§e", "§e", "§f", "§f", "§7"],
		iconColor: "§7",
		req: "§5§o§cUnlocked at Thundermeister Kit Prestige VII!",
	},
	{
		name: "Borealis",
		rankColor: ["§d", "§d", "§b", "§b", "§a"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Cryomancer Kit Prestige VII!",
	},
	{
		name: "Devil",
		rankColor: ["§0", "§8", "§8", "§4", "§c"],
		iconColor: "§4",
		req: "§5§o§cUnlocked at Fallen Angel Normal Kit Prestige VII!",
	},
	{
		name: "Demigod",
		rankColor: ["§8", "§6", "§e", "§7", "§8"],
		iconColor: "§8",
		req: "§5§o§cUnlocked through the Angel's Descent!",
	},
	{
		name: "Laurel",
		rankColor: ["§2", "§2", "§6", "§6", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Athlete Mini Kit Prestige VII!",
	},
	{
		name: "Uplifting",
		rankColor: ["§8", "§8", "§7", "§7", "§e"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Blacksmith Mini Kit Prestige VII!",
	},
	{
		name: "The_World_Moves_On",
		rankColor: ["§8", "§8", "§6", "§6", "§c"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Bowman Mini Kit Prestige VII!",
	},
	{
		name: "Swine",
		rankColor: ["§5", "§5", "§d", "§d", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Champion Mini Kit Prestige VII!",
	},
	{
		name: "Beagle",
		rankColor: ["§f", "§7", "§7", "§7", "§f"],
		iconColor: "§f",
		req: "§5§o§cUnlocked at Hound Mini Kit Prestige VII!",
	},
	{
		name: "Mythic_i_prestige",
		rankColor: ["§c", "§6", "§e", "§a", "§d"],
		iconColor: "§b",
		req: 100,
	},
	{
		name: "Mythic_ii_prestige",
		rankColor: ["§6", "§e", "§a", "§d", "§c"],
		iconColor: "§b",
		req: 200,
	},
	{
		name: "Mythic_iii_prestige",
		rankColor: ["§e", "§a", "§b", "§d", "§6"],
		iconColor: "§c",
		req: 300,
	},
	{
		name: "Beach_prestige",
		rankColor: ["§9", "§3", "§b", "§f", "§e"],
		iconColor: "§e",
		req: 360,
	},
	{
		name: "Mythic_iv_prestige",
		rankColor: ["§a", "§b", "§d", "§c", "§e"],
		iconColor: "§6",
		req: 400,
	},
	{
		name: "Burn_prestige",
		rankColor: ["§4", "§4", "§c", "§6", "§f"],
		iconColor: "§e",
		req: 450,
	},
	{
		name: "Tidal_prestige",
		rankColor: ["§1", "§1", "§9", "§3", "§f"],
		iconColor: "§b",
		req: 480,
	},
	{
		name: "Firework_prestige",
		rankColor: ["§9", "§b", "§f", "§f", "§4"],
		iconColor: "§c",
		req: 490,
	},
	{
		name: "Mythic_v_prestige",
		rankColor: ["§b", "§d", "§c", "§6", "§a"],
		iconColor: "§e",
		req: 500,
	},
	{
		name: "The_Prestige_Prestige",
		rankColor: ["§7", "§f", "§6", "§b", "§d"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Armorer Mega Kit Prestige VII!",
	},
	{
		name: "Opalsmith",
		rankColor: ["§9", "§9", "§b", "§3", "§5"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Armorsmith Insane Kit Prestige VII!",
	},
	{
		name: "Scurvy",
		rankColor: ["§9", "§3", "§b", "§f", "§2"],
		iconColor: "§a",
		req: "§5§o§cUnlocked at Cannoneer Insane Kit Prestige VII!",
	},
	{
		name: "Fools_Mythic",
		rankColor: ["§4", "§c", "§6", "§2", "§5"],
		iconColor: "§9",
		req: "§5§o§cUnlocked at Disco Insane Kit Prestige VII!",
	},
	{
		name: "Eponymous",
		rankColor: ["§3", "§3", "§2", "§a", "§6"],
		iconColor: "§e",
		req: "§5§o§cUnlocked at Guardian Insane Kit Prestige VII!",
	},
	{
		name: "Bandage",
		rankColor: ["§0", "§8", "§7", "§f", "§4"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Healer Normal Kit Prestige VII!",
	},
	{
		name: "Clown",
		rankColor: ["§2", "§a", "§f", "§f", "§4"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Jester Insane Kit Prestige VII!",
	},
	{
		name: "Tropical",
		rankColor: ["§e", "§9", "§6", "§3", "§1"],
		iconColor: "§c",
		req: "§5§o§cUnlocked at Salmon Normal Kit Prestige VII!",
	},
	{
		name: "Sugar_Crash",
		rankColor: ["§f", "§e", "§c", "§d", "§f"],
		iconColor: "§b",
		req: "§5§o§cUnlocked at Scout Mega Kit Prestige VII!",
	},
	{
		name: "Ultraviolence",
		rankColor: ["§2", "§a", "§f", "§f", "§5"],
		iconColor: "§d",
		req: "§5§o§cUnlocked at Pyromancer Mini Kit Prestige VII!",
	},
	{
		name: "???",
		rankColor: "§5",
		iconColor: "§5",
		req: 9999,
	},
];

const schemeByName = new Map<string, Scheme>();
const schemeByReq = new Map<string | number, Scheme>();

for (const scheme of schemes) {
	schemeByName.set(scheme.name.toLowerCase(), scheme);
	if (scheme.req !== undefined) {
		schemeByReq.set(scheme.req, scheme);
	}
}

export function getSchemeByName(name: string): Scheme | undefined {
	return schemeByName.get(name.toLowerCase());
}

export function getSchemeByReq(req: string | number): Scheme | undefined {
	return schemeByReq.get(req);
}

export function formatScheme(level: number, overallResponse: OverallResponse, overwriteScheme: boolean): string {
	try {
		if (!overallResponse.display?.active_scheme || !overallResponse.display.levelFormattedWithBrackets) {
			// Fallback for legacy players who havent logged on since update
			return overallResponse.display?.levelFormatted.slice(0, 2) + "[" + Math.floor(level) + "✯]";
		}

		const icon: string = extractIcon(overallResponse.display.levelFormattedWithBrackets);
		let schemeName: string;
		if (!overwriteScheme) {
			schemeName = overallResponse.display.active_scheme.split("scheme_")[1] ?? "stone_prestige";
		} else {
			const [prestige, presLevel] = calcPrestigeObj(level);
			schemeName = getSchemeByReq(presLevel)?.name ?? "stone_prestige";
		}
		// console.log(schemeName);
		const scheme: Scheme = getSchemeByName(schemeName) as Scheme; // schemeName will always be either an existing one from the API or stone_prestige
		const demigod: boolean = overallResponse.stats.active_scheme == "scheme_demigod";
		const levelStr: string = Math.floor(level).toString();

		let rankColor: string[] | string = scheme.rankColor;
		const iconColor: string = scheme.iconColor;

		let formattedScheme: string = "";

		if (Array.isArray(rankColor)) {
			// Scheme is not just 1 color, its an array
			formattedScheme = scheme.rankColor[0];
			// If below level 100, the array has 1 too many colors - we get rid of the color on index 1, which is 1st number after the bracket basically
			if (level < 100) rankColor = Array.isArray(scheme.rankColor) ? scheme.rankColor.filter((_, i) => i !== 1) : scheme.rankColor;

			// Color for the first bracket, along with the actual bracket itself
			formattedScheme += rankColor[0];
			formattedScheme += demigod ? "{" : "[";

			// We go over every digit in the level, and prepend the color from the array for that position
			for (let index = 0; index < levelStr.length; index++) {
				const char = levelStr.charAt(index);
				formattedScheme += rankColor[index + 1] + char;
			}

			// Icon and its color
			formattedScheme += iconColor + icon;
			// We end with the last color from the array, which is for the closing bracket
			formattedScheme += rankColor[rankColor.length - 1];
			formattedScheme += demigod ? "}" : "]";
		} else {
			// Color is a single § code string -> '§2'
			formattedScheme += rankColor + "[" + levelStr + iconColor + icon + "]";
		}
		return formattedScheme;
	} catch {
		return "§7[1✯]";
	}
}

function extractIcon(levelFormattedWithBrackets: string): string {
	if (levelFormattedWithBrackets == "") return "✯";

	// Clean all colors
	const cleaned = levelFormattedWithBrackets.replace(/§[a-zA-Z0-9]/g, "").trim();

	// Get everything between some amount of digits, and the closing bracket (the icon)
	const match = cleaned.match(/^\[(\d+)(.*?)\][ ]*$/);
	if (match && match[2]) {
		return match[2];
	}
	// Shit hit the fan
	return "✯";
}
