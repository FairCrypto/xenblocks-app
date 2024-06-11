import Link from "next/link";
import { IoTrophy } from "react-icons/io5";
import { BsSendFill } from "react-icons/bs";

export const NavBar = () => {
  return (
    <div className="navbar p-0 bg-base-100 opacity-85 z-[20] max-w-screen-xl mx-auto px-4 sm:py-6 xl:pt-10">
      <a className="btn btn-link animate-none" href="/">
        <img className="w-[100px] sm:w-[140px] lg:[160px]" src="/xenblocks-logo.svg" alt="Xenblocks Logo"/>
      </a>

      <Link className="ml-auto" href="https://xenblocks.io/leaderboard">
        <button className="btn btn-ghost btn-neutral hover:bg-base-100 hover:text-accent btn-mono btn-xs sm:btn-lg">
          <IoTrophy></IoTrophy>
          LEADERBOARD
        </button>
      </Link>

      <Link className="" href="https://t.me/+yDcqqTGMNC4yNjdj">
        <button className="btn btn-ghost btn-neutral hover:bg-base-100 hover:text-accent btn-mono btn-xs btn-mono sm:btn-lg">
          <BsSendFill></BsSendFill>
          COMMUNITY
        </button>
      </Link>
    </div>
  );
};
