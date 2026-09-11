"use client";

import React from "react";

type MetaDataResponse = {
	success: boolean;
	hypixelAPIOnline?: boolean;
};

const HypixelAPIDownNotice = () => {
	const [apiStatus, setApiStatus] = React.useState<MetaDataResponse>();

	React.useEffect(() => {
		fetch(process.env.NEXT_PUBLIC_SKYWARSTOOLS_API + "/api/getMetadata" || "http://api.skywarstools.com/api/getMetadata", {
			method: "GET",
		})
			.then(async (res) => {
				if (res.ok) {
					const data: MetaDataResponse = await res.json();
					setApiStatus(data);
				} else {
					setApiStatus({ success: false });
				}
			})
			.catch(() => {
				setApiStatus({ success: false });
			});
	}, []);

	if (!apiStatus || apiStatus.hypixelAPIOnline !== false) {
		return null;
	}
	return (
		<div className="w-fit m-auto mb-2 lg:mt-2 lg:rounded-xl font-bold p-3 border-red-500 border-2">
			Hypixel's API is currently down, so some features may not work correctly.
		</div>
	);

};

export default HypixelAPIDownNotice;
