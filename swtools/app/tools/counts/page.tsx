import DailyPlayerCount from "@/app/components/DailyPlayerCount";
import PlayerCount from "@/app/components/PlayerCount";
import React from "react";

const CountsPage = () => {
	return (
		<div>
			<h1 className="text-4xl font-bold text-center pt-8">SkyWars Statistics</h1>
			<div className="flex justify-center p-5 lg:p-8 gap-8 flex-wrap">
				<PlayerCount fullWidth={true} />
				<DailyPlayerCount fullWidth={true} />

			</div>
		</div>
	);
};

export default CountsPage;
