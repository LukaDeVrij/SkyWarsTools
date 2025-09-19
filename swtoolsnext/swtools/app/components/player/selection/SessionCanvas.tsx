// This component is ported from the old SkyWarsTools codebase, which was vanilla JS + HTML based.
// This is why its hella long, and not very React-y. Also many Typescript hacks

import { calcEXPFromLevel, calcLevel, calcPrestigeTag, timeDiff } from "@/app/utils/Utils";
import React, { useRef } from "react";

interface SessionCanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
	data?: SnapshotsResponse;
	mode?: "overall" | "solo" | "team" | "mini";
}
type Entry = {
	title?: string;
	statsKey?: string;
	box: [number, number, number, number];
	color?: string;
	content?: (ctx: CanvasRenderingContext2D, entry: Entry, oldStats: Snapshot, newStats: Snapshot) => void;
	contentSize: string;
};
type Snapshot = {
	player: string;
	queried: number;
	stats: Record<string, number>;
	uuid: string;
	statsVersion: number;
};

type SnapshotsResponse = {
	[key: string]: Snapshot;
};

const SessionCanvas: React.FC<SessionCanvasProps> = (props) => {
	const { data, mode, ...canvasProps } = props;
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	type CanvasBoxes = {
		[key: string]: Entry;
	};

	const scalingFactorY = 1.6;
	const scalingFactorX = 2;

	const canvasBoxesConfig: {
		overall: CanvasBoxes;
		solo: CanvasBoxes;
		team: CanvasBoxes;
		mini: CanvasBoxes;
	} = {
		overall: {
			skin: {
				title: undefined,
				statsKey: undefined,
				box: [10 * scalingFactorX, 10 * scalingFactorY, 238 * scalingFactorX, 300 * scalingFactorY],
				color: undefined,
				content: sessionFillImage,
				contentSize: "60px",
			},
			header: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 10 * scalingFactorY, 732 * scalingFactorX, 50 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillHeader,
				contentSize: "42px",
			},
			player_name: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 70 * scalingFactorY, 732 * scalingFactorX, 120 * scalingFactorY],
				color: undefined,
				content: sessionFillPlayerName,
				contentSize: "92px",
			},
			mode: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 260 * scalingFactorY, 732 * scalingFactorX, 50 * scalingFactorY],
				color: "#edaa23",
				content: sessionFillMode,
				contentSize: "42px",
			},
			timespan: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 200 * scalingFactorY, 732 * scalingFactorX, 50 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillTimespan,
				contentSize: "42px",
			},
			wins: {
				title: "Wins",
				statsKey: "wins",
				box: [10 * scalingFactorX, 320 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#6af168",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			losses: {
				title: "Losses",
				statsKey: "losses",
				box: [258 * scalingFactorX, 320 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#ea5e5f",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			w_l_ratio: {
				title: "W/L",
				statsKey: undefined,
				box: [505 * scalingFactorX, 320 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#edaa23",
				content: sessionFillRatio,
				contentSize: "96px",
			},
			time_played: {
				title: "Playtime",
				statsKey: "time_played",
				box: [753 * scalingFactorX, 320 * scalingFactorY, 237 * scalingFactorX, 150 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillPlaytime,
				contentSize: "96px",
			},
			kills: {
				title: "Kills",
				statsKey: "kills",
				box: [10 * scalingFactorX, 480 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#6af168",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			deaths: {
				title: "Deaths",
				statsKey: "deaths",
				box: [258 * scalingFactorX, 480 * scalingFactorY, 237 * scalingFactorX, 150 * scalingFactorY],
				color: "#ea5e5f",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			k_d_ratio: {
				title: "K/D",
				statsKey: undefined,
				box: [505 * scalingFactorX, 480 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#edaa23",
				content: sessionFillRatio,
				contentSize: "96px",
			},
			heads: {
				title: "Heads",
				statsKey: "heads",
				box: [753 * scalingFactorX, 480 * scalingFactorY, 237 * scalingFactorX, 150 * scalingFactorY],
				color: "#f542ec",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			skywars_experience: {
				title: "EXP Gained",
				statsKey: "skywars_experience",
				box: [10 * scalingFactorX, 640 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#f542ec",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			progress: {
				title: "Progress",
				statsKey: undefined,
				box: [258 * scalingFactorX, 640 * scalingFactorY, 485 * scalingFactorX, 150 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillProgress,
				contentSize: "58px",
			},
			hourly_exp: {
				title: "EXP Per Hour",
				statsKey: undefined,
				box: [753 * scalingFactorX, 640 * scalingFactorY, 237 * scalingFactorX, 150 * scalingFactorY],
				color: "#f542ec",
				content: sessionFillHourlyEXP,
				contentSize: "96px",
			},
		},
		solo: {
			skin: {
				title: undefined,
				statsKey: undefined,
				box: [10 * scalingFactorX, 10 * scalingFactorY, 238 * scalingFactorX, 300 * scalingFactorY],
				color: undefined,
				content: sessionFillImage,
				contentSize: "60px",
			},
			header: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 10 * scalingFactorY, 732 * scalingFactorX, 50 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillHeader,
				contentSize: "42px",
			},
			player_name: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 70 * scalingFactorY, 732 * scalingFactorX, 120 * scalingFactorY],
				color: undefined,
				content: sessionFillPlayerName,
				contentSize: "92pxr",
			},
			mode: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 260 * scalingFactorY, 732 * scalingFactorX, 50 * scalingFactorY],
				color: "#edaa23",
				content: sessionFillMode,
				contentSize: "42px",
			},
			timespan: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 200 * scalingFactorY, 732 * scalingFactorX, 50 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillTimespan,
				contentSize: "42px",
			},
			wins: {
				title: "Solo Wins",
				statsKey: "wins_solo",
				box: [10 * scalingFactorX, 320 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#6af168",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			losses: {
				title: "Solo Losses",
				statsKey: "losses_solo",
				box: [258 * scalingFactorX, 320 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#ea5e5f",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			w_l_ratio: {
				title: "Solo W/L",
				statsKey: undefined,
				box: [505 * scalingFactorX, 320 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#edaa23",
				content: sessionFillRatio,
				contentSize: "96px",
			},
			time_played: {
				title: "Solo Playtime",
				statsKey: "time_played_solo",
				box: [753 * scalingFactorX, 320 * scalingFactorY, 237 * scalingFactorX, 150 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillPlaytime,
				contentSize: "96px",
			},
			kills: {
				title: "Solo Kills",
				statsKey: "kills_solo",
				box: [10 * scalingFactorX, 480 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#6af168",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			deaths: {
				title: "Solo Deaths",
				statsKey: "deaths_solo",
				box: [258 * scalingFactorX, 480 * scalingFactorY, 237 * scalingFactorX, 150 * scalingFactorY],
				color: "#ea5e5f",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			k_d_ratio: {
				title: "Solo K/D",
				statsKey: undefined,
				box: [505 * scalingFactorX, 480 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#edaa23",
				content: sessionFillRatio,
				contentSize: "96px",
			},
			heads: {
				title: "Heads (Overall)",
				statsKey: "heads",
				box: [753 * scalingFactorX, 480 * scalingFactorY, 237 * scalingFactorX, 150 * scalingFactorY],
				color: "#f542ec",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			skywars_experience: {
				title: "EXP Gained (Overall)",
				statsKey: "skywars_experience",
				box: [10 * scalingFactorX, 640 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#f542ec",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			progress: {
				title: "Progress",
				statsKey: undefined,
				box: [258 * scalingFactorX, 640 * scalingFactorY, 485 * scalingFactorX, 150 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillProgress,
				contentSize: "58px",
			},
			hourly_exp: {
				title: "EXP/Hour (Overall)",
				statsKey: undefined,
				box: [753 * scalingFactorX, 640 * scalingFactorY, 237 * scalingFactorX, 150 * scalingFactorY],
				color: "#f542ec",
				content: sessionFillHourlyEXP,
				contentSize: "96px",
			},
		},
		team: {
			skin: {
				title: undefined,
				statsKey: undefined,
				box: [10 * scalingFactorX, 10 * scalingFactorY, 238 * scalingFactorX, 300 * scalingFactorY],
				color: undefined,
				content: sessionFillImage,
				contentSize: "60px",
			},
			header: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 10 * scalingFactorY, 732 * scalingFactorX, 50 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillHeader,
				contentSize: "42px",
			},
			player_name: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 70 * scalingFactorY, 732 * scalingFactorX, 120 * scalingFactorY],
				color: undefined,
				content: sessionFillPlayerName,
				contentSize: "92px",
			},
			mode: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 260 * scalingFactorY, 732 * scalingFactorX, 50 * scalingFactorY],
				color: "#edaa23",
				content: sessionFillMode,
				contentSize: "42px",
			},
			timespan: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 200 * scalingFactorY, 732 * scalingFactorX, 50 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillTimespan,
				contentSize: "42px",
			},
			wins: {
				title: "Team Wins",
				statsKey: "wins_team",
				box: [10 * scalingFactorX, 320 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#6af168",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			losses: {
				title: "Team Losses",
				statsKey: "losses_team",
				box: [258 * scalingFactorX, 320 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#ea5e5f",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			w_l_ratio: {
				title: "Team W/L",
				statsKey: undefined,
				box: [505 * scalingFactorX, 320 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#edaa23",
				content: sessionFillRatio,
				contentSize: "96px",
			},
			time_played: {
				title: "Team Playtime",
				statsKey: "time_played_team",
				box: [753 * scalingFactorX, 320 * scalingFactorY, 237 * scalingFactorX, 150 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillPlaytime,
				contentSize: "96px",
			},
			kills: {
				title: "Team Kills",
				statsKey: "kills_team",
				box: [10 * scalingFactorX, 480 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#6af168",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			deaths: {
				title: "Team Deaths",
				statsKey: "deaths_team",
				box: [258 * scalingFactorX, 480 * scalingFactorY, 237 * scalingFactorX, 150 * scalingFactorY],
				color: "#ea5e5f",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			k_d_ratio: {
				title: "Team K/D",
				statsKey: undefined,
				box: [505 * scalingFactorX, 480 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#edaa23",
				content: sessionFillRatio,
				contentSize: "96px",
			},
			heads: {
				title: "Heads (Overall)",
				statsKey: "heads",
				box: [753 * scalingFactorX, 480 * scalingFactorY, 237 * scalingFactorX, 150 * scalingFactorY],
				color: "#f542ec",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			skywars_experience: {
				title: "EXP Gained (Overall)",
				statsKey: "skywars_experience",
				box: [10 * scalingFactorX, 640 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#f542ec",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			progress: {
				title: "Progress",
				statsKey: undefined,
				box: [258 * scalingFactorX, 640 * scalingFactorY, 485 * scalingFactorX, 150 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillProgress,
				contentSize: "58px",
			},
			hourly_exp: {
				title: "EXP/Hour (Overall)",
				statsKey: undefined,
				box: [753 * scalingFactorX, 640 * scalingFactorY, 237 * scalingFactorX, 150 * scalingFactorY],
				color: "#f542ec",
				content: sessionFillHourlyEXP,
				contentSize: "96px",
			},
		},
		mini: {
			skin: {
				title: undefined,
				statsKey: undefined,
				box: [10 * scalingFactorX, 10 * scalingFactorY, 238 * scalingFactorX, 300 * scalingFactorY],
				color: undefined,
				content: sessionFillImage,
				contentSize: "60px",
			},
			header: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 10 * scalingFactorY, 732 * scalingFactorX, 50 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillHeader,
				contentSize: "42px",
			},
			player_name: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 70 * scalingFactorY, 732 * scalingFactorX, 120 * scalingFactorY],
				color: undefined,
				content: sessionFillPlayerName,
				contentSize: "92px",
			},
			mode: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 260 * scalingFactorY, 732 * scalingFactorX, 50 * scalingFactorY],
				color: "#edaa23",
				content: sessionFillMode,
				contentSize: "42px",
			},
			timespan: {
				title: undefined,
				statsKey: undefined,
				box: [258 * scalingFactorX, 200 * scalingFactorY, 732 * scalingFactorX, 50 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillTimespan,
				contentSize: "42px",
			},
			wins: {
				title: "Mini Wins",
				statsKey: "wins_mini",
				box: [10 * scalingFactorX, 320 * scalingFactorY, 357 * scalingFactorX, 240 * scalingFactorY],
				color: "#6af168",
				content: sessionFillDiff,
				contentSize: "128px",
			},
			explainer: {
				title: undefined,
				statsKey: undefined,
				box: [10 * scalingFactorX, 570 * scalingFactorY, 732 * scalingFactorX, 60 * scalingFactorY],
				color: "#ea5e5f",
				content: sessionFillMiniExplainer,
				contentSize: "42px",
			},
			time_played: {
				title: "Mini Playtime",
				statsKey: "time_played_mini",
				box: [753 * scalingFactorX, 320 * scalingFactorY, 237 * scalingFactorX, 150 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillPlaytime,
				contentSize: "96px",
			},
			kills: {
				title: "Mini Kills",
				statsKey: "kills_mini",
				box: [385 * scalingFactorX, 320 * scalingFactorY, 357 * scalingFactorX, 240 * scalingFactorY],
				color: "#6af168",
				content: sessionFillDiff,
				contentSize: "128px",
			},
			heads: {
				title: "Heads (Overall)",
				statsKey: "heads",
				box: [753 * scalingFactorX, 480 * scalingFactorY, 237 * scalingFactorX, 150 * scalingFactorY],
				color: "#f542ec",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			skywars_experience: {
				title: "EXP Gained (Overall)",
				statsKey: "skywars_experience",
				box: [10 * scalingFactorX, 640 * scalingFactorY, 238 * scalingFactorX, 150 * scalingFactorY],
				color: "#f542ec",
				content: sessionFillDiff,
				contentSize: "96px",
			},
			progress: {
				title: "Progress",
				statsKey: undefined,
				box: [258 * scalingFactorX, 640 * scalingFactorY, 485 * scalingFactorX, 150 * scalingFactorY],
				color: "#ffffff",
				content: sessionFillProgress,
				contentSize: "58px",
			},
			hourly_exp: {
				title: "EXP/Hour (Overall)",
				statsKey: undefined,
				box: [753 * scalingFactorX, 640 * scalingFactorY, 237 * scalingFactorX, 150 * scalingFactorY],
				color: "#f542ec",
				content: sessionFillHourlyEXP,
				contentSize: "96px",
			},
		},
	};

	const [hasDifferentStatsVersion, setHasDifferentStatsVersion] = React.useState(false);
	const [hasOldStatsVersion, setHasOldStatsVersion] = React.useState(false);

	React.useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		// Set canvas size
		canvas.width = 2000;
		canvas.height = 1285;

		const contextU = canvas.getContext("2d");
		if (!contextU) return;
		const context = contextU as CanvasRenderingContext2D;

		if (data) {
			// Check newest and oldest - create session out of those stats
			const filteredSnapshotsArray: Snapshot[] = Object.values(data);

			if (filteredSnapshotsArray.length > 2) {
				// addTextWarning("More than 2 keys provided, session will be from earliest to latest snapshot.", 1);
			}
			// Validate mode and set canvasBoxes

			if (Object.keys(canvasBoxesConfig).includes(mode || "") == false) {
				// addTextError("Invalid mode provided! Please provide a valid mode! (all, solo, team, mini)", 1);
				return;
			}

			const canvasBoxes = canvasBoxesConfig[mode as keyof typeof canvasBoxesConfig];

			let oldStats = filteredSnapshotsArray[0];
			let newStats = filteredSnapshotsArray[0];
			filteredSnapshotsArray.forEach((obj) => {
				if (obj.queried < oldStats.queried) {
					oldStats = obj;
				}
				if (obj.queried > newStats.queried) {
					newStats = obj;
				}
			});

			console.log(oldStats, newStats);

			setHasDifferentStatsVersion(newStats.statsVersion != oldStats.statsVersion);
			setHasOldStatsVersion(newStats.statsVersion < 4 || oldStats.statsVersion < 4);
			// console.log(hasDifferentStatsVersion, hasOldStatsVersion);

			context.fillStyle = "#00000099";
			Object.keys(canvasBoxes).forEach((stat) => {
				context.roundRect(...canvasBoxes[stat].box, 10);
			});
			context.fill();

			// Load and use custom font
			const myFont = new FontFace("MinecraftReg", "url(/fonts/MinecraftWOFF.woff)");
			myFont.load().then((font) => {
				document.fonts.add(font);
				context.font = `40px MinecraftReg`;

				// Set text alignment and baseline for centering
				context.textAlign = "center";
				context.textBaseline = "middle";

				// Set title where necessary
				Object.keys(canvasBoxes).forEach((stat) => {
					const entry = canvasBoxes[stat];
					if (entry.title) {
						context.fillStyle = entry.color || "#ffffff";
						const [x, y, width, height] = canvasBoxes[stat].box;
						const textX = x + width / 2;
						const textY = y + height / 6;
						context.fillText(entry.title, textX, textY);
					}
				});
				// Set content where necessary
				Object.keys(canvasBoxes).forEach((stat) => {
					const entry = canvasBoxes[stat];
					if (entry.content != undefined) {
						entry.content(context, entry, oldStats, newStats);
					}
				});
			});
		}
	}, [data]);

	function sessionFillImage(ctx: CanvasRenderingContext2D, entry: Entry, oldStats: Snapshot, newStats: Snapshot) {
		const img = new Image();
		img.src = `https://starlightskins.lunareclipse.studio/render/ultimate/${newStats.player}/bust`;
		img.crossOrigin = "anonymous";
		img.onload = function () {
			ctx.drawImage(img, entry.box[0] + 25, entry.box[1], entry.box[2] - 50, entry.box[3]);
		};
	}
	function sessionFillHeader(ctx: CanvasRenderingContext2D, entry: Entry) {
		ctx.font = `${entry.contentSize} MinecraftReg`;
		ctx.fillStyle = entry.color || "#ffffff";
		const [x, y, width, height] = entry.box;
		const textX = x + width / 2;
		const textY = y + height / 2;
		ctx.fillText("Generate your SkyWars Session statistics at skywarstools.com", textX, textY);
	}
	function sessionFillPlayerName(ctx: CanvasRenderingContext2D, entry: Entry, oldStats: Snapshot, newStats: Snapshot) {
		// TODO get scheme and stuff
		const minecraftTag = newStats.player;
		ctx.font = `${entry.contentSize} MinecraftReg`;

		fillMCColorText(ctx, minecraftTag, entry.box);
	}
	function fillMCColorText(ctx: CanvasRenderingContext2D, str: string, box: number[]) {
		ctx.textAlign = "left";
		let x = 0;
		const y = box[1] + box[3] / 2;
		const colorMap: Record<string, string> = {
			"0": "#000000",
			"1": "#0000AA",
			"2": "#00AA00",
			"3": "#00AAAA",
			"4": "#AA0000",
			"5": "#AA00AA",
			"6": "#FFAA00",
			"7": "#AAAAAA",
			"8": "#555555",
			"9": "#5555FF",
			a: "#55FF55",
			b: "#55FFFF",
			c: "#FF5555",
			d: "#FF55FF",
			e: "#FFFF55",
			f: "#FFFFFF",
			r: "#FFFFFF", // reset to white
		};
		let currentColor = "#AAAAAA";
		const segments = str.split(/(§[0-9a-fk-or])/g).filter(Boolean);
		let totalWidth = 0;
		segments.forEach((segment) => {
			if (segment.startsWith("§")) {
				currentColor = colorMap[segment[1]] || currentColor;
			} else {
				ctx.fillStyle = currentColor;
				const width = ctx.measureText(segment).width;
				totalWidth += width;
			}
		});

		x = box[0] + box[2] - totalWidth / 2 - box[2] / 2; // heck me
		segments.forEach((segment) => {
			if (segment.startsWith("§")) {
				currentColor = colorMap[segment[1]] || currentColor;
			} else {
				ctx.fillStyle = currentColor;
				ctx.fillText(segment, x, y);
				const width = ctx.measureText(segment).width;
				x += width;
				totalWidth += width;
			}
		});

		ctx.textAlign = "center";
	}
	function sessionFillMode(ctx: CanvasRenderingContext2D, entry: Entry) {
		let modeText = "";
		if (mode == "solo") {
			modeText = "Mode: SOLO";
		} else if (mode == "team") {
			modeText = "Mode: TEAM";
		} else if (mode == "mini") {
			modeText = "Mode: MINI";
		} else {
			modeText = "Mode: Overall";
		}
		ctx.font = `${entry.contentSize} MinecraftReg`;
		ctx.fillStyle = entry.color || "#ffffff";
		const [x, y, width, height] = entry.box;
		const textX = x + width / 2;
		const textY = y + height / 2;
		ctx.fillText(modeText, textX, textY);
	}
	function sessionFillTimespan(ctx: CanvasRenderingContext2D, entry: Entry, oldStats: Snapshot, newStats: Snapshot) {
		let text = `From ${formatTimestampShort(new Date(oldStats.queried))} to ${formatTimestampShort(new Date(newStats.queried))}`;
		text = text + `  (${timeDiff(newStats.queried, oldStats.queried)})`; // TODO add time diff
		ctx.font = `${entry.contentSize} MinecraftReg`;
		ctx.fillStyle = entry.color || "#ffffff";
		const [x, y, width, height] = entry.box;
		const textX = x + width / 2;
		const textY = y + height / 2;
		ctx.fillText(text, textX, textY);
	}
	function sessionFillDiff(ctx: CanvasRenderingContext2D, entry: Entry, oldStats: Snapshot, newStats: Snapshot) {
		ctx.font = `${entry.contentSize} MinecraftReg`;
		ctx.fillStyle = entry.color || "#ffffff";
		let text: number = 0;
		if (entry.statsKey !== undefined) {
			const newValue = parseInt(String((newStats.stats as Record<string, number>)[entry.statsKey] ?? "0"));
			const oldValue = parseInt(String((oldStats.stats as Record<string, number>)[entry.statsKey] ?? "0"));
			text = newValue - oldValue;
		}
		const textStr = text.toLocaleString();
		const [x, y, width, height] = entry.box;
		const textX = x + width / 2;
		const textY = y + (height / 5) * 3;
		ctx.fillText(textStr, textX, textY);
	}
	function sessionFillRatio(ctx: CanvasRenderingContext2D, entry: Entry, oldStats: Snapshot, newStats: Snapshot) {
		let text: string = "";
		let modePrefix = "";
		switch (mode) {
			case "solo":
				modePrefix = "_solo";
				break;
			case "team":
				modePrefix = "_team";
				break;
			case "mini":
				modePrefix = "_mini";
				break;
		}

		const WLorKD = entry.title?.includes("W/L") ? "W/L" : "K/D";
		switch (WLorKD) {
			case "K/D":
				const deltaKills =
					parseInt(String(newStats.stats["kills" + modePrefix] ?? "0")) -
					parseInt(String(oldStats.stats["kills" + modePrefix] ?? "0"));
				const deltaDeaths =
					parseInt(String(newStats.stats["deaths" + modePrefix] ?? "0")) -
					parseInt(String(oldStats.stats["deaths" + modePrefix] ?? "0"));
				// console.log(deltaKills, deltaDeaths);
				if (deltaDeaths == 0) {
					text = "Infinity";
				} else {
					text = (Math.round((deltaKills / deltaDeaths + Number.EPSILON) * 1000) / 1000).toString();
				}
				break;
			case "W/L":
				const deltaWins =
					parseInt(String(newStats.stats["wins" + modePrefix] ?? "0")) -
					parseInt(String(oldStats.stats["wins" + modePrefix] ?? "0"));
				const deltaLosses =
					parseInt(String(newStats.stats["losses" + modePrefix] ?? "0")) -
					parseInt(String(oldStats.stats["losses" + modePrefix] ?? "0"));
				// console.log(deltaWins, deltaLosses);
				if (deltaLosses == 0) {
					text = "Infinity";
				} else {
					text = (Math.round((deltaWins / deltaLosses + Number.EPSILON) * 1000) / 1000).toString();
				}
				break;
		}
		// console.log(text);

		ctx.font = `${entry.contentSize} MinecraftReg`;
		ctx.fillStyle = entry.color || "#ffffff";
		const [x, y, width, height] = entry.box;
		const textX = x + width / 2;
		const textY = y + (height / 5) * 3;
		ctx.fillText(text, textX, textY);
	}
	function sessionFillPlaytime(ctx: CanvasRenderingContext2D, entry: Entry, oldStats: Snapshot, newStats: Snapshot) {
		ctx.font = `${entry.contentSize} MinecraftReg`;
		ctx.fillStyle = entry.color || "#ffffff";
		const [x, y, width, height] = entry.box;
		const textX = x + width / 2;
		const textY = y + (height / 5) * 3;
		let timeplayed = 0;
		if (entry.statsKey !== undefined) {
			timeplayed =
				(newStats.stats[entry.statsKey as keyof typeof newStats.stats] -
					oldStats.stats[entry.statsKey as keyof typeof oldStats.stats]) /
				60;
		}
		ctx.fillText(Math.round(timeplayed + Number.EPSILON) + "m", textX, textY);
	}
	function sessionFillProgress(ctx: CanvasRenderingContext2D, entry: Entry, oldStats: Snapshot, newStats: Snapshot) {
		const newExp = newStats.stats["skywars_experience"];
		const oldExp = oldStats.stats["skywars_experience"];

		const currentLevelUnrounded = calcLevel(newExp);
		const currentLevel = Math.floor(currentLevelUnrounded);
		const nextLevel = currentLevel + 1;
		const nextLevelEXP = calcEXPFromLevel(nextLevel);
		const currentLevelEXP = calcEXPFromLevel(currentLevel);
		const currentLevelProgress = newExp - currentLevelEXP;

		const levelFormatted = calcPrestigeTag(currentLevel);
		const nextLevelFormatted = calcPrestigeTag(nextLevel);

		const progressPercentage = (currentLevelUnrounded - currentLevel) * 100;

		const blockAmount = Math.floor(progressPercentage / 6.25); // Each block represents 6.25% (100% / 16 blocks)
		const progressExp = newExp - oldExp;
		let progressBlocks = Math.floor((progressExp / (nextLevelEXP - currentLevelEXP)) * 16);
		if (blockAmount - progressBlocks < 0) {
			// new level flipover
			progressBlocks = blockAmount;
		}
		const coloredBlocks = "§6◼".repeat(blockAmount - progressBlocks) + "§b◼".repeat(progressBlocks) + "§7◼".repeat(16 - blockAmount);
		const finalString = `§8[${coloredBlocks}§8]`;

		const totalEXPNeeded = nextLevelEXP - currentLevelEXP;
		const formattedExp = `${(currentLevelProgress / 1000).toFixed(1)}k/${(totalEXPNeeded / 1000).toFixed(1)}k`;
		// console.log(formattedExp);

		ctx.font = `${entry.contentSize} MinecraftReg`;
		fillMCColorText(ctx, finalString, entry.box);

		ctx.font = `50px MinecraftReg`;

		const levelsString = `${levelFormatted}§8 - §f${formattedExp}§8 - ${nextLevelFormatted}`;
		fillMCColorText(ctx, levelsString, [entry.box[0], entry.box[1] + 65, entry.box[2], entry.box[3]]);
	}
	function sessionFillHourlyEXP(ctx: CanvasRenderingContext2D, entry: Entry, oldStats: Snapshot, newStats: Snapshot) {
		const newExp = newStats.stats["skywars_experience"];
		const oldExp = oldStats.stats["skywars_experience"];

		const hoursPlayed = (newStats.stats["time_played"] - oldStats.stats["time_played"]) / 60 / 60;

		let expPerHour = (newExp - oldExp) / hoursPlayed;
		expPerHour = Math.round(expPerHour);

		ctx.font = `${entry.contentSize} MinecraftReg`;
		ctx.fillStyle = entry.color || "#ffffff";
		const [x, y, width, height] = entry.box;
		const textX = x + width / 2;
		const textY = y + (height / 5) * 3;
		ctx.fillText(expPerHour.toString(), textX, textY);
	}
	function sessionFillMiniExplainer(ctx: CanvasRenderingContext2D, entry: Entry) {
		ctx.font = `${entry.contentSize} MinecraftReg`;
		ctx.fillStyle = entry.color || "#ffffff";
		const [x, y, width, height] = entry.box;
		const textX = x + width / 2;
		const textY = y + height / 2;
		ctx.fillText("Mini does not track deaths and losses", textX, textY);
	}

	return (
		<div className="bg-layer w-full h-auto rounded-b-xl flex flex-col" style={{ position: "relative" }}>
			<canvas
				ref={canvasRef}
				{...canvasProps}
				style={{
					width: "100%",
					aspectRatio: "2000 / 1285",
					display: "block",
					borderRadius: "0 0 15px 15px",
					backgroundImage: 'url("/maps/Aegis.png")',
					backgroundSize: "cover",
					...canvasProps.style,
				}}
			/>
			<button
				className="p-2 m-auto my-4 w-50 bg-button font-semibold text-xl rounded transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 animate-press "
				onClick={() => {
					const canvas = canvasRef.current;
					if (!canvas) return;
					canvas.toBlob((blob) => {
						if (!blob) return;
						navigator.clipboard.write([new window.ClipboardItem({ "image/png": blob })]);
					});
				}}
				type="button"
			>
				Copy Image
			</button>
			<div className="m-5">
				{hasDifferentStatsVersion && (
					<div className="bg-yellow-500 text-black font-bold p-3 rounded-xl flex flex-col">
						<span className="w-fit">Warning: Snapshots have different stats versions!</span>
						<span className="text-[12px] text-yellow-900">This means some snapshots might not have all datapoints.</span>
					</div>
				)}
				{hasOldStatsVersion && (
					<div className="bg-yellow-500 text-black font-bold p-3 rounded-xl flex flex-col">
						<span>Warning: Some snapshots have an older version.</span>
						<span className="text-[12px] text-yellow-900">This means some snapshots might not have all datapoints.</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default SessionCanvas;

function formatTimestampShort(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	return `${year}-${month}-${day} ${hours}:${minutes}`;
}
