import React from "react";

interface RankGraphProps {
	playerName: string;
	// data: any; // Define the type of data if known
}

const RankGraph: React.FC<RankGraphProps> = ({ playerName }) => {
	return (
		<div className="w-full h-50 lg:h-72  lg:w-[60%] bg-content p-4">
			<div className="w-full h-full flex justify-center items-center bg-layer rounded-2xl"></div>
		</div>
	);
};

export default RankGraph;
