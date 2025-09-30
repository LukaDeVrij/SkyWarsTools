import React from "react";
import TabContent from "./TabContent";
import { OverallResponse } from "@/app/types/OverallResponse";

const Legacy: React.FC<OverallResponse> = (response) => {
	return (
		<TabContent>
			<div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
				<div className="w-full lg:w-1/2 h-100 bg-red-500 flex justify-center items-center">
					<h1>WORK in progress if you had not noticed</h1>
					<h2>Ranked Rewards</h2>

					<p>Guardians</p>
					<p>{response.stats.packages?.includes("victorydance_guardians") ? "Yes" : "No"}</p>
				</div>
			</div>
		</TabContent>
	);
};

export default Legacy;
