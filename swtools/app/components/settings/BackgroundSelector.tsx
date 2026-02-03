import { fetcher } from "@/app/utils/Utils";
import { LucideLock, X } from "lucide-react";
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
	user?: UserProfile | null;
};

function BackgroundSelector({ state, setBackground, currentBackground, user }: BackgroundSelectorProps) {
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

	const canDoPatreonBg: boolean | undefined | null = user?.patreon || user?.contrib;
	const {
		data: bgData,
		error: bgError,
		isLoading: bgIsLoading,
	} = useSWR<MapsList>(`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/backgrounds/list`, fetcher, {
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
				<div className="w-full h-40 lg:h-50 flex overflow-x-auto gap-2 p-2 bg-content rounded-xl items-center">
					{sortedData &&
						sortedData.map((map) => (
							<div
								key={map}
								className={`flex flex-col items-center cursor-pointer border-2 rounded-lg ${
									selectedMap === map ? "border-blue-500" : "border-transparent"
								}`}
								onClick={() => setSelectedMap(map)}
							>
								<div className="h-26 aspect-video flex items-center justify-center bg-gray-200 rounded-md overflow-hidden mb-2">
									<Image
										src={`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/maps/image?name=${encodeURIComponent(map)}`}
										alt={map}
										width={230}
										height={0}
										unoptimized
										style={{ objectFit: "contain" }}
									/>
								</div>
								<span className="text-s text-center break-all font-semibold">{map}</span>
							</div>
						))}
				</div>
				<h2 className="font-semibold">Patreon Backgrounds</h2>
				<div
					className={`w-full h-40 lg:h-50 flex overflow-x-auto gap-2 p-2 bg-content rounded-xl items-center relative ${
						!canDoPatreonBg ? "opacity-50 pointer-events-none" : ""
					}`}
				>
					{bgData?.map((bg) => (
						<div
							key={bg}
							className={`flex flex-col items-center cursor-pointer border-2 rounded-lg ${
								selectedMap === bg ? "border-blue-500" : "border-transparent"
							}`}
							onClick={() => setSelectedMap(bg)}
						>
							<div className="h-26 aspect-video flex items-center justify-center bg-gray-200 rounded-md overflow-hidden mb-2">
								<Image
									src={`${process.env.NEXT_PUBLIC_SKYWARSTOOLS_API}/backgrounds/image?name=${encodeURIComponent(bg)}`}
									alt={bg}
									width={230}
									height={0}
									quality={10}
									style={{ objectFit: "contain" }}
								/>
							</div>
							<span className="text-s text-center break-all font-semibold">{bg}</span>
						</div>
					))}
					{!canDoPatreonBg && (
						<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
							<LucideLock size={48} className="text-white mb-4" />
							<span className="bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg font-semibold">
								Unlock with a Patreon subscription 
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default BackgroundSelector;
