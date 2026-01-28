import React from "react";
import MontageCardCard from "../components/tools/thumbnails/MontageCardCard";
import SchemesCard from "../components/tools/thumbnails/SchemesCard";
import CountsCard from "../components/tools/thumbnails/CountsCard";

const ToolsPage = () => {
	return (
		<div>
			<h1 className="text-4xl font-bold text-center pt-8">Extra Tools</h1>
			<div className="flex justify-center p-5 lg:p-8 gap-8 flex-wrap">
				<div className="w-90 h-90 bg-content rounded-xl">
                    <MontageCardCard addInput={true}></MontageCardCard>
                </div>
				<div className="w-90 h-90 bg-content rounded-xl">
                    <SchemesCard></SchemesCard>
                </div>
				<div className="w-90 h-90 bg-content rounded-xl">
                    <CountsCard></CountsCard>
                </div>

			</div>
		</div>
	);
};

export default ToolsPage;
