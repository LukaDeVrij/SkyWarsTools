import Link from "next/link";
import React from "react";

const NavBarProfile = () => {
	return (
		<Link
			className="float-right ml-auto p-2 rounded-md text-[var(--foreground)] font-montserrat font-[500]"
			href={"/profile"}
		>
			{/* Temp */}
			<img src="https://www.mc-heads.net/avatar/Techoblade/100" className="h-12 w-12 rounded"></img>
		</Link>
	);
};

export default NavBarProfile;
