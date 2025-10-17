import React from "react";
import { fetchAdminData } from "@/app/utils/Utils";

interface LogsPanelProps {
	profileToken: string | null;
}

type LogEntry = {
	time: string;
	metric: string;
	value: number;
	origin: string;
	tags: Record<string, unknown>;
};

const LogsPanel: React.FC<LogsPanelProps> = ({ profileToken }) => {
	const [logs, setLogs] = React.useState<LogEntry[]>([]);
	const [date, setDate] = React.useState<string>("");
	const [count, setCount] = React.useState<number>(0);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (!profileToken) return;
		setLoading(true);
		setError(null);
		fetchAdminData(profileToken, "logs?isoDate=latest")
			.then((data) => {
				setLogs(data.logs || []);
				setDate(data.date || "");
				setCount(data.count || 0);
			})
			.catch((err) => {
				setError(err.message || "Failed to fetch logs");
			})
			.finally(() => setLoading(false));
	}, [profileToken]);
	console.log(profileToken)

	return (
		<div className="w-full max-w bg-layer rounded-xl shadow p-4">
			<h2 className="text-2xl font-semibold mb-4">Raw logs ({date})</h2>
			{loading && <div className="text-gray-400">Loading logs...</div>}
			{error && <div className="text-red-500">{error}</div>}
			{!loading && !error && logs.length === 0 && <div className="text-gray-400">No logs found for this date.</div>}
			{!loading && !error && logs.length > 0 && (
				<div className=" overflow-y-scroll h-100">
					<table className="w-full text-left">
						<thead>
							<tr className="border-b">
								<th className="py-1 px-2">Time</th>
								<th className="py-1 px-2">Metric</th>
								<th className="py-1 px-2">Value</th>
								<th className="py-1 px-2">Origin</th>
								<th className="py-1 px-2">Tags</th>
							</tr>
						</thead>
						<tbody>
							{logs.map((log, idx) => (
								<tr key={idx} className="border-b hover:bg-layer">
									<td className="py-1 px-2">{new Date(log.time).toLocaleTimeString()}</td>
									<td className="py-1 px-2">{log.metric}</td>
									<td className="py-1 px-2">{log.value}</td>
									<td className="py-1 px-2">{log.origin}</td>
									<td className="py-1 px-2">{JSON.stringify(log.tags)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
			<div className="mt-4 text-gray-500">Total logs: {count}</div>
		</div>
	);
};

export default LogsPanel;
