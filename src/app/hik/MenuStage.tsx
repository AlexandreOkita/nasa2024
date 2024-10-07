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

const FINAL_TEXT = "Now you can listen to the full universe symphony";

const mapCoordinateX = (x: number) =>
  x * (window.innerWidth / gridSetting.cols);
const mapCoordinateY = (y: number) =>
  y * (window.innerHeight / gridSetting.rows);

const settings = [
  {
    x: 3,
    y: 2,
    songName: "first",
    songPath: "cliff/cliff_harp_trim.wav",
    miniGamePage: "/cliff",
    title: "COSMIC CLIFFS",
  },
  {
    x: 4.8,
    y: 4.1,
    songName: "second",
    songPath: "sagittarius/sagittarius_grave_nasa_trim.wav",
    miniGamePage: "/sagittarius",
    title: "SAGITTARIUS C",
  },
  {
    x: 6.5,
    y: 2.5,
    songName: "third",
    songPath: "crab/crab_twilight_nasa_trim.wav",
    miniGamePage: "/crab",
    title: "CRAB NEBULA",
  },
];

const buildInteractions = (
  currentLevel: number,
  callback: (target: string) => void
) => {
  const buttons = settings.map((set, index) => (
    <Interaction
      key={index}
      x={mapCoordinateX(set.x)}
      y={mapCoordinateY(set.y)}
      songName={set.songName}
      songPath={set.songPath}
      isCompleted={index < currentLevel}
      isEnabled={index == currentLevel}
      miniGamePage={set.miniGamePage}
      isGameFinished={currentLevel > 2}
      onClick={callback}
    />
  ));

  return buttons;
};

export default function MenuStage() {
  const currentLevel = Number(localStorage.getItem("stage"));
  const [currentClickQtt, setCurrentClickQtt] = useState(0);
  const [showRetry, setShowRetry] = useState(false);

  const [speed, setSpeed] = useState(0.025);
  const blurFilter = useMemo(() => new BlurFilter(2), []);

  const transition = (target: string) => {
    setSpeed(1);
    setTimeout(() => {
      window.location.replace(target);
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowRetry(true);
    }, 5000);
    if (currentLevel != 3) {
      sound.add("menu", {
        url: "menu/pad-space-travel-hyperdrive-engine-humming-235901.wav", // Add your sound file here
        loop: true, // Set sound to loop
        preload: true,
      });
      sound.play("menu");
    }
  }, []);

  useEffect(() => {
    if (Number(localStorage.getItem("stage")) == 3) {
      if (!sound.isPlaying()) {
        sound.add("final", {
          url: "musica_nasa.wav", // Add your sound file here
          loop: false, // Set sound to loop
          preload: true,
        });
        sound.play("final");
      }
    }
  });

  const percentage = Math.round((currentLevel/3) * 100)

  return (
    <>
      <div className="absolute inset-0 flex items-start justify-center z-30 pt-24 pointer-events-none">
        <h1 className="text-6xl font-bold text-[#CBC9C9] pointer-events-auto">
          {Number(localStorage.getItem("stage")) <= 2 ? (
            settings[Number(localStorage.getItem("stage"))].title
          ) : (
            <div className="flex justify-center flex-col items-center text-[#CBC9C9]">
              <div>THE UNIVERSE SYMPHONY</div>
              <div className="text-3xl mt-4">IS COMPLETED</div>
            </div>
          )}
        </h1>
      </div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <StarField speed={speed} />
        {buildInteractions(currentLevel, transition)}
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
              {/* <TextGenerateEffect words={FINAL_TEXT} /> */}
              {showRetry ? (
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem("stage", "0");
                    window.location.replace("/");
                  }}
                  className="h-[110px] text-3xl font-alata text-[#D4D2D2]"
                >
                  RETRY
                </button>
              ) : (
                <>
                  <TextGenerateEffect words={FINAL_TEXT} />
                  <div className="w-[60vh] h-[110px] overflow-hidden rounded-2xl">
                    <img
                      src="gif-music.gif"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center text-[#CBC9C9] text-3xl font-bold pb-16">
        {percentage}% COMPLETE
      </div>
    </>
  );
}
