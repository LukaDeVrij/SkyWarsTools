import { fetcher } from "@/app/utils/Utils";
import { X } from "lucide-react";
import React from "react";
import useSWR from "swr";
import Image from "next/image";

type BackgroundSelectorProps = {
	state: {
		showDialog: boolean;
		setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
	};
	setBackground: (bg: string) => void;
	currentBackground: string | null;
};

function BackgroundSelector({ state, setBackground, currentBackground }: BackgroundSelectorProps) {
	const { showDialog, setShowDialog } = state;
	const [selectedMap, setSelectedMap] = React.useState<string | null>(null);

	type MapsList = string[];
	const {
		data: mapsData,
		error: mapsError,
		isLoading: mapsIsLoading,
	} = useSWR<MapsList>(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/maps/list`, fetcher, {
		revalidateOnFocus: false,
		revalidateIfStale: false,
		revalidateOnReconnect: false,
	});

	const sortedData = React.useMemo(() => {
		if (!mapsData) return [];
		const unique = Array.from(new Set(mapsData));
		return unique.sort((a, b) => a.localeCompare(b));
	}, [mapsData]);

	// Preselect the current background when dialog opens
	React.useEffect(() => {
		if (showDialog) {
			setSelectedMap(currentBackground || "Siege");
		}
	}, [showDialog, currentBackground]);

	function handleClose() {
		setShowDialog(false);
		if (selectedMap) setBackground(selectedMap);
	}

	return (
		<div className="p-4 rounded-xl w-full lg:w-[1150px] h-[500px] bg-layer relative">
			<button className="absolute top-4 right-4 text-white cursor-pointer" onClick={() => handleClose()} aria-label="Close">
				<X size={32} />
			</button>
			<h2 className="text-xl lg:text-2xl font-bold mb-4">Change Profile Background</h2>
			{/* Your background selection UI goes here */}
			<div className="w-full lg:h-[415px] flex flex-col gap-2">
				<h2 className="font-semibold">Maps</h2>
				<div className="w-full h-40 lg:h-50 flex overflow-x-auto gap-2 p-2 bg-content rounded-xl">
					{sortedData &&
						sortedData.map((map) => (
							<div
								key={map}
								className={`flex flex-col items-center cursor-pointer border-2 rounded-lg ${
									selectedMap === map ? "border-blue-500" : "border-transparent"
								}`}
								onClick={() => setSelectedMap(map)}
							>
								<div className="h-30 aspect-video flex items-center justify-center bg-gray-200 rounded-md overflow-hidden mb-2">
									<Image
										src={`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/maps/image?name=${encodeURIComponent(map)}`}
										alt={map}
										width={230}
										height={0}
										unoptimized
										style={{ objectFit: "contain" }}
									/>
								</div>
								<span className="text-xs text-center break-all font-semibold">{map}</span>
							</div>
						))}
				</div>
				{/* <h2 className="font-semibold">Patreon Backgrounds</h2>
				<div className="bg-red-100 w-full h-50 flex overflow-x-scroll gap-2"></div> */}
			</div>
		</div>
	);
}

export default BackgroundSelector;
