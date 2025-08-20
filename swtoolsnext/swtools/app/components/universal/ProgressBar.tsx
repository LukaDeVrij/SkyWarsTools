import React from "react";

export enum ProgressBarMode {
	DEFAULT,
	PERCENTAGE_ONLY,
}
interface ProgressBarProps {
	progress: number;
	total: number;
	bgColor: string;
	progressColor: string;
	decimals?: number;
	mode?: ProgressBarMode;
	textColor?: "white" | "black";
}
const ProgressBar: React.FC<ProgressBarProps> = ({
	progress,
	total,
	bgColor,
	progressColor,
	decimals = 2,
	mode = ProgressBarMode.DEFAULT,
}) => {
	const progressPercentage = total > 0 ? (progress / total) * 100 : 0;

	return (
		<div className="w-full">
			<div
				className="relative w-full h-8 rounded-full overflow-hidden flex items-center"
				style={{ backgroundColor: bgColor }}
			>
				<div
					className="absolute left-0 top-0 h-full transition-all"
					style={{ width: `${progressPercentage}%`, backgroundColor: progressColor }}
				/>
				<div
					className={`relative z-10 w-full flex justify-center items-center text-white font-bold text-lg`}
				>
					{mode === ProgressBarMode.PERCENTAGE_ONLY
						? `${progressPercentage.toFixed(decimals)}%`
						: `${progress.toLocaleString()}/${total.toLocaleString()} (${progressPercentage.toFixed(decimals)}%)`}
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
