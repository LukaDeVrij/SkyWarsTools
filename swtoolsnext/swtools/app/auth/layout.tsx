import React from "react";
import { type ReactNode } from "react";
import AuthNavBar from "../components/auth/AuthNavBar";

interface LayoutProps {
	children: ReactNode;
}

const PlayerStatsLayout = async ({ children }: LayoutProps) => {
	return (
		<>
			<AuthNavBar />
			<div className="flex h-fit flex-col items-center justify-center bg-content w-full lg:w-[1000px]">{children}</div>
		</>
	);
};

export default PlayerStatsLayout;
