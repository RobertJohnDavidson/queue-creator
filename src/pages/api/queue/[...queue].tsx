import { type NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import dynamic from "next/dynamic";
import { ThreadEditData } from "discord.js";
import { PartialGuildMember } from "discord.js";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  const [tier, setTier] = React.useState<"1" | "2" | "3" | "all">("1");
  const links: Array<{
    url: string;
    isFinished: boolean;
    typeOf: "soundcloud" | "youtube";
    tier: "1" | "2" | "3";
  }> = [
    {
      typeOf: "soundcloud",
      url: "https://soundcloud.com/xalamusic/xala-x-tomkillsjerry-power",
      isFinished: false,
      tier: "1",
    },
    {
      url: "https://soundcloud.com/houseium/breakdown",
      isFinished: false,
      typeOf: "soundcloud",
      tier: "1",
    },
    {
      url: "https://soundcloud.com/krvnaus/krvn-witcha",
      isFinished: false,
      typeOf: "soundcloud",
      tier: "2",
    },
    {
      url: "https://soundcloud.com/neonsteve/sets/neon-steve-donkong-curse",
      isFinished: false,
      typeOf: "soundcloud",
      tier: "3",
    },
  ];

  return (
    <>
      <Head>
        <title>Queue Control</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#52489C] to-[#D4C1EC]">
        <div className="flex flex-col items-center justify-center"></div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Queue <span className="text-purple-50">Control</span>
          </h1>
          <div className="flex items-start justify-center gap-4">
            <button
              className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              onClick={() => setTier("all")}
            >
              All
            </button>
            <button
              className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              onClick={() => setTier("1")}
            >
              Tier 1
            </button>
            <button
              className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              onClick={() => setTier("2")}
            >
              Tier 2
            </button>
            <button
              className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              onClick={() => setTier("3")}
            >
              Tier 3
            </button>
          </div>
          <div className=".overflow-y-scroll flex  flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            <h3 className="text-2xl font-bold">
              {tier !== "all" ? `Tier ${tier}` : "All"}
            </h3>
            {links
              .filter(
                (link) =>
                  (!link.isFinished && link.tier === tier) || tier === "all"
              )
              .map((link, i) => (
                <ReactPlayer
                  key={i}
                  url={link.url}
                  playsinline={true}
                  height="8rem"
                  onEnded={() => {
                    link.isFinished = true;
                  }}
                />
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
