export function getTranslationMap() {
	let translationMap = {
		stats: {
			level: {
				title: "SkyWars Level",
				processing: calcLevel,
				hypixelKey: undefined,
			},
			kills: {
				title: "Kills",
				processing: undefined,
				hypixelKey: "kills",
			},
			deaths: {
				title: "Deaths",
				processing: undefined,
				hypixelKey: "deaths",
			},
			k_d_ratio: {
				title: "KDR",
				processing: ratioCalculation,
				hypixelKey: undefined,
			},
			wins: {
				title: "Wins",
				processing: undefined,
				hypixelKey: "wins",
			},
			losses: {
				title: "Losses",
				processing: undefined,
				hypixelKey: "losses",
			},
			w_l_ratio: {
				title: "WLR",
				processing: ratioCalculation,
				hypixelKey: undefined,
			},
			time_played: {
				title: "Playtime",
				processing: formatPlaytime,
				hypixelKey: "time_played",
			},
			heads: {
				title: "Heads",
				processing: undefined,
				hypixelKey: "heads",
			},
		},
	};
	return translationMap;
}

export function ratioCalculation(wins: number, losses: number): number {
	if (wins == undefined || losses == undefined) return NaN;
	return wins / losses;
}

export function calcLevel(xp: number): number {
	let perLevelXp = [
		10, 25, 50, 75, 100, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
	];

	let level = 1;
	for (let i = 0; i < perLevelXp.length; i++) {
		if (xp < perLevelXp[i]) {
			return level + xp / perLevelXp[i];
		}
		xp -= perLevelXp[i];
		level++;
	}

	level += Math.floor(xp / 5000);
	let remainder = xp % 5000;
	return (level + remainder / 5000);
}

export function calcLevelOld(xp: number): number {
	var xps = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000];
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
	let days = Math.floor(playtime / (24 * 3600));
	playtime %= 24 * 3600;
	let hours = Math.floor(playtime / 3600);
	playtime %= 3600;
	let minutes = Math.floor(playtime / 60);

	let result = [];
	if (days > 0) result.push(`${days}d`);
	if (hours > 0) result.push(`${hours}h`);
	result.push(`${minutes}m`);
	return result.join(" ");
}

export function generateStats(statsObject: any) {
	// ported from the old stats generation export function in javascript - hence any everywhere

	let translationMap: any = getTranslationMap();

	let updatedStatistics: any = {};

	Object.keys(translationMap.stats).forEach((statKey) => {
		let value = undefined;
		if (translationMap.stats[statKey].hypixelKey == undefined) {
			// We have to manually generate it
			switch (translationMap.stats[statKey].processing) {
				case ratioCalculation:
					// get both values to do ratio calc on
					var ratioType = statKey.split("_ratio")[0];
					var gamemode = statKey.split("_ratio")[1];
					if (ratioType == "w_l")
						value = ratioCalculation(statsObject["wins" + gamemode], statsObject["losses" + gamemode]);
					if (ratioType == "k_d")
						value = ratioCalculation(statsObject["kills" + gamemode], statsObject["deaths" + gamemode]);
					break;

				case calcLevel:
					value = calcLevel(statsObject["skywars_experience"]);
					break;
			}
		} else {
			switch (translationMap.stats[statKey].processing) {
				case formatPlaytime:
					value = formatPlaytime(statsObject[statKey]);
					break;
				default:
					value = statsObject[statKey];
					break;
			}
		}
		let newTitle = translationMap.stats[statKey].title;
		updatedStatistics[newTitle] = value;
	});
	return updatedStatistics;
}
