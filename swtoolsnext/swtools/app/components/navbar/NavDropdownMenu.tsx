"use client";
import React from "react";
interface NavButtonProps {
	label: string;
	href: string;
}

const NavButton: React.FC<NavButtonProps> = ({ label, href }) => (
	<a
		href={href}
		className="px-3 py-2 hover:border-b-4 border-[var(--accent)] rounded transition-all duration-50 font-montserrat font-[700] text-xl block cursor-pointer"
	>
		{label}
	</a>
);

export default NavButton;
