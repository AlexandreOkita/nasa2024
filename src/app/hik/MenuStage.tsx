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
    imageCompleted: 'blueLocked.png',
    imageEnabled: 'blueEnabled.png',
  },
  {
    x: 4.8,
    y: 4.1,
    songName: "second",
    songPath: "sagittarius/sagittarius_grave_nasa_trim.wav",
    miniGamePage: "/sagittarius",
    title: "SAGITTARIUS C",
    imageCompleted: 'redLocked.png',
    imageEnabled: 'redEnabled.png',
  },
  {
    x: 6.5,
    y: 2.5,
    songName: "third",
    songPath: "crab/crab_twilight_nasa_trim.wav",
    miniGamePage: "/crab",
    title: "CRAB NEBULA",
    imageCompleted: 'yellowLocked.png',
    imageEnabled: 'yellowEnabled.png',
  },
];

const getAnimationTime = (index: number) => {
  switch (index) {
    case 0:
      return 2000;
    case 1:
      return 11000;
    case 2:
      return 19000;
    default:
      return 50000;
  }
};

const buildInteractions = (
  currentLevel: number,
  callback: (target: string) => void,
  hoverCallback: (title: string) => void
) => {
  const buttons = settings.map((set, index) => (
    <Interaction
      finalAnimationTime={getAnimationTime(index)}
      key={index}
      x={mapCoordinateX(set.x)}
      y={mapCoordinateY(set.y)}
      songName={set.title}
      songPath={set.songPath}
      isCompleted={index < currentLevel}
      isEnabled={index == currentLevel}
      miniGamePage={set.miniGamePage}
      isGameFinished={currentLevel > 2}
      onClick={callback}
      onHover={hoverCallback}
      completedImage={set.imageCompleted}
      enabledImage={set.imageEnabled}
    />
  ));

  return buttons;
};

export default function MenuStage() {
  const currentLevel = Number(localStorage.getItem("stage"));
  const [currentClickQtt, setCurrentClickQtt] = useState(0);
  const [showRetry, setShowRetry] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [speed, setSpeed] = useState(0.025);
  const [title, setTitle] = useState("");
  const blurFilter = useMemo(() => new BlurFilter(2), []);

  const transition = (target: string) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    const duration = 1000;
    const initialSpeed = 0.025;
    // Target speed value
    const targetSpeed = 1;
    // Interval frequency (in milliseconds)
    const intervalTime = 32; // Roughly 60 frames per second
    // Number of steps to reach the target speed
    const steps = duration / intervalTime;
    // Increment for each step
    const speedIncrement = (targetSpeed - initialSpeed) / steps;
    let currentSpeed = initialSpeed;
    const intervalId = setInterval(() => {
      currentSpeed += speedIncrement;

      // Ensure that we don't exceed the target speed
      if (currentSpeed >= targetSpeed) {
        currentSpeed = targetSpeed;
        clearInterval(intervalId); // Stop the interval once we reach the target speed
      }

      setSpeed(currentSpeed);
    }, intervalTime);

    setTimeout(() => {
      window.location.replace(target);
    }, 2000);
  };

  const hoverTitleUpdate = (newTitle: string) => {
    setTitle(newTitle);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowRetry(true);
    }, 1000 * 43);
    if (currentLevel != 3) {
      sound.add("menu", {
        url: "menu/pad-space-travel-hyperdrive-engine-humming-235901.wav", // Add your sound file here
        loop: true, // Set sound to loop
        preload: true,
      });
      sound.play("menu");
    } else {
      if (!isPlaying) {
        setIsPlaying(true);
        sound.add("final", {
          url: "musica_nasa.wav", // Add your sound file here
          loop: false, // Set sound to loop
          preload: true,
        });
        sound.play("final");
      }
    }
  }, []);

  // useEffect(() => {
  //   if (Number(localStorage.getItem("stage")) == 3 && !isPlaying) {
  //     setIsPlaying(true);
  //     sound.add("final", {
  //       url: "musica_nasa.wav", // Add your sound file here
  //       loop: false, // Set sound to loop
  //       preload: true,
  //     });
  //     sound.play("final");
  //   }
  // }, []);

  const percentage = Math.round((currentLevel / 3) * 100);

  return (
    <>
      {!isTransitioning && (
        <div className="absolute inset-0 flex items-start justify-center z-30 pt-24 pointer-events-none">
          <h1 className="text-6xl font-bold text-[#CBC9C9] pointer-events-auto">
            {Number(localStorage.getItem("stage")) <= 2 ? (
              title.length < 1 ? (
                "EXPLORE THE STARS"
              ) : (
                title
              )
            ) : (
              <div className="flex justify-center flex-col items-center text-[#CBC9C9]">
                <div>THE UNIVERSE SYMPHONY</div>
                <div className="text-3xl mt-4">IS COMPLETED</div>
              </div>
            )}
          </h1>
        </div>
      )}
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <StarField speed={speed} />
        {!isTransitioning &&
          buildInteractions(currentLevel, transition, hoverTitleUpdate)}
      </Stage>
      {!isTransitioning && Number(localStorage.getItem("stage")) == 3 && (
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
      {!isTransitioning && percentage < 100 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center text-[#CBC9C9] text-3xl font-bold pb-16">
          {percentage}% COMPLETE
        </div>
      )}
    </>
  );
}
