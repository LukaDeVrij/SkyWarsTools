import React from 'react';

interface PlayerStatsPageProps {
    params: { playername: string };
}

const PlayerStatsPage = async ({ params }: PlayerStatsPageProps) => {
    // If params is a promise, await it
    const resolvedParams = await params;

    return (
        <div>
            <h1>Stats for {resolvedParams.playername}</h1>
            {/* Render player stats here */}
        </div>
    );
};

export default PlayerStatsPage;