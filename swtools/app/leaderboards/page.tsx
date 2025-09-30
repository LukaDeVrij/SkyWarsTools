"use client";
import React, { useState } from "react";
import { keys } from "@/app/utils/LeaderboardKeys";

const Page = () => {
	const [selectedKey, setSelectedKey] = useState<string | null>(null);
	const [searchValue, setSearchValue] = useState<string | null>(null);

	const filteredKeys = keys.filter((k) => !searchValue || k.name.toLowerCase().includes(searchValue.toLowerCase()));
	// console.log(filteredKeys);
	return (
		<div className="flex h-fit flex-col bg-main w-full rounded-xl p-4 lg:p-8">
			<h1 className="text-4xl font-bold text-center mb-2">Leaderboards</h1>
			<span className="font-semibold text-center mb-5">
				Please note these only consist of players that are known to this website.
			</span>
			<div className="flex flex-col items-center gap-4 text-lg lg:text-xl">
				<div className="w-full max-w-md flex flex-col gap-2">
					<input
						type="text"
						className="w-full px-3 py-2 rounded-md border-2 font-semibold border-gray-300"
						placeholder="Search leaderboard"
						value={searchValue ?? ""}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					{["Main", "Kit", "Ranked"].map((category) => {
						const categoryKeys = filteredKeys.filter((k) => {
							if (category === "Ranked") return k.value.toLowerCase().includes("skywars_skywars_rating");
							if (category === "Kit") return k.value.toLowerCase().includes("kit");
							return !k.value.toLowerCase().includes("skywars_skywars_rating") && !k.value.toLowerCase().includes("kit");
						});
						if (categoryKeys.length === 0) return null;
						return (
							<div key={category} className="mb-4">
								<div className="font-bold text-lg mb-2">{category} Leaderboards</div>
								<div className="max-h-52 overflow-y-auto overflow-x-hidden border-2 rounded-md bg-content">
									{categoryKeys.map((k) => (
										<div
											key={k.value}
											className={`px-3 py-2 cursor-pointer font-semibold animate-press ${
												selectedKey === k.value ? "bg-layer" : ""
											}`}
											onClick={() => setSelectedKey(k.value)}
										>
											{k.name}
										</div>
									))}
								</div>
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
