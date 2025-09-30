
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex h-fit flex-col bg-main w-full rounded-xl p-2 lg:p-8">
			<h1 className="text-4xl font-bold text-center mb-2">Leaderboards</h1>
			<span className="font-semibold text-center mb-2">
				Please note these only consist of players that are known to this website.
			</span>
			
			{children}
		</div>
	);
};

export default Layout;
