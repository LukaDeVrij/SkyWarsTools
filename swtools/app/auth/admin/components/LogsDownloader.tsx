import React from "react";
import { fetchAdminData } from "@/app/utils/Utils";

interface LogsPanelProps {
	profileToken: string | null;
}
const LogsDownloader: React.FC<LogsPanelProps> = ({ profileToken }) => {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	const [isoDate, setIsoDate] = React.useState<string>(new Date().toISOString().slice(0, 16)); // Default to current date and time

	// Helper function to handle download with isoDate
	const handleDownloadWithDate = async () => {
		if (!profileToken || !isoDate) return;
		setLoading(true);
		setError(null);
		try {
			const isoString = new Date(isoDate).toISOString();
			const data = await fetchAdminData(profileToken, `logs?isoDate=${encodeURIComponent(isoString.slice(0, 10))}`);
			if (data) {
				const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
				const url = URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.download = "logs.json";
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				URL.revokeObjectURL(url);
			}
		} catch (err: unknown) {
			setError("Failed to fetch logs");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="w-full max-w bg-layer rounded-xl shadow p-4 flex flex-col justify-center items-center gap-2">
			<label>
				ISO Date:&nbsp;
				<input type="datetime-local" value={isoDate} onChange={(e) => setIsoDate(e.target.value)} disabled={loading} />
			</label>
			<button
				className="bg-green-800 px-2 py-1 rounded-xl cursor-pointer"
				onClick={() => handleDownloadWithDate()}
				disabled={!profileToken || loading || !isoDate}
			>
				{loading ? "Downloading..." : "Download Logs"}
			</button>
			{error && <div style={{ color: "red" }}>{error}</div>}
		</div>
	);
};

export default LogsDownloader;
