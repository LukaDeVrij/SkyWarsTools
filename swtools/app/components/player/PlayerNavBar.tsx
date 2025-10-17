"use client";
import React from "react";

import { usePathname } from "next/navigation";

interface PlayerNavBarProps {
	playerName?: string; // Optional prop for player name if needed
}

const PlayerNavBar: React.FC<PlayerNavBarProps> = ({ playerName }) => {
	const pathname = usePathname();
	// Normalize path for matching
	const normalizedPath = pathname.toLowerCase();

	const navItems = [
		{ label: "Stats", href: `/player/${playerName}/stats/table` },
		{ label: "Session", href: `/player/${playerName}/session` },
		{ label: "Compare", href: `/player/${playerName}/compare` },
		{ label: "Calculate", href: `/player/${playerName}/calculate` },
	];

	return (
		<nav className="bg-main w-full h-10 lg:h-[60px] flex p-1 lg:p-3 lg:rounded-t-xl overflow-x-scroll lg:overflow-hidden">
			{/* Left spacer */}
			<div className="w-2 flex flex-col justify-center items-center">
				<div className="h-7 w-full lg:h-[32px]" />
				<div className="bg-yellow-300 h-0.5 lg:h-[2px] w-full" />
			</div>
			{navItems.map((item, idx) => {
				// console.log(normalizedPath)
				const isActive = normalizedPath.includes(item.href.toLowerCase());
				return (
					<React.Fragment key={item.label}>
						<div className="flex flex-col items-center">
							<a
								href={item.href}
								className={`text-lg lg:text-2xl text-[var(--foreground)] font-[700] animate-press border-[var(--accent)] hover:border-b-2 ${isActive ? "text-accent" : "font-normal"}`}
							>
								{item.label}
							</a>
							<div className="flex flex-col justify-center items-center h-1 w-full">
								<div className={"bg-yellow-300 w-full " + (isActive ? "h-1 rounded-4xl" : "h-0.5 ")} />
							</div>
						</div>
						{/* Spacer between items, except after last */}
						{idx < navItems.length - 1 && (
							<div className="w-5 flex flex-col justify-center items-center">
								<div className="h-7 w-full lg:h-[32px]" />
								<div className="bg-yellow-300 h-0.5 lg:h-[2px] w-full" />
							</div>
						)}
					</React.Fragment>
				);
			})}
			{/* Right spacer */}
			<div className="w-2 flex flex-col justify-center items-center">
				<div className="h-7 w-full lg:h-[32px]" />
				<div className="bg-yellow-300 h-0.5 lg:h-[2px] w-full" />
			</div>
		</nav>
	);
};

export default PlayerNavBar;
