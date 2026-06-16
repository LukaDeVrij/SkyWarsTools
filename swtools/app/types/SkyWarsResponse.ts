// This is an endpoint for quick, fast lookup of SW EXP and comes with formatting of the player aswell
// Technically speaking: this info is stored for the SW EXP leaderboard (so it is all in Redis cache)
// But we can use it for quick lookup aswell, for example in the chattrigger module I use this endpoint aswell

import { Display } from "./OverallResponse";

export interface SkyWarsResponse {
    took: number,
    player: string,
    display: Display,
    queried: number,
    exp: number,
}