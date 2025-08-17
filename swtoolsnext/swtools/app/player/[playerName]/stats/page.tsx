import PlayerNavBar from '@/app/components/player/PlayerNavBar';
import PlayerBanner from '@/app/components/player/PlayerBanner';
import React from 'react';
import PlayerTitle from '@/app/components/player/PlayerTitle';
import RankGraph from '@/app/components/player/RankGraph';
import VerticalSeparator from '@/app/components/VerticalSeparator';
import PlayerOverallStats from '@/app/components/player/PlayerOverallStats';
import PlayerExtraInfo from '@/app/components/player/PlayerExtraInfo';

interface PlayerStatsPageProps {
    params: { playerName: string };
}

const PlayerStatsPage = async ({ params }: PlayerStatsPageProps) => {
    const resolvedParams = await params;
    const playerName = resolvedParams.playerName;

    const res = await fetch(`https://skywarstools.com/api/overall?player=${encodeURIComponent(playerName)}`);
    if (!res.ok) {
        console.log(res.statusText);        
        throw new Error('Failed to fetch player data');
    }
    const overallData = await res.json();

    return (
        // Width is 1000px, rest of styles are just placeholders to make it look somewhat decent
        <div className='w-[100vw] lg:w-[1000px] bg-[var(--background-layer)] m-auto lg:mt-2 lg:rounded-xl'> 
            <PlayerNavBar playerName={playerName}></PlayerNavBar>
            <PlayerBanner playerName={playerName}></PlayerBanner>
            <PlayerTitle playerName={playerName} data={overallData}></PlayerTitle>
            <div className="h-fit w-full flex flex-col lg:flex-row">
                <RankGraph playerName={playerName} data={undefined}></RankGraph>
                {/* <VerticalSeparator /> */}
                
                <PlayerOverallStats stats={overallData.stats}></PlayerOverallStats>  {/* // These are the stats that are saved through time */}
            </div>
            <PlayerExtraInfo playerName={playerName} info={overallData.generic}></PlayerExtraInfo>
            
        </div>
    );
};

export default PlayerStatsPage;