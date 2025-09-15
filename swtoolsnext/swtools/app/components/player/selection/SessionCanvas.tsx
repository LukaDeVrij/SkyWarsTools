import React, { useRef } from "react";

const scalingFactor = 0.8;

interface SessionCanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
	data?: any;
	mode?: "overall" | "solo" | "team" | "mini";
}
const SessionCanvas: React.FC<SessionCanvasProps> = (props) => {
	const { data, mode, ...canvasProps } = props;
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	React.useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const contextU = canvas.getContext("2d");
		if (!contextU) return;
		const context = contextU as CanvasRenderingContext2D;

		context.fillStyle = "#990000";
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);

		// You can use `data` here for custom drawing logic
	}, [data]);

	return (
		<div className="bg-layer w-full h-150 rounded-b-xl" style={{ position: "relative" }}>
			<canvas
				ref={canvasRef}
				{...canvasProps}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					display: "block",
					...canvasProps.style,
				}}
			/>
		</div>
	);
};

type Entry = {
	title?: string;
	statsKey?: string;
	box: number[];
	color?: string;
	content?: Function;
	contentSize: string;
};
const canvasBoxesConfig = {
	all: {
		skin: {
			title: undefined,
			statsKey: undefined,
			box: [10, 10 * scalingFactor, 238, 300 * scalingFactor],
			color: undefined,
			content: sessionFillImage,
			contentSize: "32px",
		},
		header: {
			title: undefined,
			statsKey: undefined,
			box: [258, 10 * scalingFactor, 732, 50 * scalingFactor],
			color: "#ffffff",
			content: sessionFillHeader,
			contentSize: "20px",
		},
		player_name: {
			title: undefined,
			statsKey: undefined,
			box: [258, 70 * scalingFactor, 732, 120 * scalingFactor],
			color: undefined,
			content: sessionFillPlayerName,
			contentSize: "44px",
		},
		mode: {
			title: undefined,
			statsKey: undefined,
			box: [258, 260 * scalingFactor, 732, 50 * scalingFactor],
			color: "#edaa23",
			content: sessionFillMode,
			contentSize: "20px",
		},
		timespan: {
			title: undefined,
			statsKey: undefined,
			box: [258, 200 * scalingFactor, 732, 50 * scalingFactor],
			color: "#ffffff",
			content: sessionFillTimespan,
			contentSize: "20px",
		},
		wins: {
			title: "Wins",
			statsKey: "wins",
			box: [10, 320 * scalingFactor, 238, 150 * scalingFactor],
			color: "#6af168",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		losses: {
			title: "Losses",
			statsKey: "losses",
			box: [258, 320 * scalingFactor, 238, 150 * scalingFactor],
			color: "#ea5e5f",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		w_l_ratio: {
			title: "W/L",
			statsKey: undefined,
			box: [505, 320 * scalingFactor, 238, 150 * scalingFactor],
			color: "#edaa23",
			content: sessionFillRatio,
			contentSize: "48px",
		},
		time_played: {
			title: "Playtime",
			statsKey: "time_played",
			box: [753, 320 * scalingFactor, 237, 150 * scalingFactor],
			color: "#ffffff",
			content: sessionFillPlaytime,
			contentSize: "48px",
		},
		kills: {
			title: "Kills",
			statsKey: "kills",
			box: [10, 480 * scalingFactor, 238, 150 * scalingFactor],
			color: "#6af168",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		deaths: {
			title: "Deaths",
			statsKey: "deaths",
			box: [258, 480 * scalingFactor, 237, 150 * scalingFactor],
			color: "#ea5e5f",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		k_d_ratio: {
			title: "K/D",
			statsKey: undefined,
			box: [505, 480 * scalingFactor, 238, 150 * scalingFactor],
			color: "#edaa23",
			content: sessionFillRatio,
			contentSize: "48px",
		},
		heads: {
			title: "Heads",
			statsKey: "heads",
			box: [753, 480 * scalingFactor, 237, 150 * scalingFactor],
			color: "#f542ec",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		skywars_experience: {
			title: "EXP Gained",
			statsKey: "skywars_experience",
			box: [10, 640 * scalingFactor, 238, 150 * scalingFactor],
			color: "#f542ec",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		progress: {
			title: "Progress",
			statsKey: undefined,
			box: [258, 640 * scalingFactor, 485, 150 * scalingFactor],
			color: "#ffffff",
			content: sessionFillProgress,
			contentSize: "30px",
		},
		hourly_exp: {
			title: "EXP Per Hour",
			statsKey: undefined,
			box: [753, 640 * scalingFactor, 237, 150 * scalingFactor],
			color: "#f542ec",
			content: sessionFillHourlyEXP,
			contentSize: "48px",
		},
	},
	solo: {
		skin: {
			title: undefined,
			statsKey: undefined,
			box: [10, 10 * scalingFactor, 238, 300 * scalingFactor],
			color: undefined,
			content: sessionFillImage,
			contentSize: "32px",
		},
		header: {
			title: undefined,
			statsKey: undefined,
			box: [258, 10 * scalingFactor, 732, 50 * scalingFactor],
			color: "#ffffff",
			content: sessionFillHeader,
			contentSize: "20px",
		},
		player_name: {
			title: undefined,
			statsKey: undefined,
			box: [258, 70 * scalingFactor, 732, 120 * scalingFactor],
			color: undefined,
			content: sessionFillPlayerName,
			contentSize: "44px",
		},
		mode: {
			title: undefined,
			statsKey: undefined,
			box: [258, 260 * scalingFactor, 732, 50 * scalingFactor],
			color: "#edaa23",
			content: sessionFillMode,
			contentSize: "20px",
		},
		timespan: {
			title: undefined,
			statsKey: undefined,
			box: [258, 200 * scalingFactor, 732, 50 * scalingFactor],
			color: "#ffffff",
			content: sessionFillTimespan,
			contentSize: "20px",
		},
		wins: {
			title: "Solo Wins",
			statsKey: "wins_solo",
			box: [10, 320 * scalingFactor, 238, 150 * scalingFactor],
			color: "#6af168",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		losses: {
			title: "Solo Losses",
			statsKey: "losses_solo",
			box: [258, 320 * scalingFactor, 238, 150 * scalingFactor],
			color: "#ea5e5f",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		w_l_ratio: {
			title: "Solo W/L",
			statsKey: undefined,
			box: [505, 320 * scalingFactor, 238, 150 * scalingFactor],
			color: "#edaa23",
			content: sessionFillRatio,
			contentSize: "48px",
		},
		time_played: {
			title: "Solo Playtime",
			statsKey: "time_played_solo",
			box: [753, 320 * scalingFactor, 237, 150 * scalingFactor],
			color: "#ffffff",
			content: sessionFillPlaytime,
			contentSize: "48px",
		},
		kills: {
			title: "Solo Kills",
			statsKey: "kills_solo",
			box: [10, 480 * scalingFactor, 238, 150 * scalingFactor],
			color: "#6af168",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		deaths: {
			title: "Solo Deaths",
			statsKey: "deaths_solo",
			box: [258, 480 * scalingFactor, 237, 150 * scalingFactor],
			color: "#ea5e5f",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		k_d_ratio: {
			title: "Solo K/D",
			statsKey: undefined,
			box: [505, 480 * scalingFactor, 238, 150 * scalingFactor],
			color: "#edaa23",
			content: sessionFillRatio,
			contentSize: "48px",
		},
		heads: {
			title: "Heads (Overall)",
			statsKey: "heads",
			box: [753, 480 * scalingFactor, 237, 150 * scalingFactor],
			color: "#f542ec",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		skywars_experience: {
			title: "EXP Gained (Overall)",
			statsKey: "skywars_experience",
			box: [10, 640 * scalingFactor, 238, 150 * scalingFactor],
			color: "#f542ec",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		progress: {
			title: "Progress",
			statsKey: undefined,
			box: [258, 640 * scalingFactor, 485, 150 * scalingFactor],
			color: "#ffffff",
			content: sessionFillProgress,
			contentSize: "30px",
		},
		hourly_exp: {
			title: "EXP/Hour (Overall)",
			statsKey: undefined,
			box: [753, 640 * scalingFactor, 237, 150 * scalingFactor],
			color: "#f542ec",
			content: sessionFillHourlyEXP,
			contentSize: "48px",
		},
	},
	team: {
		skin: {
			title: undefined,
			statsKey: undefined,
			box: [10, 10 * scalingFactor, 238, 300 * scalingFactor],
			color: undefined,
			content: sessionFillImage,
			contentSize: "32px",
		},
		header: {
			title: undefined,
			statsKey: undefined,
			box: [258, 10 * scalingFactor, 732, 50 * scalingFactor],
			color: "#ffffff",
			content: sessionFillHeader,
			contentSize: "20px",
		},
		player_name: {
			title: undefined,
			statsKey: undefined,
			box: [258, 70 * scalingFactor, 732, 120 * scalingFactor],
			color: undefined,
			content: sessionFillPlayerName,
			contentSize: "44px",
		},
		mode: {
			title: undefined,
			statsKey: undefined,
			box: [258, 260 * scalingFactor, 732, 50 * scalingFactor],
			color: "#edaa23",
			content: sessionFillMode,
			contentSize: "20px",
		},
		timespan: {
			title: undefined,
			statsKey: undefined,
			box: [258, 200 * scalingFactor, 732, 50 * scalingFactor],
			color: "#ffffff",
			content: sessionFillTimespan,
			contentSize: "20px",
		},
		wins: {
			title: "Team Wins",
			statsKey: "wins_team",
			box: [10, 320 * scalingFactor, 238, 150 * scalingFactor],
			color: "#6af168",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		losses: {
			title: "Team Losses",
			statsKey: "losses_team",
			box: [258, 320 * scalingFactor, 238, 150 * scalingFactor],
			color: "#ea5e5f",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		w_l_ratio: {
			title: "Team W/L",
			statsKey: undefined,
			box: [505, 320 * scalingFactor, 238, 150 * scalingFactor],
			color: "#edaa23",
			content: sessionFillRatio,
			contentSize: "48px",
		},
		time_played: {
			title: "Team Playtime",
			statsKey: "time_played_team",
			box: [753, 320 * scalingFactor, 237, 150 * scalingFactor],
			color: "#ffffff",
			content: sessionFillPlaytime,
			contentSize: "48px",
		},
		kills: {
			title: "Team Kills",
			statsKey: "kills_team",
			box: [10, 480 * scalingFactor, 238, 150 * scalingFactor],
			color: "#6af168",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		deaths: {
			title: "Team Deaths",
			statsKey: "deaths_team",
			box: [258, 480 * scalingFactor, 237, 150 * scalingFactor],
			color: "#ea5e5f",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		k_d_ratio: {
			title: "Team K/D",
			statsKey: undefined,
			box: [505, 480 * scalingFactor, 238, 150 * scalingFactor],
			color: "#edaa23",
			content: sessionFillRatio,
			contentSize: "48px",
		},
		heads: {
			title: "Heads (Overall)",
			statsKey: "heads",
			box: [753, 480 * scalingFactor, 237, 150 * scalingFactor],
			color: "#f542ec",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		skywars_experience: {
			title: "EXP Gained (Overall)",
			statsKey: "skywars_experience",
			box: [10, 640 * scalingFactor, 238, 150 * scalingFactor],
			color: "#f542ec",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		progress: {
			title: "Progress",
			statsKey: undefined,
			box: [258, 640 * scalingFactor, 485, 150 * scalingFactor],
			color: "#ffffff",
			content: sessionFillProgress,
			contentSize: "30px",
		},
		hourly_exp: {
			title: "EXP/Hour (Overall)",
			statsKey: undefined,
			box: [753, 640 * scalingFactor, 237, 150 * scalingFactor],
			color: "#f542ec",
			content: sessionFillHourlyEXP,
			contentSize: "48px",
		},
	},
	mini: {
		skin: {
			title: undefined,
			statsKey: undefined,
			box: [10, 10 * scalingFactor, 238, 300 * scalingFactor],
			color: undefined,
			content: sessionFillImage,
			contentSize: "32px",
		},
		header: {
			title: undefined,
			statsKey: undefined,
			box: [258, 10 * scalingFactor, 732, 50 * scalingFactor],
			color: "#ffffff",
			content: sessionFillHeader,
			contentSize: "20px",
		},
		player_name: {
			title: undefined,
			statsKey: undefined,
			box: [258, 70 * scalingFactor, 732, 120 * scalingFactor],
			color: undefined,
			content: sessionFillPlayerName,
			contentSize: "44px",
		},
		mode: {
			title: undefined,
			statsKey: undefined,
			box: [258, 260 * scalingFactor, 732, 50 * scalingFactor],
			color: "#edaa23",
			content: sessionFillMode,
			contentSize: "20px",
		},
		timespan: {
			title: undefined,
			statsKey: undefined,
			box: [258, 200 * scalingFactor, 732, 50 * scalingFactor],
			color: "#ffffff",
			content: sessionFillTimespan,
			contentSize: "20px",
		},
		wins: {
			title: "Mini Wins",
			statsKey: "wins_mini",
			box: [10, 320 * scalingFactor, 357, 240 * scalingFactor],
			color: "#6af168",
			content: sessionFillDiff,
			contentSize: "68px",
		},
		explainer: {
			title: undefined,
			statsKey: undefined,
			box: [10, 570 * scalingFactor, 732, 60 * scalingFactor],
			color: "#ea5e5f",
			content: sessionFillMiniExplainer,
			contentSize: "20px",
		},
		time_played: {
			title: "Mini Playtime",
			statsKey: "time_played_mini",
			box: [753, 320 * scalingFactor, 237, 150 * scalingFactor],
			color: "#ffffff",
			content: sessionFillPlaytime,
			contentSize: "48px",
		},
		kills: {
			title: "Mini Kills",
			statsKey: "kills_mini",
			box: [385, 320 * scalingFactor, 357, 240 * scalingFactor],
			color: "#6af168",
			content: sessionFillDiff,
			contentSize: "68px",
		},
		heads: {
			title: "Heads (Overall)",
			statsKey: "heads",
			box: [753, 480 * scalingFactor, 237, 150 * scalingFactor],
			color: "#f542ec",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		skywars_experience: {
			title: "EXP Gained (Overall)",
			statsKey: "skywars_experience",
			box: [10, 640 * scalingFactor, 238, 150 * scalingFactor],
			color: "#f542ec",
			content: sessionFillDiff,
			contentSize: "48px",
		},
		progress: {
			title: "Progress",
			statsKey: undefined,
			box: [258, 640 * scalingFactor, 485, 150 * scalingFactor],
			color: "#ffffff",
			content: sessionFillProgress,
			contentSize: "30px",
		},
		hourly_exp: {
			title: "EXP/Hour (Overall)",
			statsKey: undefined,
			box: [753, 640 * scalingFactor, 237, 150 * scalingFactor],
			color: "#f542ec",
			content: sessionFillHourlyEXP,
			contentSize: "48px",
		},
	},
};

function sessionFillImage(ctx: CanvasRenderingContext2D, entry: Entry, oldStats: Snapshot, newStats: Snapshot) {
	const img = new Image();
	img.src = `https://starlightskins.lunareclipse.studio/render/ultimate/${newStats.player}/bust`;
	img.crossOrigin = "anonymous";
	img.onload = function () {
		ctx.drawImage(img, entry.box[0] + 25, entry.box[1], entry.box[2] - 50, entry.box[3]);
	};
}
function sessionFillHeader(ctx: CanvasRenderingContext2D, entry: Entry, oldStats: Snapshot, newStats: Snapshot) {
	ctx.font = `${entry.contentSize} MinecraftReg`;
	ctx.fillStyle = entry.color || "#ffffff";
	let [x, y, width, height] = entry.box;
	let textX = x + width / 2;
	let textY = y + height / 2;
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
	let y = box[1] + box[3] / 2;
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
	let segments = str.split(/(§[0-9a-fk-or])/g).filter(Boolean);
	let totalWidth = 0;
	segments.forEach((segment) => {
		if (segment.startsWith("§")) {
			currentColor = colorMap[segment[1]] || currentColor;
		} else {
			ctx.fillStyle = currentColor;
			let width = ctx.measureText(segment).width;
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
			let width = ctx.measureText(segment).width;
			x += width;
			totalWidth += width;
		}
	});

	ctx.textAlign = "center";
}

function sessionFillMode(ctx: CanvasRenderingContext2D, entry: Entry, oldStats: Snapshot, newStats: Snapshot) {
	let modeText = "";
	// TODO fix : mode is not globally defined
	// if (mode == "solo") {
	// 	modeText = "Mode: SOLO";
	// } else if (mode == "team") {
	// 	modeText = "Mode: TEAM";
	// } else if (mode == "mini") {
	// 	modeText = "Mode: MINI";
	// } else {
	// 	modeText = "Mode: Overall";
	// }
	ctx.font = `${entry.contentSize} MinecraftReg`;
	ctx.fillStyle = entry.color || "#ffffff";
	let [x, y, width, height] = entry.box;
	let textX = x + width / 2;
	let textY = y + height / 2;
	ctx.fillText(modeText, textX, textY);
}

function sessionFillTimespan(ctx: CanvasRenderingContext2D, entry: Entry, oldStats: Snapshot, newStats: Snapshot) {
	let text = `From ${formatTimestampShort(new Date(oldStats.queried))} to ${formatTimestampShort(new Date(newStats.queried))}`;
	// text = text + `  (${timeDiff(newStats.queried, oldStats.queried)})`; // TODO add time diff
	ctx.font = `${entry.contentSize} MinecraftReg`;
	ctx.fillStyle = entry.color || "#ffffff";
	let [x, y, width, height] = entry.box;
	let textX = x + width / 2;
	let textY = y + height / 2;
	ctx.fillText(text, textX, textY);
}

function sessionFillDiff(ctx: CanvasRenderingContext2D, entry: Entry, oldStats: Snapshot, newStats: Snapshot) {
	ctx.font = `${entry.contentSize} MinecraftReg`;
	ctx.fillStyle = entry.color || "#ffffff";
	let text: number = 0;
	if (entry.statsKey !== undefined) {
		const newValue = parseInt(String((newStats.stats as Record<string, number>)[entry.statsKey] ?? "0"));
		const oldValue = parseInt(String((oldStats.stats as Record<string, number>)[entry.statsKey] ?? "0"));
		text = newValue - oldValue;c
	}
	const textStr = text.toLocaleString();
	let [x, y, width, height] = entry.box;
	let textX = x + width / 2;
	let textY = y + (height / 5) * 3;
	ctx.fillText(textStr, textX, textY);
}

// function sessionFillRatio(ctx: CanvasRenderingContext2D, entry: Entry, oldStats: Snapshot, newStats: Snapshot) {
//     let text;
//     let modePrefix = '';
//     let WLorKD = entry.title;
//     if (mode != 'all') {
//         modePrefix = '_' + mode;
//         WLorKD = entry.title.split(' ')[1];
//     }
//     switch (WLorKD) {
//         case "K/D":
//             let deltaKills = parseInt(newStats.stats['kills' + modePrefix]) - parseInt(oldStats.stats['kills' + modePrefix]);
//             let deltaDeaths = parseInt(newStats.stats['deaths' + modePrefix]) - parseInt(oldStats.stats['deaths' + modePrefix]);
//             console.log(deltaKills, deltaDeaths);
//             if (deltaDeaths == 0) {
//                 text = 'Infinity';
//             } else {
//                 text = Math.round(((deltaKills / deltaDeaths) + Number.EPSILON) * 1000) / 1000;
//             }
//             break;
//         case "W/L":
//             let deltaWins = parseInt(newStats.stats['wins' + modePrefix]) - parseInt(oldStats.stats['wins' + modePrefix]);
//             let deltaLosses = parseInt(newStats.stats['losses' + modePrefix]) - parseInt(oldStats.stats['losses' + modePrefix]);
//             console.log(deltaWins, deltaLosses);
//             if (deltaLosses == 0) {
//                 text = 'Infinity';
//             } else {
//                 text = Math.round(((deltaWins / deltaLosses) + Number.EPSILON) * 1000) / 1000;
//             }
//             break;
//     }
// }

export default SessionCanvas;

function formatTimestampShort(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	return `${year}-${month}-${day} ${hours}:${minutes}`;
}
