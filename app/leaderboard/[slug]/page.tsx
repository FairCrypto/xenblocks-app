"use client";

import { NavBar } from "@/app/components/NavBar";
import React, { useEffect } from "react";
import { SearchBar } from "@/app/components/Searchbar";
import {fetchLeaderboardEntry, fetchX1Address, LeaderboardEntry} from "@/app/api";
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
  const [x1Address, setX1Address] = React.useState("");

  useEffect(() => {
    fetchLeaderboardEntry(params.slug)
      .then((data) => {
        setIsLoading(false);
        setLeaderboardEntry(data);
      })
      .catch((err) => {
        setError(err.message);
      });

    fetchX1Address(params.slug).then((data) => {
      setX1Address(data.x1Address);
    });
  }, [params.slug]);

  const xnm = leaderboardEntry.xnm ? Math.round(leaderboardEntry.xnm * Math.pow(10, -18)).toLocaleString() : "0";
  const xblk = leaderboardEntry.xblk ? Math.round(leaderboardEntry.xblk * Math.pow(10, -18)).toLocaleString() : "0";
  const xuni = leaderboardEntry.xuni ? Math.round(leaderboardEntry.xuni * Math.pow(10, -18)).toLocaleString() : "0";

  return (
    <main className="min-h-screen flex flex-col justify-between mx-0">
      <NavBar />
      <div className={`flex flex-content justify-center w-full`}>
        <div className="card mx-2 sm:mx-8 lg:mx-2 w-full max-w-screen-xl">
          <div className="card-body p-4 sm:p-6">
            <div className="sm:hidden mb-3">
              <SearchBar isLoading={isLoading}/>
            </div>

            <div className="card-title">
              <h1 className="text-2xl mr-auto">Xenblocks Miner</h1>
              <div className="hidden sm:inline">
                <SearchBar isLoading={isLoading}/>
              </div>
            </div>

            {error && (
              <div role="alert" className="alert alert-warning rounded my-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-xs sm:text-base">{error}</span>
              </div>
            )}

            <div>
              <div
                className={`grid grid-cols-1 ${x1Address && "lg:grid-cols-2"} gap-2 sm:gap-4 opacity-0 mb-2 sm:mb-4 ${!isLoading ? "fade-in" : ""}`}
              >
                <div className={`outline outline-secondary col-span-1`}>
                  <div className="stat p-3">
                    <div className="stat-title text-accent text-xs md:text-sm mb-3">
                      Ethereum Address
                    </div>
                    <div className="stat-value text-accent text-sm md:text-lg font-mono truncate">
                      {leaderboardEntry.account}
                    </div>
                  </div>
                </div>

                { x1Address ? (
                <div className={`outline outline-secondary col-span-1`}>
                  <div className="stat p-3">
                    <div className="stat-title text-accent text-xs md:text-sm mb-3">
                      X1 Address
                    </div>
                    <div className="stat-value text-accent text-sm md:text-lg font-mono truncate">
                      {x1Address}
                    </div>
                  </div>
                </div>
                ) : null }
              </div>

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
                  title="XNM"
                  value={xnm.toLocaleString()}
                />
                <Metric
                  title="XBLK"
                  value={xblk.toLocaleString()}
                />
                {/*<Metric*/}
                {/*  title="XUNI"*/}
                {/*  value={xuni.toLocaleString()}*/}
                {/*/>*/}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="flex-grow"></section>

      <Footer isLoading={isLoading}/>
    </main>
  );
}
