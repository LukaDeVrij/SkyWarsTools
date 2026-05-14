export interface MetaInfoResponse {
  weekKey: string;
  player: MetaInfoPlayer;
  weeklyStats: MetaInfoWeeklyStats;
  totalStats: MetaInfoTotalStats;
}

export interface MetaInfoPlayer {
  uuid: string;
  name: string;
  at: number;
}

export interface MetaInfoWeeklyStats {
  hypixelRequests: number;
  statsRequests: number;
}

export interface MetaInfoTotalStats {
  snapshotAmount?: number;
}
