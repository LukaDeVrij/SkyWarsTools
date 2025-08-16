import React from "react";

interface DropdownItem {
	name: string;
	href: string;
}

interface NavDropdownMenuProps {
	label: string;
	dropdown: DropdownItem[];
}

const NavDropdownMenu: React.FC<NavDropdownMenuProps> = ({ label, dropdown }) => {
	// Show dropdown if there are items
	return (
		<div className="relative group">
			<button
				type="button"
				className="px-3 py-2 hover:bg-[var(--skywarstools-accent)] rounded transition-colors"
			>
				{label}
			</button>
			{dropdown && dropdown.length > 0 && (
				<div className="absolute left-0 top-full z-10 bg-[var(--background-layer)] shadow-lg rounded opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto hover:opacity-100 hover:pointer-events-auto transition-opacity">
					<ul className="flex flex-col">
						{dropdown.map((item) => (
							<li key={item.name}>
								<a
									href={item.href}
									className="block px-4 py-2 text-[var(--foreground)] hover:bg-[var(--skywarstools-accent)] rounded transition-colors whitespace-nowrap transition-transform active:scale-98"
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
