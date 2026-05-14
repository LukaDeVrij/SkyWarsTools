import type { Metadata } from "next";


import "./globals.css"; 
import TopNavBar from "./components/navbar/TopNavBar";

export const metadata: Metadata = {
	description: "SkyWarsTools 2.0 - A SkyWars Stats website with leaderboards, tracking and more!",
	icons: {
		icon: "/logo.png",
	},
	title: "SkyWarsTools",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const themeInitScript = `
		(function () {
			try {
				var savedTheme = localStorage.getItem("theme");
				var theme = savedTheme === "light" ? "light" : "dark";
				document.documentElement.setAttribute("data-theme", theme);
			} catch (e) {
				document.documentElement.setAttribute("data-theme", "dark");
			}
		})();
	`;

		return (
			<html lang="en" data-theme="dark" suppressHydrationWarning>
			<head>
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"></link>
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />

			{/* TODO maybe get rid of scrollbar on overall body and put it on content instead */}
			<body className="antialiased">
				<TopNavBar />

				<div className="w-[100vw] lg:w-[1150px] bg-[var(--background-layer)] m-auto mb-2 lg:mt-2 lg:rounded-xl">{children}</div>

				{/* <Footer /> */}
			</body>
		</html>
	);
}
