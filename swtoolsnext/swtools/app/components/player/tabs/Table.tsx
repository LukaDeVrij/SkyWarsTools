import React from "react";

const Table: React.FC<APIResponse> = (response) => {
	const getWLR = (wins: number, losses: number) => {
		if (losses === 0) return wins > 0 ? "∞" : "0.00";
		return (wins / losses).toFixed(3);
	};

	return (
		<div className="p-4 lg:p-6 w-full text-left bg-gray-800 font-bold font flex flex-col lg:flex-row lg:text-lg">
			<table className="p-4 w-full lg:w-[65%] text-left bg-gray-800 ">
				<thead className="text-[var(--accent)]">
					<tr>
						<th>Mode</th>
						<th>Wins</th>
						<th>Losses</th>
						<th>WLR</th>
					</tr>
				</thead>
				<tbody>
					<tr className="border-b-1 border-white">
						<td>Overall</td>
						<td>{response.stats.wins.toLocaleString()}</td>
						<td>{response.stats.losses.toLocaleString()}</td>
						<td>{getWLR(response.stats.wins, response.stats.losses).toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Solo</td>
						<td>{response.stats.wins_solo.toLocaleString()}</td>
						<td>{response.stats.losses_solo.toLocaleString()}</td>
						<td>{getWLR(response.stats.wins_solo, response.stats.losses_solo).toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td>Teams</td>
						<td>{response.stats.wins_team.toLocaleString()}</td>
						<td>{response.stats.losses_team.toLocaleString()}</td>
						<td>{getWLR(response.stats.wins_team, response.stats.losses_team).toLocaleString()}</td>
					</tr>
					<tr>
						<td>Mini</td>
						<td>{(response.stats.wins_mini ?? 0).toLocaleString()}</td>
						<td>-</td>
						<td>-</td>
					</tr>
				</tbody>
			</table>

			<table className="p-4 w-full lg:w-[50%] text-left bg-gray-800 ">
				<thead className="text-[var(--accent)]">
					<tr>
						<th className="inline lg:hidden">Mode</th>
						<th>Kills</th>
						<th>Deaths</th>
						<th>KDR</th>
					</tr>
				</thead>
				<tbody>
					<tr className="border-b-1 border-white">
						<td className="inline lg:hidden">Overall</td>
						<td>{response.stats.kills.toLocaleString()}</td>
						<td>{response.stats.deaths.toLocaleString()}</td>
						<td>{getWLR(response.stats.kills, response.stats.deaths).toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td className="inline lg:hidden">Solo</td>
						<td>{response.stats.kills_solo.toLocaleString()}</td>
						<td>{response.stats.deaths_solo.toLocaleString()}</td>
						<td>{getWLR(response.stats.kills_solo, response.stats.deaths_solo).toLocaleString()}</td>
					</tr>
					<tr className="border-b-1 border-white">
						<td className="inline lg:hidden">Teams</td>
						<td>{response.stats.kills_team.toLocaleString()}</td>
						<td>{response.stats.deaths_team.toLocaleString()}</td>
						<td>{getWLR(response.stats.kills_team, response.stats.deaths_team).toLocaleString()}</td>
					</tr>
					<tr>
						<td className="inline lg:hidden">Mini</td>
						<td>{response.stats.kills_mini ?? "0".toLocaleString()}</td>
						<td>-</td>
						<td>-</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Table;
