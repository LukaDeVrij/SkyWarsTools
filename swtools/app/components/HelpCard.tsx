"use client";
import React, { useState } from "react";

interface HelpCardProps {
	title: string;
	children: React.ReactNode;
}

export default function HelpCard({ title, children }: HelpCardProps) {
	const [open, setOpen] = useState(false);

	return (
		<div
			className="bg-content rounded-xl shadow-md transition-all duration-300 w-88 my-1 p-4 cursor-pointer animate-press"
			tabIndex={0}
			role="button"
			onClick={() => setOpen((prev) => !prev)}
			aria-expanded={open}
		>
			<span className="text-xl font-semibold">{title}</span>

			<div
				className="overflow-hidden transition-[max-height,opacity] duration-300 text-base text-white"
				style={{
					maxHeight: open ? "400px" : "0px",
					opacity: open ? 1 : 0,
				}}
			>
				{children}
			</div>
		</div>
	);
}
