import React from "react";
import ResponsiveLogo from "../ResponsiveLogo";
import Link from "next/link";
import NavDropdownMenu from "./NavDropdownMenu";
import NavBarProfile from "./NavBarProfile";
import PlayerInputField from "./PlayerInputField";

const TopNavBar = () => {
	const content = [
		{ name: "Tools", href: "/tools" },
		{ name: "Leaderboards", href: "/leaderboards" },
		{ name: "About", href: "/about" },
	];
	return (
		<>
			<nav className="bg-nav w-full h-full lg:h-18 flex justify-center space-between sticky top-0 z-50 shadow-lg">
				<div className="bg-nav h-full lg:h-18 w-[100vw] lg:w-[1000px] items-center justify-start flex-row lg:flex gap-4">
					<div className="flex items-center justify-start gap-1 lg:gap-4 order-0">
						<Link className="p-2 animate-press" href="/">
							<ResponsiveLogo />
						</Link>
						<PlayerInputField />
						<NavBarProfile mobile={true} />
					</div>

					<div className="flex items-center justify-center lg:justify-start gap-2 lg:gap-4">
						{content.map((item) => (
							<NavDropdownMenu key={item.name} label={item.name} href={item.href} />
						))}
					</div>
					<NavBarProfile />
				</div>
			</nav>
			{/* <div
				className="lg:absolute z-[-10] w-full h-4"
				style={{
					background: "linear-gradient(to bottom, var(--background-nav), transparent)",
				}}
			></div> */}
		</>
	);
};

export default TopNavBar;
