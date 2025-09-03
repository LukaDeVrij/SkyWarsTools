"use client";
import React from "react";

interface HoverableSpanProps {
	hoverText: string;
	children: React.ReactNode;
	className?: string;
}
const HoverableSpan: React.FC<HoverableSpanProps> = ({ children, hoverText, className }) => {
	const [isHovered, setIsHovered] = React.useState(false);

	return (
		<span
			style={{
				position: "relative",
				textDecoration: "underline dotted #ffffff55",
				textDecorationThickness: "3px",
				cursor: "help",
			}}
			className={className}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{children}
			{isHovered && (
				<span
					style={{
						position: "absolute",
						top: "100%",
						left: "50%",
						transform: "translateX(-50%)",
						background: "#333",
						color: "#fff",
						padding: "4px 8px",
						borderRadius: "4px",
						whiteSpace: "normal",
						zIndex: 100,
						marginTop: "4px",
						fontSize: "0.9em",
						width: "250px",
						textAlign: "center",
					}}
				>
					{hoverText}
				</span>
			)}
		</span>
	);
};

export default HoverableSpan;
