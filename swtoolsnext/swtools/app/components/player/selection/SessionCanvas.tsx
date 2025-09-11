import React, { useRef } from "react";

const SessionCanvas: React.FC<React.CanvasHTMLAttributes<HTMLCanvasElement>> = (props) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	React.useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const context = canvas.getContext("2d");
		if (!context) return;

		context.fillStyle = "#000000";
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	}, []);

	return (
		<div className="bg-layer w-full h-150 rounded-b-xl" style={{ position: "relative" }}>
			<canvas
				ref={canvasRef}
				{...props}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					display: "block",
					...props.style,
				}}
			/>
		</div>
	);
};

export default SessionCanvas;
