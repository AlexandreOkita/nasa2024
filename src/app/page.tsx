"use client";

import { StarsBackground } from "../components/ui/stars-background";
import { ShootingStars } from "../components/ui/shooting-stars";
import { useEffect, useState } from "react";
import LessonChapter from "../components/ui/lessonChapter";

export default function Home() {
  const lessons = [
    "20 de Janeiro de 2040",
    "Após 18 anos de trabalho incansável e inúmeras contribuições para a ciência, James Webb está encerrando suas atividades e terá seu merecido descanso no silêncio do universo.",
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
      if (clickQtt < lessons.length) {
        setClickQtt((prev) => prev + 1);
      }
    };
    const handleClick = () => {
      if (clickable && lessonStarted) {
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
  return (
    <div className="flex h-screen items-center justify-center w-full flex-col px-4 font-mono bg-slate-950 text-white">
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
            <button
              className="mt-2 px-4 py-2 border rounded-lg font-alata"
              onClick={() => {
                // console.log("Click qtt", clickQtt);
                setLessonStarted(true);
              }}
            >
              START
            </button>
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
