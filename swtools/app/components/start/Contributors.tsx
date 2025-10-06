import React from "react";

const Contributors = () => {
	return (
		<div className="rounded-lg px-4 lg:px-8 w-full flex flex-col mb-5">
			<h2 className="text-2xl font-bold">Contributors</h2>
			<span className="font-semibold mb-1">Special thanks to these people for contributing to the project!</span>
			<div className="flex flex-row gap-4 flex-wrap">
				<span>LifelessNerd</span>
				<span>Forums_</span>
				<span>SMED</span>
				<span>abald</span>
			</div>
		</div>
	);
};

export default Contributors;
