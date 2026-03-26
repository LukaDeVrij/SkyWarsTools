"use client";
import React, { useState } from "react";
import { keys } from "@/app/utils/LeaderboardKeys";
import Head from "next/head";

type LeaderboardKey = { name: string; value: string };
type NormalizedLeaderboardKey = LeaderboardKey & { lowerName: string; lowerValue: string };
type CategoryRule = {
	name: string;
	include?: string[];
	exclude?: string[];
};

// TODO probs need a bit of a refactor, where we take keys out and continue with the rest
const categoryRules: CategoryRule[] = [
	{
		name: "Main",
		exclude: ["_rating_", "heads", "kit", "challenge", "customs_"],
	},
	{ name: "Heads", include: ["heads"] },
	{ name: "Kit", include: ["kit"], exclude: ["customs"] },
	{ name: "Ranked", include: ["_rating_"], exclude: ["_position"] },
	{ name: "Challenges", include: ["challenge"] },
	{ name: "Custom", include: ["customs_"] },
];

const matchesCategory = (value: string, { include = [], exclude = [] }: CategoryRule) =>
	include.every((token) => value.includes(token)) && exclude.every((token) => !value.includes(token));

const normalizedKeys: NormalizedLeaderboardKey[] = keys.map((k) => ({
	...k,
	lowerName: k.name.toLowerCase(),
	lowerValue: k.value.toLowerCase(),
}));

const Page = () => {
	const [selectedKey, setSelectedKey] = useState<string | null>(null);
	const [searchValue, setSearchValue] = useState<string | null>(null);
	const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
		Main: true,
	});

	const searchLower = searchValue?.toLowerCase() ?? "";
	const filteredKeys = normalizedKeys.filter((k) => !searchLower || k.lowerName.includes(searchLower));

	const toggleCategory = (category: string) => {
		setOpenCategories((prev) => ({
			...prev,
			[category]: !prev[category],
		}));
	};

	const goToLeaderboard = (key: string) => {
		window.location.href = `leaderboards/${key}`;
	};

	const handleKeyClick = (key: string) => {
		if (selectedKey === key) {
			goToLeaderboard(key);
			return;
		}

		setSelectedKey(key);
	};

	return (
		<div className="flex h-fit flex-col bg-main w-full rounded-xl p-4 lg:p-8">
			<Head>
				<title>Leaderboards | SkyWarsTools</title>
			</Head>
			<h1 className="text-4xl font-bold text-center mb-2">Leaderboards</h1>
			<span className="font-semibold text-center mb-5">
				Please note these only consist of players that are known to this website.
			</span>
			<div className="flex flex-col items-center gap-4 text-lg lg:text-xl">
				<div className="w-full max-w-md flex flex-col gap-4">
					<input
						type="text"
						className="w-full px-3 py-2 rounded-md border-2 mb-2 font-semibold bg-content"
						placeholder="Search leaderboard"
						value={searchValue ?? ""}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					{categoryRules.map((rule) => {
						const category = rule.name;
						const categoryKeys = filteredKeys.filter((k) => matchesCategory(k.lowerValue, rule));
						if (categoryKeys.length === 0) return null;
						return (
							<div key={category}>
								<button
									type="button"
									className="font-bold text-lg w-full text-left flex items-center justify-between bg-content rounded-xl px-2 cursor-pointer hover:brightness-95 animate-press"
									onClick={() => toggleCategory(category)}
								>
									<span>
										{category} Leaderboards ({categoryKeys.length})
									</span>
									<span>{openCategories[category] ? "▲" : "▼"}</span>
								</button>
								{openCategories[category] && (
									<div className="max-h-62 overflow-y-auto overflow-x-hidden border-2 rounded-md bg-content">
										{categoryKeys.map((k) => (
											<div
												key={k.value + k.name}
												title={k.value + k.name}
												className={`px-3 py-2 cursor-pointer font-semibold animate-press ${
													selectedKey === k.value ? "bg-layer" : ""
												}`}
												onClick={() => handleKeyClick(k.value)}
											>
												{k.name}
											</div>
										))}
									</div>
								)}
							</div>
						);
					})}
				</div>
				<button
					className={`mt-4 px-8 py-3 rounded-lg font-bold text-white ${
						selectedKey ? "bg-button cursor-pointer animate-press" : "bg-gray-400 cursor-not-allowed"
					}`}
					disabled={!selectedKey}
					onClick={() => {
						if (selectedKey) {
								goToLeaderboard(selectedKey);
						}
					}}
				>
					Continue
				</button>
			</div>
		</div>
	);
};

export default Page;
