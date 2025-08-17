import React from "react";
import ResponsiveLogo from "../ResponsiveLogo";
import Link from "next/link";
import NavDropdownMenu from "./NavDropdownMenu";
import NavBarProfile from "./NavBarProfile";
import PlayerInputField from "./PlayerInputField";

const TopNavBar = () => {
	const content = [
		{
			name: "Tools",
			dropdown: [
				{ name: "Map Rotation", href: "/extra/map-rotation" },
				{ name: "Montage Card", href: "/extra/montage-card" },
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
			name: "About",
			dropdown: [
				{ name: "About", href: "/about" },
				{ name: "Help", href: "/help" },
			],
		},
	];
	return (
		<>
			<nav className="bg-[var(--background-layer)] w-full h-full lg:h-18 flex justify-center space-between">
				<div className="bg-[var(--background-layer)] h-full lg:h-18 w-[100vw] lg:w-[1000px] items-center justify-start flex-row lg:flex gap-4">
					<div className="flex items-center justify-start gap-1 lg:gap-4 order-0">
						<Link className="p-2 animate-press" href="/">
							<ResponsiveLogo />
						</Link>
						<PlayerInputField />
						<NavBarProfile mobile={true} />
					</div>

					<div className="flex items-center justify-center lg:justify-start gap-2 lg:gap-4">
						{content.map((item) => (
							<NavDropdownMenu key={item.name} label={item.name} dropdown={item.dropdown} />
						))}
					</div>
					<NavBarProfile />
				</div>
			</nav>
			<div
				className="lg:absolute z-[-10] w-full h-4"
				style={{
					background: "linear-gradient(to bottom, var(--background-layer), transparent)",
				}}
			></div>
		</>
	);
};

export default TopNavBar;
