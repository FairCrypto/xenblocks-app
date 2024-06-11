"use client";

import { NavBar } from "@/app/components/NavBar";
import Link from "next/link";
import "react-medium-image-zoom/dist/styles.css";
import Footer from "@/app/components/Footer";
import { ReactNode } from "react";
import { SiGitbook } from "react-icons/si";

function Section({
  children,
  title,
  backgroundColor,
}: {
  children: ReactNode;
  title: string;
  backgroundColor: string;
}) {
  return (
    <div>
      <div
        className={`flex flex-content justify-center my-0 py-10 w-full mx-0 ${backgroundColor}`}
      >
        <div className="card mx-2 sm:mx-8 lg:mx-2 w-full max-w-screen-xl">
          <div className="card-body">
            <div className="card-title mb-6">
              <h2 className="text-2xl text-accent">{title}</h2>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col mx-0 min-h-screen">
      <NavBar/>

      <div className="hero h-[400px] lg:h-[400px] xl:h-[600px] bg-base-100">
        <div className="hero-content grid grid-cols-1 md:grid-cols-8">
          <div className="md:col-span-5">

            <div className="mx-2 sm:mx-8">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-mono text-accent mb-6">
                <div className="mb-3">PROOF-OF-WORK MINING</div> <div>ACCESSIBLE TO EVERYONE</div>
              </h1>
              <p className="mb-10 max-w-lg uppercase leading-loose text-justify sm:text-left">
                XenBLOCKs serve as the Proof-of-Work (PoW) component
                of the X1 blockchain
              </p>
              <Link href="./leaderboard">
                <button className="btn btn-primary font-thin text-lg">START MINING</button>
              </Link>
              <a href="https://info.xenpedia.com/xenblocks/RQEGw43Y8s86czyWkYpj">
                <button className="ml-2 btn btn-primary btn-outline font-thin text-lg">
                  GITBOOK
                  <SiGitbook/>
                </button>
              </a>
            </div>
          </div>
          <div className="absolute opacity-5 md:opacity-95 md:relative md:block md:col-span-3">
            <img className="px-8" src="./pickaxe.svg" alt="pickaxe image"></img>
          </div>
        </div>
      </div>

      <Section title="HOW IT WORKS" backgroundColor="bg-base-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-28 md:px-20">
          <div className="absolute md:relative opacity-10 md:opacity-100">
            <img className="" src="./howitworks.svg" alt="how it works"></img>
          </div>

          <div className="">
            <article className="">
              <h2 className="mb-6 lg:text-2xl text-accent">HASHING</h2>
              <p className="mb-6 text-sm sm:text-xs lg:text-base lg:leading-loose uppercase text-justify leading-loose">
                Miners solve a cryptographic puzzle by finding hashes that contain <code>XEN11.</code> Successful
                identification of
                such a hash rewards miners with XENIUM (XNM).
              </p>
              <p className="uppercase text-sm sm:text-xs lg:text-base lg:leading-loose lg:text-md text-justify leading-loose">
                Central to its design is the cryptographic hashing algorithm Argon2, known for being memory-hard and
                ensuring fair, asic-resistant mining.
              </p>
            </article>
          </div>

          <div>
            <article className="">
              <h2 className="mb-6 lg:text-2xl text-accent">FIXED GLOBAL HASHRATE</h2>
              <p className="mb-6 text-sm sm:text-xs lg:text-base lg:leading-loose uppercase text-justify leading-loose">
                As the network&apos;s overall hash power grows, the mechanism adjusts to reduce individual miners&apos; hash
                power,
                decoupling mining intensity from energy consumption by shifting the computational burden to memory.
              </p>
              <p className="text-sm sm:text-xs lg:text-base lg:leading-loose uppercase text-justify leading-loose">
                This not only deters ASIC mining but also renders XenBLOCKs mining more accessible, allowing for the use
                of commonplace GPUs.
              </p>
            </article>
          </div>

          <div>
            <img src="./hashratefixed.svg" alt="how it works"></img>
          </div>
        </div>
      </Section>

      <Section title="XENIUM (XNM)" backgroundColor="bg-base-100">
        <article>
          <p className="mb-3 text-sm lg:text-xl uppercase text-justify leading-loose">
            XNM is the reward token for mining xenblocks.
          </p>
          <p className="mb-6 text-sm lg:text-xl uppercase text-justify leading-loose">
            Miners receive XNM every time they find a xenblock.
          </p>
          <div className="p-5 md:p-20">
            <img src="./xeniumchart.svg"></img>
          </div>
        </article>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-28 md:px-20 mt-10">
          <article>
            <h3 className="mb-6 lg:text-2xl text-accent">UTILITY</h3>
            <p className="mb-6 uppercase text-justify leading-loose">
              By providing XNM rewards to miners for their computational efforts,
              the protocol ensures sustainability through staking incentives.
              XNM can be staked to earn XN Yield on the X1 blockchain, further reinforcing its utility.
              Beyond staking, XNM plays a crucial role in decentralized computing and has potential
              applications in various other domains, enhancing its overall value.
            </p>
          </article>
          <article>
            <h3 className="mb-6 lg:text-2xl text-accent">POW-POS</h3>
            <p className="mb-6 uppercase text-justify leading-loose">
              Consequently, Xenblocks functions as a hybrid system combining Proof of Stake (PoS) and Proof of Work
              (PoW).
              Its PoW component mirrors Bitcoin&apos;s mining process, involving the solving of cryptographic challenges
              and discovering specific hashes. The inclusion of staking mechanisms helps alleviate selling pressure from
              miners.
            </p>
          </article>
        </div>
      </Section>

      <div className={`my-0 w-full bg-base-200`}>
        <div className="max-w-screen-xl mx-auto">
        <div className="card lg:mx-2 w-full text-center">
          <div className="card-body py-10 my-6 mb-20">
            <h2 className="text-3xl text-center text-accent mb-6">
              <div className="mb-3">THE BEST TIME TO START</div>
              <div>MINING WAS YESTERDAY</div></h2>
            <Link href="https://github.com/jacklevin74/xenminer">
              <button className="btn btn-lg btn-primary">START MINING</button>
            </Link>
          </div>
          <img className="absolute -left-2 bottom-0 opacity-20 md:opacity-95" width={300} src="./blocks1.svg"></img>
        </div>
        </div>

      </div>

      <Footer/>
    </main>
  );
}
