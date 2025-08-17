import Link from "next/link";
// import Image from "next/image";
import React from "react";

interface NavBarProfileProps {
	mobile?: boolean;
}

const NavBarProfile: React.FC<NavBarProfileProps> = ({ mobile = false }) => {
	return (
		<Link
			className={`float-right ml-auto p-2 rounded-md text-[var(--foreground)] font-montserrat font-[700] animate-press ${
				mobile ? "block lg:hidden" : "hidden lg:block"
			}`}
			href={"/profile"}
		>
			{/* Temp */}
			<img src="https://www.mc-heads.net/avatar/Techoblade/100" alt="Profile picture" className="h-12 w-12 rounded aspect-square" />
		</Link>
	);
};

export default NavBarProfile;
