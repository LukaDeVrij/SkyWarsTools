"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeToggle = () => {
	const [theme, setTheme] = useState<Theme>("dark");

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		const initialTheme: Theme = savedTheme === "light" ? "light" : "dark";
		document.documentElement.setAttribute("data-theme", initialTheme);
		setTheme(initialTheme);
	}, []);

	const toggleTheme = () => {
		const nextTheme: Theme = theme === "dark" ? "light" : "dark";
		document.documentElement.setAttribute("data-theme", nextTheme);
		localStorage.setItem("theme", nextTheme);
		setTheme(nextTheme);
	};

	return (
		<button
			type="button"
			className="p-2 rounded-md text-[var(--foreground)] animate-press cursor-pointer"
			onClick={toggleTheme}
			aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
			title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
		>
			{theme === "dark" ? <Sun /> : <Moon />}
		</button>
	);
};

export default ThemeToggle;
