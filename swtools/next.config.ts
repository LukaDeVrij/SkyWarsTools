import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.mc-heads.net",
				pathname: "/avatar/**",
			},
			{
				protocol: "https",
				hostname: "starlightskins.lunareclipse.studio",
				pathname: "/render/ultimate/**",
			},
			{
				protocol: "https",
				hostname: "api.skywarstools.com",
				pathname: "/**",
			},
		],
	},
	allowedDevOrigins: ["localhost:3000", "http://localhost:3000, http://192.168.178.51:3000, 192.168.178.51:3000"],
};

export default nextConfig;
