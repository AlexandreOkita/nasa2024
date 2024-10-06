"use client";

import { useState, useEffect } from "react";
import { TextGenerateEffect } from "../../components/ui/text-generate-effect";
import StartChapter from "@/components/ui/startChapter";

function CrabChapter() {
  const words =
    "A very strange light was visible on the earthling sky. What was mistaken by a “guest star” it was indeed the supernova that originated this remarkable nebula";
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src="/crab/Full.jpg"
        alt="Fullscreen background image"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-end justify-center text-[#ECECEC]">
        <div className="w-full h-1/3 bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.5)] to-transparent flex items-end justify-center">
          <div className="text-center">
            <TextGenerateEffect
              words={words}
              className="text-4xl tracking-widest text-[#ECECEC] font-Alata"
            />
            ;
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      setClicked((prev) => !prev);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div onClick={() => setClicked(false)}>
      {clicked ? (
        <CrabChapter />
      ) : (
        <StartChapter chapterNumber="III" chapterTitle="CRAB NEBULA" />
      )}
    </div>
  );
}
