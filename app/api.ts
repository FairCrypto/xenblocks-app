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

export async function getLeaderboard(page: number, limit: number): Promise<Leaderboard> {
  const prevPage = page - 1;
  if (prevPage < 0) {
    throw new Error("Invalid page number");
  }
  const offset = prevPage * limit;
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `/leaderboard?limit=${limit}&offset=${offset}`,
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
