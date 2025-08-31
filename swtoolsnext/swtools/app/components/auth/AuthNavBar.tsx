"use client";
import React from "react";

import { usePathname } from "next/navigation";

const PlayerNavBar: React.FC = () => {
	const pathname = usePathname();
	// Normalize path for matching
	const normalizedPath = pathname.toLowerCase();

	const navItems = [
		{ label: "Profile", href: "/auth/profile" },
		{ label: "Settings", href: "/auth/settings" },
		{ label: "Log out", href: "/auth/log-out" },
	];

	return (
		<nav className="bg-main w-full h-10 lg:h-[60px] flex p-1 lg:p-3 lg:rounded-t-xl overflow-x-scroll lg:overflow-hidden">
			{/* Left spacer */}
			<div className="w-2 flex flex-col justify-center items-center">
				<div className="h-7 w-full lg:h-[32px]" />
				<div className="bg-yellow-300 h-0.5 lg:h-[2px] w-full" />
			</div>
			{navItems.map((item, idx) => {
				// Map label to path for matching
				let itemPath = item.href;
				if (item.label.toLowerCase() === "profile") itemPath = "/auth/profile";
				if (item.label.toLowerCase() === "settings") itemPath = "/auth/settings";
				if (item.label.toLowerCase() === "log-out") itemPath = "/auth/log-out";
				const isActive = normalizedPath.endsWith(itemPath);
				return (
					<React.Fragment key={item.label}>
						<div className="flex flex-col items-center">
							<a
								href={itemPath}
								className="text-lg lg:text-2xl text-[var(--foreground)] font-[700] animate-press border-[var(--accent)] hover:border-b-2 "
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
