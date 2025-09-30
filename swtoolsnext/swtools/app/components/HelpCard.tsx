"use client";
import React, { useState, useRef } from "react";

interface HelpCardProps {
	title: string;
	children: React.ReactNode;
}

export default function HelpCard({ title, children }: HelpCardProps) {
	const [open, setOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	return (
		<div
			className={`bg-content rounded-xl shadow-md transition-all duration-300 w-75 my-1 p-4`}
			tabIndex={0}
			role="button"
			style={{ minWidth: "250px" }}
			onClick={() => setOpen((prev) => !prev)}
			aria-expanded={open}
		>
			<span className="text-xl font-semibold">{title}</span>
			<div
				ref={contentRef}
				className="overflow-hidden transition-[max-height] duration-300 text-base text-white"
				style={{
					maxHeight: open ? "400px" : "400px",
				}}
			>
				{children}
			</div>
		</div>
	);
}
