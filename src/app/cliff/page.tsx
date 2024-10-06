"use client";

import { Compare } from "@/components/ui/compare";
import { useState } from "react";

function RenderCompare() {
  return (
    <div className="">
      <Compare
        firstImage="cliff/cliff-jw-site.webp"
        secondImage="cliff/cliff-hubble-site.webp"
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-left-top"
        className="h-screen w-screen"
        slideMode="hover"
      />
    </div>
  );
}

function RenderHumbleImage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src="/crab/Full.jpg"
        alt="Fullscreen background image"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* <div className="absolute inset-0 flex items-end justify-center text-[#ECECEC]">
        <div className="w-full h-1/3 bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.5)] to-transparent flex items-end justify-center">
          <div className="text-center">
            <TextGenerateEffect
              words={words}
              className="text-4xl tracking-widest text-[#ECECEC] font-Alata"
            />
            ;
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default function Page() {
  const [showCompare, setShowCompare] = useState(true);
  return <div>{showCompare ? <RenderCompare /> : <div>another</div>}</div>;
}
