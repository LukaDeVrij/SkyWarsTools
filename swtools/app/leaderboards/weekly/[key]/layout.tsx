import Alert from "@/app/components/universal/Alert";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex h-fit flex-col bg-main w-full rounded-xl p-2 lg:p-8">
			<h1 className="text-4xl font-bold text-center mb-2">Weekly Comparison</h1>
			<Alert
				variant="warning"
				messages={["Will only include players that are on the Hypixel Kills Top 100 in subsequent weeks."]}
			></Alert>
			<br></br>

			{children}
		</div>
	);
};

export default Layout;
