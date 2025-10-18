import React from "react";

const TabContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	// This component automatically fill the entire width on mobile, but keeps to Forums_ design with rounded boxes when there is space (ie. on desktop)
	return (
		<div className="flex lg:p-3 lg:pt-1 overflow-hidden">
			<div className="w-full h-auto bg-content lg:rounded-2xl p-4 lg:p-6 flex flex-col gap-2 lg:gap-0 font-semibold lg:text-xl">
				{children}
			</div>
		</div>
	);
};

export default TabContent;
