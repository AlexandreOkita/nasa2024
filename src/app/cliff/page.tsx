"use client";

import { Compare } from "@/components/ui/compare";
import LessonChapter from "@/components/ui/lessonChapter";
import StartChapter from "@/components/ui/startChapter";
import { motion } from "framer-motion";
import { ChevronsRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const lessons = [
  "To start our journey across the amazing James Webb discoveries, we will take a look at the beautiful Cosmic Cliffs",
  "The image above is retrieved from another great humanity friend, the Hubble Telescope,",
  "and it captures the star-forming region NGC 3324 in Carina Nebula",
  "Try to sweep the mouse on the image to reveal some details that were invisible to us before James Webb",
];

function RenderCompare() {
  return (
    <div className="absolute inset-0 w-full h-full object-cover">
      <Compare
        firstImage="cliff/cliff-jw-site.png"
        secondImage="cliff/cliff-hubble-site2.png"
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-left-top"
        className="h-screen w-screen"
        slideMode="hover"
      />
    </div>
  );
}

export default function Page() {
  const [clickQtt, setClickQtt] = useState(0);
  const [clickable, setClickable] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClickable(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const setClickState = () => {
      if (clickQtt < lessons.length) {
        setClickQtt((prev) => prev + 1);
      }
    };
    const handleClick = () => {
      if (clickable) {
        if (audioRef.current && clickQtt === 0) {
          audioRef.current.loop = true;
          audioRef.current.play().catch((error) => {
            console.error("Failed to play audio:", error);
          });
        }
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

  return (
    <div onClick={() => setClickQtt(clickQtt)}>
      <audio ref={audioRef} src="/cliff/cliff_harp_trim.wav" />
      {clickQtt == 0 ? (
        <div>
          <StartChapter
            chapterNumber="I"
            chapterTitle="COSMIC CLIFFS"
            img="cliff/cliff-hubble-site.png"
          />
        </div>
      ) : (
        <>
          {clickQtt >= lessons.length && (
            <div className="w-full absolute flex z-50 justify-end font-alata text-2xl text-[#ECECEC]">
              <div className="w-full h-[20vh] bg-gradient-to-b from-[rgba(0,0,0,0.9)] via-[rgba(0,0,0,0.8)] flex items-start justify-end px-16 py-8">
                <button
                  onClick={() => {
                    const currentLevel = Number(localStorage.getItem("stage"));
                    if (currentLevel < 1) localStorage.setItem("stage", "1");
                    window.location.replace("/hik");
                  }}
                  className="hover:underline"
                >
                  <div className="flex items-center justify-center">
                    <div className="pr-4 text-4xl">NEXT ADVENTURE</div>
                    <motion.div
                      className="bottom-4 right-4 text-white z-30"
                      animate={{
                        x: [0, -10, 0],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <ChevronsRight size={32} />
                    </motion.div>
                  </div>
                </button>
              </div>
            </div>
          )}
          <LessonChapter
            currentClickQtt={clickQtt}
            clickable={clickable}
            lessons={lessons}
            hideContinue={clickQtt >= lessons.length}
            imgComponent={
              clickQtt <= 3 ? (
                <img
                  src="cliff/cliff-hubble-site.png"
                  alt="Fullscreen background image"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <RenderCompare />
              )
            }
          />
        </>
      )}
    </div>
  );
}
