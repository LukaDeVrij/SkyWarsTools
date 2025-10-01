import { OverallResponse } from "@/app/types/OverallResponse";
import TabContent from "./TabContent";

const Table: React.FC<OverallResponse> = (response) => {
	const getWLR = (wins: number, losses: number) => {
		if (losses === 0) return wins > 0 ? "∞" : "0.00";
		return (wins / losses).toFixed(2);
	};

	const wlrClass = (wins: number, losses: number) => {
		const wlr = losses === 0 ? (wins > 0 ? Infinity : 0) : wins / losses;
		return wlr > 1 ? "text-green-600" : "";
	};

	const kdrClass = (kills: number, deaths: number) => {
		const kdr = deaths === 0 ? (kills > 0 ? Infinity : 0) : kills / deaths;
		return kdr > 5 ? "text-green-600" : "";
	};

	return (
		<TabContent>
			<div className="w-full text-left bg-content font-bold font flex flex-col lg:flex-row lg:text-lg">
				<table className="p-4 w-full lg:w-[65%] text-left bg-content">
					<thead className="text-accent">
						<tr>
							<th>Mode</th>
							<th>Wins</th>
							<th>Losses</th>
							<th>WLR</th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-b-2 border-white">
							<td>Overall</td>
							<td>{response.stats.wins?.toLocaleString()}</td>
							<td>{response.stats.losses?.toLocaleString()}</td>
							<td className={wlrClass(response.stats.wins ?? 0, response.stats.losses ?? 0)}>
								{getWLR(response.stats.wins ?? 0, response.stats.losses ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Solo</td>
							<td>{response.stats.wins_solo?.toLocaleString()}</td>
							<td>{response.stats.losses_solo?.toLocaleString()}</td>
							<td className={wlrClass(response.stats.wins_solo ?? 0, response.stats.losses_solo ?? 0)}>
								{getWLR(response.stats.wins_solo ?? 0, response.stats.losses_solo ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Solo Normal</td>
							<td>{response.stats.wins_solo_normal?.toLocaleString()}</td>
							<td>{response.stats.losses_solo_normal?.toLocaleString()}</td>
							<td className={wlrClass(response.stats.wins_solo_normal ?? 0, response.stats.losses_solo_normal ?? 0)}>
								{getWLR(response.stats.wins_solo_normal ?? 0, response.stats.losses_solo_normal ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-2 border-white">
							<td>Solo Insane</td>
							<td>{response.stats.wins_solo_insane?.toLocaleString()}</td>
							<td>{response.stats.losses_solo_insane?.toLocaleString()}</td>
							<td className={wlrClass(response.stats.wins_solo_insane ?? 0, response.stats.losses_solo_insane ?? 0)}>
								{getWLR(response.stats.wins_solo_insane ?? 0, response.stats.losses_solo_insane ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Teams</td>
							<td>{response.stats.wins_team?.toLocaleString()}</td>
							<td>{response.stats.losses_team?.toLocaleString()}</td>
							<td className={wlrClass(response.stats.wins_team ?? 0, response.stats.losses_team ?? 0)}>
								{getWLR(response.stats.wins_team ?? 0, response.stats.losses_team ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Teams Normal</td>
							<td>{response.stats.wins_team_normal?.toLocaleString()}</td>
							<td>{response.stats.losses_team_normal?.toLocaleString()}</td>
							<td className={wlrClass(response.stats.wins_team_normal ?? 0, response.stats.losses_team_normal ?? 0)}>
								{getWLR(response.stats.wins_team_normal ?? 0, response.stats.losses_team_normal ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-2 border-white">
							<td>Teams Insane</td>
							<td>{response.stats.wins_team_insane?.toLocaleString()}</td>
							<td>{response.stats.losses_team_insane?.toLocaleString()}</td>
							<td className={wlrClass(response.stats.wins_team_insane ?? 0, response.stats.losses_team_insane ?? 0)}>
								{getWLR(response.stats.wins_team_insane ?? 0, response.stats.losses_team_insane ?? 0).toLocaleString()}
							</td>
							
						</tr>
						<tr className="border-b-1 border-white">
							<td>Mini</td>
							<td>{(response.stats.wins_mini ?? 0).toLocaleString()}</td>
							<td>{(response.stats.games_mini ?? 0) - (response.stats.wins_mini ?? 0)}</td>
							<td className={wlrClass(response.stats.wins_mini ?? 0, (response.stats.games_mini ?? 0) - (response.stats.wins_mini ?? 0))}>
								{getWLR(response.stats.wins_mini ?? 0, (response.stats.games_mini ?? 0) - (response.stats.wins_mini ?? 0))}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td>Lab</td>
							<td>{(response.stats.wins_lab ?? 0).toLocaleString()}</td>
							<td>{(response.stats.losses_lab)}</td>
							<td className={wlrClass(response.stats.wins_lab ?? 0, response.stats.losses_lab ?? 0)}>
								{getWLR(response.stats.wins_lab ?? 0, response.stats.losses_lab ?? 0).toLocaleString()}
							</td>
						</tr>
					</tbody>
				</table>

				<table className="p-4 w-full lg:w-[50%] text-left bg-content ">
					<thead className="text-accent">
						<tr>
							<th className="inline lg:hidden">Mode</th>
							<th>Kills</th>
							<th>Deaths</th>
							<th>KDR</th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-b-2 border-white">
							<td className="inline lg:hidden">Overall</td>
							<td>{response.stats.kills?.toLocaleString()}</td>
							<td>{response.stats.deaths?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.kills ?? 0, response.stats.deaths ?? 0)}>
								{getWLR(response.stats.kills ?? 0, response.stats.deaths ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td className="inline lg:hidden">Solo</td>
							<td>{response.stats.kills_solo?.toLocaleString()}</td>
							<td>{response.stats.deaths_solo?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.kills_solo ?? 0, response.stats.deaths_solo ?? 0)}>
								{getWLR(response.stats.kills_solo ?? 0, response.stats.deaths_solo ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td className="inline lg:hidden">Solo Normal</td>
							<td>{response.stats.kills_solo_normal?.toLocaleString()}</td>
							<td>{response.stats.deaths_solo_normal?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.kills_solo_normal ?? 0, response.stats.deaths_solo_normal ?? 0)}>
								{getWLR(response.stats.kills_solo_normal ?? 0, response.stats.deaths_solo_normal ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-2 border-white">
							<td className="inline lg:hidden">Solo Insane</td>
							<td>{response.stats.kills_solo_insane?.toLocaleString()}</td>
							<td>{response.stats.deaths_solo_insane?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.kills_solo_insane ?? 0, response.stats.deaths_solo_insane ?? 0)}>
								{getWLR(response.stats.kills_solo_insane ?? 0, response.stats.deaths_solo_insane ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td className="inline lg:hidden">Teams</td>
							<td>{response.stats.kills_team?.toLocaleString()}</td>
							<td>{response.stats.deaths_team?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.kills_team ?? 0, response.stats.deaths_team ?? 0)}>
								{getWLR(response.stats.kills_team ?? 0, response.stats.deaths_team ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td className="inline lg:hidden">Teams Normal</td>
							<td>{response.stats.kills_team_normal?.toLocaleString()}</td>
							<td>{response.stats.deaths_team_normal?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.kills_team_normal ?? 0, response.stats.deaths_team_normal ?? 0)}>
								{getWLR(response.stats.kills_team_normal ?? 0, response.stats.deaths_team_normal ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-2 border-white">
							<td className="inline lg:hidden">Teams Insane</td>
							<td>{response.stats.kills_team_insane?.toLocaleString()}</td>
							<td>{response.stats.deaths_team_insane?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.kills_team_insane ?? 0, response.stats.deaths_team_insane ?? 0)}>
								{getWLR(response.stats.kills_team_insane ?? 0, response.stats.deaths_team_insane ?? 0).toLocaleString()}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td className="inline lg:hidden">Mini</td>
							<td>{response.stats.kills_mini ?? "0".toLocaleString()}</td>
							<td>{(response.stats.games_mini ?? 0) - (response.stats.wins_mini ?? 0)}</td>
							<td className={kdrClass(response.stats.kills_mini ?? 0, (response.stats.games_mini ?? 0) - (response.stats.wins_mini ?? 0))}>
								{getWLR(response.stats.kills_mini ?? 0, (response.stats.games_mini ?? 0) - (response.stats.wins_mini ?? 0))}
							</td>
						</tr>
						<tr className="border-b-1 border-white">
							<td className="inline lg:hidden">Lab</td>
							<td>{response.stats.kills_lab?.toLocaleString()}</td>
							<td>{response.stats.deaths_lab?.toLocaleString()}</td>
							<td className={kdrClass(response.stats.kills_lab ?? 0, response.stats.deaths_lab ?? 0)}>
								{getWLR(response.stats.kills_lab ?? 0, response.stats.deaths_lab ?? 0).toLocaleString()}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</TabContent>
	);
}

export default Table;