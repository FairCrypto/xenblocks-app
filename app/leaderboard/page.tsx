"use client";

import { NavBar } from "@/app/components/NavBar";
import "react-medium-image-zoom/dist/styles.css";
import Footer from "@/app/components/Footer";
import React from "react";
import { Section } from "@/app/components/Section";
import { CiSearch } from "react-icons/ci";
import { Metric } from "@/app/components/Metric";
import Link from "next/link";
import { FaSquare } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";
import { randomInt } from "node:crypto";

function row(
  rank: number,
  account: string,
  blocks: number,
  superBlocks: number,
  hashRate: number,
  xmn: number,
) {
  let status = hashRate > 0;
  let color = status ? "text-primary" : "text-error";
  return (
    <tr>
      {/*<th>*/}
      {/*  <FaSquare className={color} />*/}
      {/*</th>*/}
      <td>{rank.toLocaleString()}</td>
      <td className="truncate">{account}</td>
      <td align="right">{blocks.toLocaleString()}</td>
      <td align="right">{superBlocks.toLocaleString()}</td>
      {/*<td>{hashRate.toLocaleString()}</td>*/}
      {/*<td>{xmn.toLocaleString()}</td>*/}
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
      {/*<th>XMN</th>*/}
    </tr>
  );
}

function SearchBar() {
  const [searchInput, setSearchInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const changeSearchBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = (e: any) => {
    e.preventDefault();
    console.log("Search Clicked");
  };

  return (
    <form
      onSubmit={handleSearchClick}
      className={`flex justify-end mx-2 sm:mx-0 opacity-0 ${!isLoading ? "fade-in" : ""}`}
    >
      <label className="input input-bordered input-sm flex items-center gap-2 my-3 ">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={searchInput}
          onChange={changeSearchBox}
        />
        <button className="" onClick={handleSearchClick}>
          <CiSearch />
        </button>
      </label>
    </form>
  );
}

export default function Leaderboard() {
  const [limit, setLimit] = React.useState(100);

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
          <Metric
            title="Total Blocks"
            value={Number(26448439).toLocaleString()}
            desc="Blocks"
          />
          <Metric
            title="Mining Blockrate"
            value="49 B/M"
            desc="Blocks per minute"
          />
          <Metric
            title="Current Miners"
            value={Number(479).toLocaleString()}
            desc="Amount of Miners"
          />
          <Metric
            title="Current Difficulty"
            value={Number(72000).toLocaleString()}
            desc="Difficulty"
          />
        </div>
      </Section>

      <Section>
        <div className="card-title">
          <div className="mr-auto text-accent text-base">Miners</div>
          {/*{SearchBar()}*/}
        </div>

        <div className="overflow-x-auto overflow-y-hidden">
          <table className="table table-xs sm:table-md table-fixed md:table-auto w-full">
            <thead>{headerRow()}</thead>
            <tbody>
              {Array.from({ length: limit }, (_, i) =>
                row(
                  i + 1,
                  "0x0000000000000000000000000000000000000000",
                  (limit - i) * 100000 + i,
                  100,
                  10,
                  100,
                ),
              )}{" "}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between w-full mt-3">
          <div className="mr-auto">
            <div className="flex items-center">
              <span className="text-sm mr-1">ROWS PER PAGE</span>
              <details className="dropdown">
                <summary className="btn btn-xs rounded btn-ghost m-1 btn-outline btn-secondary text-accent">
                  <span className="text-base-content">{limit}</span>
                  <MdKeyboardArrowDown className="text-base-content" />
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2">
                  <li>
                    <a>100</a>
                  </li>
                  <li>
                    <a>500</a>
                  </li>
                  <li>
                    <a>1000</a>
                  </li>
                </ul>
              </details>
            </div>
          </div>
          <div className="join">
            <button className="join-item btn btn-ghost btn-xs">
              <RxDoubleArrowLeft />
            </button>
            <button className="join-item btn btn-ghost btn-xs">1</button>
            <button className="join-item btn btn-ghost btn-xs">2</button>
            <button className="join-item btn btn-disabled btn-xs">...</button>
            <button className="join-item btn btn-ghost btn-xs">99</button>
            <button className="join-item btn btn-ghost btn-xs">100</button>
            <button className="join-item btn btn-ghost btn-xs">
              <RxDoubleArrowRight />
            </button>
          </div>
        </div>
      </Section>

      <div className="flex justify-center items-center h-full bg-base-200 ">
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

      <Footer />
    </main>
  );
}
