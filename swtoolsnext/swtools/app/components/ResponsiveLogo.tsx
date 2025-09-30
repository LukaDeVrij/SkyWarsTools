import React from "react";
import Image from "next/image";

const ResponsiveLogo = () => {
	return (
		<div className="flex items-center">
			<Image src="/title.png" alt="Title card with logo and name" height={20} width={105} className="hidden lg:block" priority />
			<Image src="/logo.png" alt="Logo" height={40} width={40} className="h-10 lg:hidden" priority />
		</div>
	);
};

export default ResponsiveLogo;
