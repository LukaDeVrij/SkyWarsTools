import type { Metadata } from "next";
// import { Montserrat } from "next/font/google";
import "./globals.css";
import TopNavBar from "./components/navbar/TopNavBar";

// const montserrat = Montserrat({
// 	variable: "--font-montserrat",
// 	subsets: ["latin"],
// });

export const metadata: Metadata = {
	title: "SkyWarsTools",
	description: "A set of tools for SkyWars",
	icons: {
		icon: "/logo_200.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<body className="antialiased">

				<TopNavBar />

				
				{children}
				
			</body>
		</html>
	);
}
