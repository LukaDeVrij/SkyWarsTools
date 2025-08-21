import React from "react";

const TabContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="flex lg:p-3 overflow-hidden">
			<div className="w-full h-auto bg-gray-800 lg:rounded-2xl py-4 px-6 flex flex-col gap-2 lg:gap-0 font-semibold lg:text-xl">
				{children}
			</div>
		</div>
	);
};

export default TabContent;
