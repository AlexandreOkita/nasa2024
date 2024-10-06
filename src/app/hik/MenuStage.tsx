"use client";

import { useMemo, useState } from "react";
import StarField from "./StarField";
import { Interaction } from "./Interaction";
import { Stage } from "@pixi/react";
import { BlurFilter } from "pixi.js";
import LessonChapter from "@/components/ui/lessonChapter";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { text } from "stream/consumers";

const gridSetting = {
  rows: 6,
  cols: 10,
}

const lessons = [
  "To start our journey across the amazing James Webb discoveries we will take a look at the beautiful Cosmic Cliffs",
  "The image above is retrieved from another great humanity friend, the Hubble Telescope,",
];

const mapCoordinateX = (x: number) => x * (window.innerWidth/gridSetting.cols)
const mapCoordinateY = (y: number) => y * (window.innerHeight/gridSetting.rows)

const buildInteractions = (currentLevel: number) => {
  const settings = [
    { 
      x: 3, 
      y: 2,
      songName: "first",
      songPath: "crab/crab_harp_trim.wav",
      miniGamePage: "/cliff",
     },
    { 
      x: 4.8, 
      y: 4.1,
      songName: "second",
      songPath: "crab/crab_harp_trim.wav",
      miniGamePage: "/sagittarius",
    },
    { 
      x: 6.5, 
      y: 2.5,
      songName: "third",
      songPath: "crab/crab_harp_trim.wav",
      miniGamePage: "/crab",
    },
  ];

  const buttons = settings.map((set, index) => (
    <Interaction
      key={index}
      x={mapCoordinateX(set.x)}
      y={mapCoordinateY(set.y)}
      songName={set.songName}
      songPath={set.songPath}
      isEnabled={currentLevel >= index+1} // enable if currentLevel is greater or equal
      miniGamePage={set.miniGamePage}
    />
  ));

  return buttons;
}

export default function MenuStage() {
  const [speed, setSpeed] = useState(0.025)
  const blurFilter = useMemo(() => new BlurFilter(2), []);

  const transition = () => {
    setSpeed(1);
  }
  const [currentLevel, setCurrentLevel] = useState(2); // track current level

  const increaseLevel = () => {
    setCurrentLevel((prevLevel) => Math.min(prevLevel+1, 4));
  };

  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <StarField speed={speed} />
        {buildInteractions(currentLevel)}
      </Stage>
      {/* <div className="absolute inset-0 flex items-end justify-center text-[#ECECEC]">
        <div className="z-20 w-full h-auto bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.5)] to-transparent flex items-end justify-center px-16 pb-8">
          <div className="text-center">
            <TextGenerateEffect words={text || lessons[currentClickQtt - 1]} />
          </div>
        </div>
      </div> */}
    </>
  );
}
