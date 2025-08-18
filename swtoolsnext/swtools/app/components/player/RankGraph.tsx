import React from "react";

interface RankGraphProps {
	playerName: string;
	// data: any; // Define the type of data if known
}

const RankGraph: React.FC<RankGraphProps> = ({ playerName }) => {
	return <div className="w-full h-50 lg:h-72  lg:w-[60%] bg-gray-400 p-2"></div>;
};

export default RankGraph;
