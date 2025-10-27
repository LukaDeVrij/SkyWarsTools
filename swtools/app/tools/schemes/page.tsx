import React from "react";

import { rawSchemes } from "@/app/utils/Scheme";
import type { Scheme } from "@/app/utils/Scheme";
import { toCamelCase } from "@/app/utils/Utils";
import MinecraftText from "@/app/utils/MinecraftText";

const SchemePreviews = () => {
	const formatSchemePreview = (scheme: Scheme, level: number) => {
		const levelStr: string = Math.floor(level).toString();

		let rankColor: string[] | string = scheme.rankColor;
		const iconColor: string = scheme.iconColor;

		let formattedScheme: string = "";
		const icon: string = "★";

		if (Array.isArray(rankColor)) {
			// Scheme is not just 1 color, its an array
			formattedScheme = scheme.rankColor[0];
			// If below level 100, the array has 1 too many colors - we get rid of the color on index 1, which is 1st number after the bracket basically
			if (level < 100) rankColor = Array.isArray(scheme.rankColor) ? scheme.rankColor.filter((_, i) => i !== 1) : scheme.rankColor;

			// Color for the first bracket, along with the actual bracket itself
			formattedScheme += rankColor[0] + "[";

			// We go over every digit in the level, and prepend the color from the array for that position
			for (let index = 0; index < levelStr.length; index++) {
				const char = levelStr.charAt(index);
				formattedScheme += rankColor[index + 1] + char;
			}

			// Icon and its color
			formattedScheme += iconColor + icon;
			// We end with the last color from the array, which is for the closing bracket
			formattedScheme += rankColor[rankColor.length - 1] + "]";
		} else {
			// Color is a single § code string -> '§2'
			formattedScheme += rankColor + "[" + levelStr + iconColor + icon + "]";
		}
		return formattedScheme;
	};

	const formatReq = (req?: string | number) => {
		if (!req) return "None";
		if (typeof req === "number") return "SkyWars Level " + req;
		return req
			.replace(/§5§o§cUnlocked/g, "")
			.replace(/!/g, "")
			.replace(/at/g, "")
			.replace(/through/g, "");
	};
	return (
		<div className="flex flex-col p-4 ">
			<h1 className="text-4xl font-bold text-center my-2">Schemes</h1>
			<span className="font-semibold text-center mb-2 px-3">Get a preview of all SkyWars Schemes and their requirements!</span>
			<div className="w-full overflow-x-auto rounded-xl lg:p-8">
				<table className="min-w-full w-190 lg:w-full bg-content rounded-lg">
					<thead className="text-left text-accent border-b-2">
						<tr>
							<th className="p-2 text-l lg:text-xl">Name</th>
							<th className="p-2 text-l lg:text-xl">3 Digit</th>
							<th className="p-2 text-l lg:text-xl">2 Digit</th>
							<th className="p-2 text-l lg:text-xl">Requirement</th>
						</tr>
					</thead>
					<tbody>
						{/* Slice last one, that i made up for Prestige handyness */}
						{rawSchemes.slice(0, -1).map((scheme, idx) => (
							<tr key={scheme.name}>
								<td className="p-2 font-semibold text-lg">{toCamelCase(scheme.name)}</td>
								<td className="p-2 font-mono text-xl">
									<MinecraftText>{formatSchemePreview(scheme, 100)}</MinecraftText>
								</td>
								<td className="p-2 font-mono text-xl">
									<MinecraftText>{formatSchemePreview(scheme, 99)}</MinecraftText>
								</td>
								<td className="p-2 font-semibold text-lg w-[40%]">{formatReq(scheme.req)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default SchemePreviews;
