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
        <div className='w-[100vw] lg:w-[1000px] h-[80vh] bg-[var(--background-layer)] m-auto p-4'> 
            <h1>Stats for {resolvedParams.playername}</h1>
            {/* Render player stats here */}
            <Logo></Logo>
        </div>
    );
};

export default PlayerStatsPage;