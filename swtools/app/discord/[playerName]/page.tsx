"use client";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
	const params = useParams();
	const name = params.playerName;

	return (
        <div>
            <main className="p-4 flex flex-col items-center justify-center bg-[#36393f] rounded-xl">
                <div className="bg-[#2f3136] rounded-xl shadow-lg p-8 flex flex-col items-center w-80">
                    <div className="w-24 h-24 rounded-full bg-[#7289da] flex items-center justify-center text-white text-5xl font-bold mb-4">
                        {name?.[0]?.toUpperCase()}
                    </div>
                    <div className="text-white text-3xl font-semibold mb-2">{name}</div>
                    <div className="text-gray-400 text-lg">Discord Profile</div>
                    <div className="mt-4 text-yellow-400 text-sm text-center">
                        Warning: This profile is not guaranteed to be their actual Discord account, since players can freely set theirs without authentication.
                    </div>
                </div>
            </main>
            
        </div>
	);
};

export default Page;
