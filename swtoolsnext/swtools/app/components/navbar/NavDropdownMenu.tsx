"use client";
import React, { useState, useRef, useEffect } from "react";

interface DropdownItem {
	name: string;
	href: string;
}

interface NavDropdownMenuProps {
	label: string;
	dropdown: DropdownItem[];
}

const NavDropdownMenu: React.FC<NavDropdownMenuProps> = ({ label, dropdown }) => {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Close dropdown on outside click
	useEffect(() => {
		if (!open) return;
		function handleClick(e: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [open]);

	// Toggle dropdown on button click
	const handleButtonClick = () => {
		setOpen((prev) => !prev);
	};

	// Show dropdown if there are items
	return (
		<div
			ref={containerRef}
			className="relative group font-montserrat font-[700] text-xl"
			// On touch devices, open on click; on desktop, allow hover
		>
			<button
				type="button"
				className="px-3 py-2 hover:border-b-4 border-[var(--accent)] rounded transition-all duration-50"
				onClick={handleButtonClick}
				aria-expanded={open}
				aria-haspopup="true"
			>
				{label}
			</button>
			{dropdown && dropdown.length > 0 && (
				<div
					className={
						`absolute left-0 top-full z-10 bg-[var(--background-layer)] shadow-lg rounded transition-opacity ` +
						` ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} ` +
						` group-hover:opacity-100 group-hover:pointer-events-auto hover:opacity-100 hover:pointer-events-auto`
					}
				>
					<ul className="flex flex-col">
						{dropdown.map((item) => (
							<li key={item.name}>
								<a
									href={item.href}
									className="block px-4 py-2 text-[var(--foreground)] border-[var(--background-layer)] border-b-4 hover:border-[var(--accent)] 
									rounded transition-all duration-50 whitespace-nowrap animate-press"
									onClick={() => setOpen(false)}
								>
									{item.name}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default NavDropdownMenu;
