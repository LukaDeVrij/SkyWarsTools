import React from "react";

// interface OverallResponse {
// 	// TODO
// }

const OverallStats = async () => {
	const res = await fetch(
		"https://skywarstools.com/api/overall?player=Zumvo",
        {
            cache: "no-store", // Disable caching to always get fresh data (Redis does our caching)
        }
	);
	const data = await res.json();

	const stats = data.stats;
	console.log(stats);

	return (
		<div className="w-xl bg-black">
			<ul className="flex flex-col gap-2">
				{Object.keys(stats).map((key) => {
					const value = stats[key];
					return (
						<li key={key} className="text-white">
							<span className="font-bold">{key}:</span> {value}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default OverallStats;
