"use client";
import React, { useState } from "react";
import { Combobox } from "react-widgets/cjs";

const mockKeys = [
	{ key: "overall", label: "Overall Leaderboard" },
	{ key: "kit1", label: "Kit 1 Leaderboard" },
	{ key: "kit2", label: "Kit 2 Leaderboard" },
	{ key: "kit3", label: "Kit 3 Leaderboard" },
	{ key: "kit4", label: "Kit 4 Leaderboard" },
];

const Page = () => {
	const [selectedKey, setSelectedKey] = useState<string | null>(null);

	return (
		<div className="flex h-fit flex-col bg-main w-full rounded-xl p-8">
			<h1 className="text-4xl font-bold text-center mb-2">Leaderboards</h1>
			<span className="font-semibold text-center mb-5">
				Please note these only consist of players that are known to this website.
			</span>
			<div className="flex flex-col items-center gap-4">
				<div className="w-full max-w-md">
					{/* <Combobox
						data={mockKeys}
						defaultValue={selectedKey ?? ""}
						placeholder="Select leaderboard"
						dataKey="key"
						textField="label"
						onChange={(value: any) => setSelectedKey(value?.key ?? null)}
					/> */}
					<Combobox defaultValue="Yellow" data={["Red", "Yellow", "Blue", "Orange"]} />;
				</div>
				<button
					className={`mt-4 px-8 py-3 rounded-lg font-bold text-white ${
						selectedKey ? "bg-blue-600 hover:bg-blue-700 cursor-pointer animate-press" : "bg-gray-400 cursor-not-allowed"
					}`}
					disabled={!selectedKey}
					onClick={() => {
						if (selectedKey) {
							// Replace with navigation logic
							alert(`Continue to leaderboard: ${selectedKey}`);
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
