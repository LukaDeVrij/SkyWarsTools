import React from "react";

const Heads: React.FC<{ response: APIResponse }> = ({ response }) => {
	const headsMap = [
		{ key: "eww", label: "Eww", kills: 0, exp: 1, playerKills: 0, playerEXP: 0, color: "#A9A9A9ff" },
		{ key: "yucky", label: "Yucky", kills: 50, exp: 2, playerKills: 0, playerEXP: 0, color: "#808080ff" },
		{ key: "meh", label: "Meh", kills: 200, exp: 3, playerKills: 0, playerEXP: 0, color: "#FFFFFFff" },
		{ key: "decent", label: "Decent", kills: 500, exp: 4, playerKills: 0, playerEXP: 0, color: "#FFFF00ff" },
		{ key: "salty", label: "Salty", kills: 1000, exp: 5, playerKills: 0, playerEXP: 0, color: "#008000ff" },
		{ key: "tasty", label: "Tasty", kills: 2000, exp: 6, playerKills: 0, playerEXP: 0, color: "#ADD8E6ff" },
		{ key: "succulent", label: "Succulent", kills: 5000, exp: 7, playerKills: 0, playerEXP: 0, color: "#00AAAAff" },
		{ key: "divine", label: "Divine", kills: 10000, exp: 10, playerKills: 0, playerEXP: 0, color: "#FFC0CBff" },
		{ key: "heavenly", label: "Heavenly", kills: 25000, exp: 15, playerKills: 0, playerEXP: 0, color: "#800080ff" },
		{ key: "ethereal", label: "Ethereal", kills: 50000, exp: 20, playerKills: 0, playerEXP: 0, color: "#8B0000ff" },
		{ key: "indescribable", label: "Indescribable", kills: 100000, exp: 25, playerKills: 0, playerEXP: 0, color: "#FF0000ff" },
		{ key: "special", label: "Special", kills: "YouTube", exp: 25, playerKills: 0, playerEXP: 0, color: "#FF0000ff" },
		{ key: "sweet", label: "Sweet", kills: "Admin", exp: 25, playerKills: 0, playerEXP: 0, color: "#FF0000ff" },
	];

	let totalKills = 0;
	let totalExp = 0;
	headsMap.forEach((key) => {
		const kills = ((response.extendedStats as Record<string, number | string | object>)[`heads_${key.key}`] ?? 0) as number;
		key.playerKills = kills;
		totalKills += kills;
		totalExp += kills * key.exp;
		key.playerEXP = kills * key.exp;
	});

	return (
		<div className="w-full h-fit p-4 flex flex-col lg:flex-row overflow-hidden bg-gray-800">
			<div className="overflow-x-scroll w-full lg:overflow-x-auto font-semibold text-base lg:text-xl">
				<table className="w-full">
					<thead>
						<tr className="border-t border-b border-white text-[var(--accent)]">
							<th className="text-left px-2">Flavour</th>
							<th className="text-right px-2">Kills Required</th>
							<th className="text-right px-2">EXP/Head</th>
							<th className="text-right px-2">Amount</th>
							<th className="text-right px-2">Amount %</th>
							<th className="text-right px-2">Total EXP</th>
							<th className="text-right px-2">EXP %</th>
						</tr>
					</thead>
					<tbody>
						{headsMap.map((obj) => {
							const flavour = obj.key;
							const kills = ((response.extendedStats as Record<string, number | string | object>)[`heads_${flavour}`] ??
								0) as number;
							return (
								<tr key={obj.key}>
									<td className="px-2" style={{ color: obj.color }}>
										{obj.label}
									</td>
									<td className="px-2 text-right">{obj.kills.toLocaleString()}</td>
									<td className="px-2 text-right">{obj.exp}</td>
									<td className="px-2 text-right">{kills.toLocaleString()}</td>
									<td className="px-2 text-right">{((kills / totalKills) * 100).toFixed(2)}%</td>
									<td className="px-2 text-right">{obj.playerEXP.toLocaleString()}</td>
									<td className="px-2 text-right">{((obj.playerEXP / totalExp) * 100).toFixed(2)}%</td>
								</tr>
							);
						})}
						<tr className="font-bold border-t border-white">
							<td className="px-2">Total</td>
							<td></td>
							<td></td>
							<td className="px-2 text-right">{totalKills.toLocaleString()}</td>
							<td></td>
							<td className="px-2 text-right">{totalExp.toLocaleString()}</td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Heads;
