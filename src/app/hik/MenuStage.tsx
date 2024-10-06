"use client";

import { useEffect, useMemo, useState } from "react";
import StarField from "./StarField";
import { Interaction } from "./Interaction";
import { Stage } from "@pixi/react";
import { BlurFilter } from "pixi.js";
import { sound } from "@pixi/sound";
import LessonChapter from "@/components/ui/lessonChapter";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { text } from "stream/consumers";

const gridSetting = {
  rows: 6,
  cols: 10,
};

const lessons = [
  "Through the lenses of James Webb, we were able to observe galaxies farther than ever before, revealing a vast universe and a perfect harmony.",
  "Even though it is retiring, its melodies will continue to echo through history forever.",
];

const mapCoordinateX = (x: number) =>
  x * (window.innerWidth / gridSetting.cols);
const mapCoordinateY = (y: number) =>
  y * (window.innerHeight / gridSetting.rows);

const buildInteractions = (currentLevel: number) => {
  const settings = [
    {
      x: 3,
      y: 2,
      songName: "first",
      songPath: "cliff/cliff_harp_trim.wav",
      miniGamePage: "/cliff",
    },
    {
      x: 4.8,
      y: 4.1,
      songName: "second",
      songPath: "sagittarius/sagittarius_grave_nasa_trim.wav",
      miniGamePage: "/sagittarius",
    },
    {
      x: 6.5,
      y: 2.5,
      songName: "third",
      songPath: "crab/crab_twilight_nasa_trim.wav",
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
      isEnabled={index <= currentLevel} // enable if currentLevel is greater or equal
      miniGamePage={set.miniGamePage}
    />
  ));

  return buttons;
};

export default function MenuStage() {
  const currentLevel = Number(localStorage.getItem("stage"));
  const [currentClickQtt, setCurrentClickQtt] = useState(0);

  const [speed, setSpeed] = useState(0.025);
  const blurFilter = useMemo(() => new BlurFilter(2), []);

  const transition = () => {
    setSpeed(1);
  };

  useEffect(() => {
    if (Number(localStorage.getItem("stage")) == 3) {
      sound.add("final", {
        url: "musica_nasa.wav", // Add your sound file here
        loop: true, // Set sound to loop
        preload: true,
      });
      sound.play("final");
    }
  });

  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <StarField speed={speed} />
        {buildInteractions(currentLevel)}
      </Stage>
      {Number(localStorage.getItem("stage")) == 3 && (
        <div
          className="absolute inset-0 flex items-end justify-center text-[#ECECEC]"
          onClick={() => {
            if (currentClickQtt < 1) setCurrentClickQtt((prev) => prev + 1);
          }}
        >
          <div className="z-20 w-full h-auto bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.5)] to-transparent flex items-end justify-center px-16 pb-8">
            <div className="text-center">
              <TextGenerateEffect words={lessons[currentClickQtt]} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
