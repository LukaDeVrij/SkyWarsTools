import React from "react";
interface TableProps {
	stats: {
		skywars_experience: number;
		coins: number;
		opals: number;
		heads: number;
		souls: number;
		kills: number;
		deaths: number;
		wins: number;
		losses: number;
		time_played: number;
		wins_solo: number;
		losses_solo: number;
		kills_solo: number;
		deaths_solo: number;
		time_played_solo: number;
		wins_team: number;
		losses_team: number;
		kills_team: number;
		deaths_team: number;
		time_played_team: number;
		wins_mini: number;
		kills_mini: number;
		time_played_mini: number;
	};
}

const Table: React.FC<TableProps> = ({ stats }) => {
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
                        <td>{stats.wins}</td>
                        <td>{stats.losses}</td>
                        <td>{getWLR(stats.wins, stats.losses)}</td>
                    </tr>
                    <tr className="border-b-1 border-white">
                        <td>Solo</td>
                        <td>{stats.wins_solo}</td>
                        <td>{stats.losses_solo}</td>
                        <td>{getWLR(stats.wins_solo, stats.losses_solo)}</td>
                    </tr>
                    <tr className="border-b-1 border-white">
                        <td>Teams</td>
                        <td>{stats.wins_team}</td>
                        <td>{stats.losses_team}</td>
                        <td>{getWLR(stats.wins_team, stats.losses_team)}</td>
                    </tr>
                    <tr>
                        <td>Mini</td>
                        <td>{stats.wins_mini}</td>
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
                        <td>{stats.kills}</td>
                        <td>{stats.deaths}</td>
                        <td>{getWLR(stats.kills, stats.deaths)}</td>
                    </tr>
                    <tr className="border-b-1 border-white">
                        <td className="inline lg:hidden">Solo</td>
                        <td>{stats.kills_solo}</td>
                        <td>{stats.deaths_solo}</td>
                        <td>{getWLR(stats.kills_solo, stats.deaths_solo)}</td>
                    </tr>
                    <tr className="border-b-1 border-white">
                        <td className="inline lg:hidden">Teams</td>
                        <td>{stats.kills_team}</td>
                        <td>{stats.deaths_team}</td>
                        <td>{getWLR(stats.kills_team, stats.deaths_team)}</td>
                    </tr>
                    <tr>
                        <td className="inline lg:hidden">Mini</td>
                        <td>{stats.kills_mini}</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
