"use client";

import Tooltip from "@mui/material/Tooltip";
import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

interface SnapshotCooldownProps {
	saveTime: Date;
	nextSaveTime: Date;
}

const SnapshotCooldown: React.FC<SnapshotCooldownProps> = ({ saveTime, nextSaveTime }) => {
	const [remaining, setRemaining] = useState<number>(nextSaveTime.getTime() - Date.now());

	useEffect(() => {
		const interval = setInterval(() => {
			setRemaining(nextSaveTime.getTime() - Date.now());
		}, 1000);
		return () => clearInterval(interval);
	}, [nextSaveTime]);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.max(0, Math.floor(ms / 1000));
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };
	return (
        <Tooltip
            className="ml-auto text-red-500"
            title={"Last save: " + saveTime?.toLocaleTimeString() + " Available: " + nextSaveTime?.toLocaleTimeString()}
            slotProps={{
                tooltip: {
                    sx: { maxWidth: "200px" }
                }
            }}
        >
            <div className="flex items-center gap-2">
                <span className="text-lg font-medium">{formatTime(remaining)}</span>
                <Clock className="w-7 h-7" />
            </div>
        </Tooltip>
	);
};

export default SnapshotCooldown;
