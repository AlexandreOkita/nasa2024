"use client";

import { StarsBackground } from "../components/ui/stars-background";
import { ShootingStars } from "../components/ui/shooting-stars";
import { useEffect, useState } from "react";
import LessonChapter from "../components/ui/lessonChapter";

export default function Home() {
  const lessons = [
    "January 20, 2040",
    "After 18 years of tireless work and countless contributions to science, James Webb is ending its mission and will receive its well-deserved rest amidst the apparent silence of the universe.",
    "To remember and celebrate its work, let’s listen to some of its first notes.",
  ];

  const [lessonStarted, setLessonStarted] = useState(false);
  const [clickQtt, setClickQtt] = useState(0);
  const [clickable, setClickable] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClickable(true);
    }, 3000);

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
        }, 3000);

        return () => clearTimeout(timer);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [clickable]);

  console.log("clickQtt ==>", clickQtt);
  return (
    <div
      className="flex h-screen items-center justify-center w-full flex-col px-4 font-mono bg-slate-950 text-white"
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
            <p className="mb-2 font-squadaone text-6xl">
              THE UNIVERSE SYMPHONY
            </p>
            <div className="mt-2 px-4 py-2 font-alata text-[#A9A5A5]">
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
  );
}
