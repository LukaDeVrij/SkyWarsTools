import React from "react";

const Footer = () => {
	return (
		<div className="bottom-0 bg-nav w-full mt-2">
			<div className="w-[100vw] lg:w-[1000px] m-auto p-4 text-center text-sm text-gray-400 select-none flex justify-between items-center">
				<div className="w-30 lg:w-50">Made by LifelessNerd</div>
				<div className="w-30 lg:w-50">
					<span>Not affiliated with Hypixel, Mojang or Microsoft</span>
				</div>
				<div className="w-30 lg:w-50 underline">
					<a href="https://github.com/LukaDeVrij/SkyWarsTools">SkyWarsTools is open source!</a>
				</div>
			</div>
		</div>
	);
};

export default Footer;
