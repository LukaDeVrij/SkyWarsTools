import useSWR from "swr";
import LastCommit from "../types/LastCommit";
import { fetcher } from "../utils/Utils";
import Tooltip from "@mui/material/Tooltip";

export default function WebsiteVersion() {
	function formatVersion(date: Date): string {
		const year = date.getFullYear().toString().slice(-2);
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		return `${year}.${month}.${day}`;
	}
	const { data } = useSWR<LastCommit | null>(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/api/lastCommit`, fetcher, {
		revalidateOnFocus: false,
		revalidateIfStale: false,
		revalidateOnReconnect: false,
	});
	if (data && data.date) {
		const date = new Date(data.date);
		return (
			<>
				<Tooltip title={data.message ? data.message : "No commit message available"}>
					<span>v{formatVersion(date)}</span>
				</Tooltip>
			</>
		);
	}
	return <></>;
}
