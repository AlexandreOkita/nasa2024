"use client";

import { StarsBackground } from "../components/ui/stars-background";
import { ShootingStars } from "../components/ui/shooting-stars";
import { useEffect, useState } from "react";
import LessonChapter from "../components/ui/lessonChapter";

import { Stage } from "@pixi/react";
import { sound } from "@pixi/sound";

import StarField from "./hik/StarField";

export default function Home() {
  localStorage.setItem("stage", "0");

  useEffect(() => {
    sound.add("home", {
      url: "home/piano_nasa.wav", // Add your sound file here
      loop: true, // Set sound to loop
      preload: true,
    });
    sound.play("home");
  }, []);

  const lessons = [
    "October, 2024",
    "Two years ago, the maestro James Webb Telescope was launched into orbit to advance the boundaries of the human knowledge and already has revealed so many pieces of the Universe Symphony for us.",
    "Let's explore the stars and find some of these melodies.",
  ];

  const [lessonStarted, setLessonStarted] = useState(false);
  const [clickQtt, setClickQtt] = useState(0);
  const [clickable, setClickable] = useState(false);

  useEffect(() => {
    localStorage.setItem("stage", "0");
    const timer = setTimeout(() => {
      setClickable(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const setClickState = () => {
      if (clickQtt === 2) {
        window.location.replace("/hik");
      }
      if (clickQtt < lessons.length && clickQtt < 2) {
        setClickQtt((prev) => prev + 1);
      }
    };
    const handleClick = () => {
      if (clickable) {
        setClickState();
        setClickable(false);
        const timer = setTimeout(() => {
          setClickable(true);
        }, 700);

        return () => clearTimeout(timer);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [clickable]);

  const speed = 0.025;

  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <StarField speed={speed} />
      </Stage>
      <div
        className="absolute inset-0 flex h-screen items-center justify-center w-full flex-col px-4 font-mono text-white" //bg-slate-950
        style={{ zIndex: 10 }} // Add higher z-index
        onClick={() => setLessonStarted(true)}
      >
        <div className="flex flex-col items-center">
          {!lessonStarted ? (
            <div className="flex flex-col items-center">
              <img
                src="/james_mirror.png"
                alt="James webb mirror"
                className="mb-4"
                style={{ height: "50vh" }}
              />
              <br />
              <br />
              <br />
              <p className="mb-2 font-squadaone text-6xl">
                THE UNIVERSE SYMPHONY
              </p>
              <div className="mt-2 px-4 py-2 font-alata text-[#D4D2D2] text-3xl font-bold">
                TAP TO START
              </div>
            </div>
          ) : (
            <LessonChapter
              currentClickQtt={clickQtt + 1}
              clickable={clickable}
              lessons={lessons}
              imgComponent={
                <div className="flex flex-col items-center justify-center h-full">
                  <img
                    src="/james_mirror.png"
                    alt="James webb mirror"
                    className="mb-4"
                    style={{ height: "50vh" }}
                  />
                </div>
              }
              hideContinue={clickQtt >= lessons.length}
            />
          )}
        </div>
      </div>
    </>
  );
}
