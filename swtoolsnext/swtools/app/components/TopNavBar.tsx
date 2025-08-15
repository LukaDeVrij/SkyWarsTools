import React from "react";
import Logo from "./Logo";
import Link from "next/link";

const TopNavBar = () => {
	return (
		<nav className="bg-[var(--background-layer)] w-full h-18 flex justify-center">
			<div className="bg-[var(--background-layer)] h-18 w-[1000px] flex items-center justify-between">
                <Link
                    className="flex items-center gap-2 bg-[var(--skywarstools-accent)] p-2 pl-4 pr-4 rounded-sm transition-transform active:scale-98"
                    href="/"
                >
                    <Logo />
                    <span className="text-[var(--foreground)] text-lg font-semibold ml-2">
                        SkyWars Tools
                    </span>
                </Link>
			</div>
		</nav>
	);
};

export default TopNavBar;
