"use client";

import { NavBar } from "@/app/components/NavBar";
import React, { useEffect } from "react";
import { SearchBar } from "@/app/components/Searchbar";
import { fetchLeaderboardEntry, LeaderboardEntry } from "@/app/api";
import { Metric } from "@/app/components/Metric";
import Footer from "@/app/components/Footer";

export default function LeaderboardSlug({
  params,
}: {
  params: { slug: string };
}) {
  const [error, setError] = React.useState("");
  const [leaderboardEntry, setLeaderboardEntry] = React.useState({
    account: "",
    blocks: 0,
    superBlocks: 0,
    hashRate: 0,
  } as LeaderboardEntry);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    fetchLeaderboardEntry(params.slug)
      .then((data) => {
        setIsLoading(false);
        setLeaderboardEntry(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [params.slug]);

  return (
    <main className="min-h-screen flex flex-col justify-between mx-0">
      <NavBar />
      <div className={`flex flex-content justify-center w-full`}>
        <div className="card mx-2 sm:mx-8 lg:mx-2 w-full max-w-screen-xl">
          <div className="card-body p-4 sm:p-6">
            <div className="sm:hidden mb-3">
              <SearchBar isLoading={isLoading} />
            </div>

            <div className="card-title">
              <h1 className="text-2xl mr-auto">Xenblocks Miner</h1>
              <div className="hidden sm:inline">
                <SearchBar isLoading={isLoading} />
              </div>
            </div>

            {error && <div className="alert alert-warning">{error}</div>}

            <div>
              <p className="my-3 text-xs sm:text-base">
                {leaderboardEntry.account}
              </p>

              <div
                className={`grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 opacity-0 ${!isLoading ? "fade-in" : ""}`}
              >
                <Metric
                  title="Rank"
                  value={leaderboardEntry.rank?.toLocaleString()}
                />
                <Metric
                  title="Blocks"
                  value={leaderboardEntry.blocks.toLocaleString()}
                />
                <Metric
                  title="Super Blocks"
                  value={leaderboardEntry.superBlocks.toLocaleString()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="flex-grow"></section>

      <Footer isLoading={isLoading} />
    </main>
  );
}
