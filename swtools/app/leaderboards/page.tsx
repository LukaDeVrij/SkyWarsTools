"use client";
import React, { useState } from "react";
import { keys } from "@/app/utils/LeaderboardKeys";
import Head from "next/head";

type LeaderboardKey = { name: string; value: string };

const categories = [
	{
		name: "Main",
		filter: (k: LeaderboardKey) => !k.value.toLowerCase().includes("_rating_") && !k.value.toLowerCase().includes("kit") && !k.value.toLowerCase().includes("challenge"),
	},
	{ name: "Kit", filter: (k: LeaderboardKey) => k.value.toLowerCase().includes("kit") },
	{ name: "Ranked", filter: (k: LeaderboardKey) => (k.value.toLowerCase().includes("_rating_") && !k.value.toLowerCase().includes("_position"))},
	{ name: "Challenges", filter: (k: LeaderboardKey) => k.value.toLowerCase().includes("challenge") },
];

const Page = () => {
	const [selectedKey, setSelectedKey] = useState<string | null>(null);
	const [searchValue, setSearchValue] = useState<string | null>(null);
	const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
		Main: true,
		Kit: false,
		Ranked: false,
	});

	const filteredKeys = keys.filter((k) => !searchValue || k.name.toLowerCase().includes(searchValue.toLowerCase()));

	const toggleCategory = (category: string) => {
		setOpenCategories((prev) => ({
			...prev,
			[category]: !prev[category],
		}));
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
				<style jsx>{`
					/* Hide scrollbars for all scrollable elements inside this component */
					.max-h-62::-webkit-scrollbar,
					input::-webkit-scrollbar {
						width: 0px;
						background: transparent;
					}
					.max-h-62 {
						scrollbar-width: none;
					}
					input {
						scrollbar-width: none;
					}
				`}</style>
				<div className="w-full max-w-md flex flex-col gap-4">
					<input
						type="text"
						className="w-full px-3 py-2 rounded-md border-2 mb-2 font-semibold bg-content"
						placeholder="Search leaderboard"
						value={searchValue ?? ""}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					{categories.map(({ name: category, filter }) => {
						const categoryKeys = filteredKeys.filter(filter);
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
												onClick={() => setSelectedKey(k.value)}
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
							window.location.href = `leaderboards/${selectedKey}`;
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
