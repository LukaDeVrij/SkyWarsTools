import type { Metadata } from "next";

import "./globals.css";
import TopNavBar from "./components/navbar/TopNavBar";
// import Footer from "./components/Footer";

export const metadata: Metadata = {
	title: "SkyWarsTools",
	description: "A set of tools for SkyWars",
	icons: {
		icon: "/logo.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"></link>
			</head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />

			{/* TODO maybe get rid of scrollbar on overall body and put it on content instead */}
			<body className="antialiased">
				<TopNavBar />

				<div className="w-[100vw] lg:w-[1000px] bg-[var(--background-layer)] m-auto mb-2 lg:mt-2 lg:rounded-xl">{children}</div>

				{/* <Footer /> */}
			</body>
		</html>
	);
}
