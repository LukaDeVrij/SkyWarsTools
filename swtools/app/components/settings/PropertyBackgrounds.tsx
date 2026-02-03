"use client";
import React, { useEffect, useState } from "react";
import Button from "../universal/Button";
import { Edit} from "lucide-react";
import BackgroundSelector from "./BackgroundSelector";

const PropertyCombobox: React.FC<{
	value?: string | null;
	setBackground: React.Dispatch<React.SetStateAction<string | null>>;
	user?: UserProfile | null;
}> = ({ value, setBackground, user }) => {
	const [showDialog, setShowDialog] = useState(false);
	const [currentMap, setCurrentMap] = useState<string>(value || "None");
	const [isPatreonBg, setIsPatreonBg] = useState<boolean>(false);

	useEffect(() => {
		if (value) {
			setCurrentMap(value);
			if (value.includes(".webp") && (user?.contrib == true || user?.patreon == true)) {
				setIsPatreonBg(true);
			}
		}
	}, [value]);

	return (
		<>
			<div className="flex justify-between items-start lg:items-center gap-2 rounded-lg w-full flex-col lg:flex-row">
				<div>
					<div className="flex items-center">
						<strong className="text-lg">Profile Background</strong>
					</div>
					<div className="text-sm text-gray-200 mt-[-6px]">The image shown on your MC account page</div>
				</div>
				<div className="flex flex-row gap-4 items-center font-semibold">
					<span className="text-2xl">{currentMap}</span>
					<Button onClick={() => setShowDialog(true)}>
						<Edit />
					</Button>
				</div>
			</div>
			{showDialog && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<BackgroundSelector
						state={{ showDialog, setShowDialog }}
						setBackground={(bg) => {
							setBackground(bg);
						}}
						currentBackground={currentMap === "None" ? null : currentMap}
						user={user}
					/>
				</div>
			)}
		</>
	);
};

export default PropertyCombobox;
