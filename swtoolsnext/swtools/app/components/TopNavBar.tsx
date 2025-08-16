import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import NavDropdownMenu from "./NavDropdownMenu";
import NavBarProfile from "./NavBarProfile";
import PlayerInputField from "./PlayerInputField";

const TopNavBar = () => {
	const content = [
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
			<nav className="bg-[var(--background-layer)] w-full h-full lg:h-18 flex justify-center space-between">
				<div className="bg-[var(--background-layer)] h-full lg:h-18 w-[100vw] lg:w-[1000px] items-center justify-start flex-row lg:flex gap-2">
					<Link
						className="flex items-center gap-2 p-2 bg-[var(--skywarstools-accent)] rounded transition-transform active:scale-98"
						href="/"
					>
						<Logo />
					</Link>
					<PlayerInputField />
					<div className="flex items-center gap-5 font-montserrat font-[500] text-lg">
						{content.map((item, idx) => (
							<NavDropdownMenu key={item.name} label={item.name} dropdown={item.dropdown} />
						))}
					</div>
					<NavBarProfile />
				</div>
			</nav>
		</>
	);
};

export default TopNavBar;
