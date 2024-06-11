import Link from "next/link";
import { IoTrophy } from "react-icons/io5";
import { BsSendFill } from "react-icons/bs";
import { SiGitbook } from "react-icons/si";
import { SiGithub } from "react-icons/si";

export default function Footer({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <footer
      className={`footer footer-center z-[2] mt-auto p-5 bg-base-100 ${!isLoading && "fade-in"}`}
    >
      <nav>
        <div className="">
          <Link className="sm:mx-3" href="https://xenblocks.io/leaderboard">
            <button className="btn btn-ghost btn-accent btn-mono btm-nav-sm sm:btn-lg">
              <IoTrophy />
              LEADERBOARD
            </button>
          </Link>

          <Link className="sm:mx-3" href="https://xenblocks.io/leaderboard">
            <button className="btn btn-ghost btn-accent btn-mono btm-nav-sm sm:btn-lg">
              <SiGithub />
              GITHUB
            </button>
          </Link>

          <Link className="sm:mx-3" href="https://xenblocks.io/leaderboard">
            <button className="btn btn-ghost btn-accent btn-mono btm-nav-sm sm:btn-lg">
              <SiGitbook />
              GITBOOK
            </button>
          </Link>

          <Link className="sm:mx-3" href="https://t.me/+yDcqqTGMNC4yNjdj">
            <button className="btn btn-ghost btn-accent btn-mono btm-nav-sm btn-mono sm:btn-lg">
              <BsSendFill />
              COMMUNITY
            </button>
          </Link>
        </div>
      </nav>
    </footer>
  );
}
