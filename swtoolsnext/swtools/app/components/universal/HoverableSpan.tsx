"use client";
import { Tooltip } from "@mui/material";
import React from "react";

interface HoverableSpanProps {
	hoverText: string;
	children: React.ReactNode;
	className?: string;
}
const HoverableSpan: React.FC<HoverableSpanProps> = ({ children, hoverText }) => {
	return (
		<Tooltip title={hoverText}>
			<span className={"underline decoration-dotted cursor-help decoration-white/50"}>{children}</span>
		</Tooltip>
	);
};

export default HoverableSpan;
