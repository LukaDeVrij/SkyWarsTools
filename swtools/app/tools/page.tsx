import React from "react";
import MontageCardCard from "../components/tools/MontageCardCard";

const ToolsPage = () => {
	return (
		<div>
			<h1 className="text-4xl font-bold text-center pt-8">Extra Tools</h1>
			<div className="flex justify-center p-5 lg:p-8 gap-8 flex-wrap">
				<div className="w-100 aspect-square bg-content rounded-xl">
                    <MontageCardCard></MontageCardCard>
                </div>

			</div>
		</div>
	);
};

export default ToolsPage;
