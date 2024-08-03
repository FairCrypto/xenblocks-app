export interface LeaderboardEntry {
  rank: number;
  account: string;
  hashRate: number;
  blocks: number;
  superBlocks: number;
}

export interface Leaderboard {
  totalAttemptsPerSecond: number;
  totalHashRate: number;
  totalMiners: number;
  totalBlocks: number;
  difficulty: number;
  miners: LeaderboardEntry[];
}

export async function getLeaderboard(): Promise<Leaderboard> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + "/leaderboard",
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error("Error fetching leaderboard data");
  }

  return res.json();
}
