import Logo from '@/app/components/Logo';
import React from 'react';

interface PlayerStatsPageProps {
    params: { playername: string };
}

const PlayerStatsPage = async ({ params }: PlayerStatsPageProps) => {
    // If params is a promise, await it
    const resolvedParams = await params;

    return (
        // Width is 1000px, rest of styles are just placeholders to make it look somewhat decent
        <div className='w-[1000px] h-full bg-[var(--background-layer)] m-auto mt-2 mb-2 p-4 rounded-lg'> 
            <h1>Stats for {resolvedParams.playername}</h1>
            {/* Render player stats here */}
            <Logo></Logo>
        </div>
    );
};

export default PlayerStatsPage;