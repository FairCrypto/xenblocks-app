"use client";

import { NavBar } from "@/app/components/NavBar";
import "react-medium-image-zoom/dist/styles.css";
import Footer from "@/app/components/Footer";
import React, { useEffect } from "react";
import { Section } from "@/app/components/Section";
import { CiSearch } from "react-icons/ci";
import { Metric } from "@/app/components/Metric";
import Link from "next/link";
// import { FaSquare } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import {
  getLeaderboard,
  Leaderboard as LeaderboardType,
  LeaderboardEntry,
} from "@/app/api";
import { Loader } from "@/app/components/Loader";
import { useLeaderboardPage } from "@/app/hooks/LeaderBoardPageHook";
import { useLeaderboardLimit } from "@/app/hooks/LeaderBoardLimitHook";
import { SearchBar } from "@/app/components/Searchbar";
import { useRouter } from "next/navigation";

function row(
  rank: number,
  account: string,
  blocks: number,
  superBlocks: number,
  hashRate: number,
  handleClick: (account: string) => void,
) {
  let status = hashRate > 0;
  let color = status ? "text-primary" : "text-error";
  return (
    <tr
      onClick={() => {
        handleClick(account);
      }}
      className="cursor-pointer hover:bg-primary hover:text-primary-content"
      key={rank}
    >
      {/*<th>*/}
      {/*  <FaSquare className={color} />*/}
      {/*</th>*/}
      <td>{rank.toLocaleString()}</td>
      <td className="font-mono truncate">{account}</td>
      <td align="right">{blocks.toLocaleString()}</td>
      <td align="right">{superBlocks.toLocaleString()}</td>
      {/*<td>{hashRate.toLocaleString()}</td>*/}
    </tr>
  );
}

function headerRow() {
  return (
    <tr>
      {/*<th className="w-14 lg:table-cell">STATUS</th>*/}
      <th className="w-10 lg:table-cell">RANK</th>
      <th>ACCOUNT</th>
      <th align="right">BLOCKS</th>
      <th align="right">SUPER BLOCKS</th>
      {/*<th>HASH RATE</th>*/}
    </tr>
  );
}

export default function Leaderboard() {
  const { push } = useRouter();
  const [leaderboard, setLeaderboard]: [LeaderboardType, any] = React.useState(
    {} as LeaderboardType,
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = useLeaderboardPage();
  const [limit, setLimit] = useLeaderboardLimit();

  const highPage = () => {
    if (leaderboard.totalMiners === 0 || limit < 1) {
      return 1;
    }

    return Math.ceil(leaderboard.totalMiners / limit);
  };

  const paginationPages = () => {
    const highPageValue = highPage();
    const getPage = (page: number) =>
      page < 1 || page > highPageValue ? -1 : page;

    const pages = {
      prevPrev: getPage(page - 2),
      prev: getPage(page - 1),
      current: getPage(page),
      next: getPage(page + 1),
      nextNext: getPage(page + 2),
    };

    return pages;
  };

  const renderPageButton = (pageNumber: number) => {
    return pageNumber > -1 ? (
      <button
        onClick={() => {
          if (pageNumber > 0 && pageNumber <= highPage()) {
            setPage(pageNumber);
          }
        }}
        className="join-item btn btn-ghost btn-xs"
      >
        {pageNumber}
      </button>
    ) : null;
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchLeaderboard = () => {
      getLeaderboard(page, limit).then((data) => {
        setLeaderboard(data);
        setIsLoading(false);
      });
    };

    fetchLeaderboard();
    const intervalId = setInterval(fetchLeaderboard, 60000);
    return () => clearInterval(intervalId);
  }, [page, limit]);

  return (
    <main className="flex flex-col mx-0">
      <NavBar />

      <div className={`flex flex-content justify-center w-full`}>
        <div className="card mx-2 sm:mx-8 lg:mx-2 w-full max-w-screen-xl">
          <div className="card-body p-2 sm:p-6">
            <div className="card-title">
              <h1 className="text-2xl text-accent">Leaderboard</h1>
            </div>
            <article className="prose">
              XENBLOCKs is a Proof of Work element of{" "}
              <Link href="https://x1blockchain.net/"> X1 Blockchain™</Link>
            </article>
          </div>
        </div>
      </div>

      <Section>
        <Loader isLoading={isLoading} />
        <div
          className={`grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 opacity-0 ${!isLoading ? "fade-in" : ""}`}
        >
          <Metric
            title="Total Blocks"
            value={Number(leaderboard.totalBlocks).toLocaleString()}
            desc="Blocks"
          />
          <Metric
            title="Mining Blockrate"
            value={Number(leaderboard.totalHashRate).toLocaleString()}
            desc="Blocks per minute"
          />
          <Metric
            title="Current Miners"
            value={Number(leaderboard.totalMiners).toLocaleString()}
            desc="Amount of Miners"
          />
          <Metric
            title="Current Difficulty"
            value={Number(leaderboard.difficulty).toLocaleString()}
            desc="Difficulty"
          />
        </div>
      </Section>

      <Section>
        <div className="card-title">
          <div className="mr-auto text-accent text-base">Miners</div>
          <SearchBar isLoading={isLoading} />
        </div>

        <div className="overflow-x-auto overflow-y-hidden">
          <Loader isLoading={isLoading} />
          <table
            className={`table table-xs sm:table-md table-fixed md:table-auto w-full opacity-0 ${!isLoading ? "fade-in" : ""}`}
          >
            <thead>{headerRow()}</thead>
            <tbody>
              {leaderboard.miners?.map(
                (entry: LeaderboardEntry, index: number) =>
                  row(
                    entry.rank,
                    entry.account,
                    entry.blocks,
                    entry.superBlocks,
                    entry.hashRate,
                    (account: string) => {
                      push(`/leaderboard/${account}`);
                    },
                  ),
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between w-full mt-3">
          <div className="mr-auto">
            <div className="flex items-center">
              <span className="text-sm mr-1 hidden sm:inline-block">
                ROWS PER PAGE
              </span>
              <details className="dropdown">
                <summary className="btn btn-xs rounded btn-ghost m-1 btn-outline btn-secondary text-accent">
                  <span className="text-base-content">{limit}</span>
                  <MdKeyboardArrowDown className="text-base-content" />
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2">
                  <li>
                    <a
                      onClick={() => {
                        setLimit(25);
                      }}
                    >
                      25
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        setLimit(100);
                      }}
                    >
                      100
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        setLimit(500);
                      }}
                    >
                      500
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        setLimit(1000);
                      }}
                    >
                      1000
                    </a>
                  </li>
                </ul>
              </details>
            </div>
          </div>

          <div className="join">
            <button
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}
              className="join-item btn btn-ghost btn-xs"
            >
              <RxDoubleArrowLeft />
            </button>

            {renderPageButton(paginationPages().prevPrev)}
            {renderPageButton(paginationPages().prev)}
            <button className="join-item btn btn-disabled btn-xs">
              {paginationPages().current}
            </button>
            {renderPageButton(paginationPages().next)}
            {renderPageButton(paginationPages().nextNext)}

            <button
              onClick={() => {
                if (page < highPage()) {
                  setPage(page + 1);
                }
              }}
              className="join-item btn btn-ghost btn-xs"
            >
              <RxDoubleArrowRight />
            </button>
          </div>
        </div>
      </Section>

      <div
        className={`flex justify-center items-center h-full bg-base-200 opacity-0 ${!isLoading ? "fade-in" : ""}`}
      >
        <div className="max-w-screen-2xl w-full">
          <Section
            title=""
            backgroundColor="bg-base-200"
            padding={false}
            backgroundImage="./leadboard-bottom.svg"
          >
            <div className="flex flex-col items-center justify-center h-[360px] text-center font-mono text-2xl md:text-4xl text-accent">
              <div className="mb-8">JOIN THE HASH-HEAD REVOLUTION!</div>
              <div>
                <button className="btn btn-lg btn-primary">START MINING</button>
              </div>
            </div>
          </Section>
        </div>
      </div>

      <Footer isLoading={isLoading} />
    </main>
  );
}
