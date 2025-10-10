"use client";
import { OverallResponse } from "@/app/types/OverallResponse";
import { calcLevel, fillMCColorText } from "@/app/utils/Utils";
import React from "react";
import { useRef } from "react";
import Button from "../universal/Button";
import { formatScheme } from "@/app/utils/Scheme";
import { getPlayerRank } from "@/app/utils/RankTag";

const MontageCard: React.FC<OverallResponse> = (data) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const handleSave = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			const link = document.createElement("a");
			link.download = data.player + "_card.png";
			link.href = canvas.toDataURL("image/png");
			link.click();
		}
	};
	const handleCopy = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			canvas.toBlob((blob) => {
				if (blob) {
					const item = new ClipboardItem({ "image/png": blob });
					navigator.clipboard.write([item]);
				}
			});
		}
	};

	// Kind of hardcoded, but it works
	const box = [10, 0, 900, 85];

	// Scheme bits
	const level = calcLevel(data.stats.skywars_experience ?? 0);
	const scheme = formatScheme(level, data, true);

	// Rank
	const rank = getPlayerRank(data);

	React.useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");

			const myFont = new FontFace("MinecraftReg", "url(/fonts/MinecraftRegular.ttf)");
			myFont.load().then((font) => {
				document.fonts.add(font);
				if (ctx) {
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.font = `40px MinecraftReg`;
					let text = `${scheme}`;
					if (rank.cleanPrefix) {
						text += " " + rank.prefix + " ";
					} else {
						text += "§7 ";
					}
					text += data.player;
					fillMCColorText(ctx, text, box);
				}
			});
		}
	});

	return (
		<div className="flex flex-col items-center gap-4 py-8 overflow-hidden">
			<div className="w-full max-w-full overflow-x-auto lg:justify-center flex">
				<canvas
					ref={canvasRef}
					width={900}
					height={60}
					style={{
						border: "3px solid #ffffff22",
						borderRadius: "10px",
						display: "block",
						minWidth: "600px",
						maxWidth: "100%",
					}}
				/>
			</div>
			<div className="flex gap-2">
				<Button onClick={handleSave}>Save</Button>
				<Button onClick={handleCopy}>Copy</Button>
			</div>
		</div>
	);
};

export default MontageCard;
