import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import NavDropdownMenu from "./NavDropdownMenu";
import Profile from "./Profile";

const TopNavBar = () => {
	const content = [
		
		{
			name: "Player",
			dropdown: [
				{ name: "Stats", href: "/player/[playername]/stats" },
				{ name: "Compare", href: "/player/[playername]/compare" },
				{ name: "Session", href: "/player/[playername]/session" },
				{ name: "Calculate", href: "/player/[playername]/calculate" },
			],
		},
		{
			name: "Leaderboards",
			// Could maybe just become one page with tabs or something
			dropdown: [
				{ name: "Kit", href: "/leaderboards/kit" },
				{ name: "Overall", href: "/leaderboards/overall" },
			],
		},
		{
			name: "Tools",
			dropdown: [
				{ name: "Map Rotation", href: "/extra/map-rotation" },
				{ name: "Montage Card", href: "/extra/montage-card" },
			],
		},
        {
			name: "About",
			dropdown: [
				{ name: "About", href: "/about" },
				{ name: "Help", href: "/help" },
			],
		},
	];
	return (
		<>
			<nav className="bg-[var(--background-layer)] w-full h-18 flex justify-center space-between">
				<div className="bg-[var(--background-layer)]h-18 w-[1000px] flex items-center justify-start gap-4">
					<Link
						className="flex items-center gap-2 bg-[var(--skywarstools-accent)] p-2 pl-4 pr-4 rounded transition-transform active:scale-98"
						href="/"
					>
						<Logo />
						<span className="text-[var(--foreground)] text-xl ml-2 font-[700] font-montserrat">
							SkyWarsTools
						</span>
					</Link>
					<div className="flex items-center gap-5 font-montserrat font-[500] text-lg">
						{content.map((item, idx) => (
							<NavDropdownMenu
								key={item.name}
								label={item.name}
								dropdown={item.dropdown}
							/>
						))}
					</div>
                    <Profile />
				</div>
			</nav>
		</>
	);
};

export default TopNavBar;
