import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL("https://www.mc-heads.net/avatar/**")],
	},
	allowedDevOrigins: ["localhost:3000", "http://localhost:3000, http://192.168.178.51:3000, 192.168.178.51:3000"],
};

export default nextConfig;
