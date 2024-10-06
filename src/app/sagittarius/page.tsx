"use client";

import { Compare } from "@/components/ui/compare";
import LessonChapter from "@/components/ui/lessonChapter";
import StartChapter from "@/components/ui/startChapter";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const lessons = [
  "The stunning 50 light-years portrait of the dense center of our galaxy, the Milky Way, launches new mysteries to be inquired about, especially arround the protostars",
];

const answers = {
  correct:
    "Wow, you really know about our galaxy! An estimated 500,000 stars shine in this image of the Sagittarius C (Sgr C) region.",
  error:
    "You're right, the universe is indeed full of stars. But it was estimated only 500,000 stars in this image of the Sagittarius C (Sgr C) region.",
};

const question = "Can you estimate how many stars are present in the picture?";

export default function Page() {
  const [clickQtt, setClickQtt] = useState(0);
  const [clickable, setClickable] = useState(false);
  const [text, setText] = useState("");
  const [quantity, setQuantity] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClickable(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const setClickState = () => {
      if (clickQtt < 3 && clickQtt != 2) {
        setClickQtt(clickQtt + 1);
      }
    };
    const handleClick = () => {
      if (clickable) {
        if (audioRef.current && clickQtt === 0) {
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
    <div>
      <audio
        ref={audioRef}
        src="/sagittarius/sagittarius_grave_nasa_trim.wav"
      />
      {clickQtt == 0 ? (
        <div>
          <StartChapter
            chapterNumber="II"
            chapterTitle="SAGITTARIUS C"
            img="sagittarius/full.png"
          />
        </div>
      ) : (
        <>
          {clickQtt >= 3 && (
            <div className="w-full absolute flex z-50 justify-end font-alata text-2xl text-[#ECECEC] mt-4 pr-6">
              <button
                onClick={() => {
                  localStorage.setItem("stage", "2");
                  window.location.replace("/hik");
                }}
                className="hover:underline"
              >
                <div className="flex items-center justify-center">
                  <div className="pr-4">NEXT ADVENTURE</div>
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
          )}
          {clickQtt == 2 ? (
            <>
              <div className="relative w-screen h-screen overflow-hidden">
                {
                  <img
                    src="sagittarius/full.png"
                    alt="Fullscreen background image"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                }
              </div>
              <div className="absolute inset-0 flex items-end justify-center text-[#ECECEC]">
                <div className="z-20 w-screen h-auto flex items-end justify-center px-16 py-8 bg-[linear-gradient(185deg,_#292929_4%,_#000000_30.58%)]">
                  <div className="flex flex-col w-full">
                    <div className="text-center text-2xl">{question}</div>
                    <div className="flex justify-between text-4xl px-10 pt-5 items-center font-alata">
                      <div className="w-[100px] p-5"></div>
                      <div className="flex gap-10">
                        <button
                          type="button"
                          onClick={() => {
                            if (quantity - 1 !== 0) {
                              setQuantity(quantity - 1);
                            }
                          }}
                          className="pt-[2px]"
                        >
                          <ChevronsLeft size={32} />
                        </button>
                        <div>{5 * 10 ** quantity}</div>
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="pt-[2px]"
                        >
                          <ChevronsRight size={32} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setClickQtt(clickQtt + 1);
                        }}
                        className="w-auto p-5 border border-slate-50 rounded-[30px]"
                      >
                        GUESS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <LessonChapter
              currentClickQtt={clickQtt > 1 ? 1 : clickQtt}
              clickable={clickable}
              lessons={lessons}
              text={
                clickQtt == 3
                  ? quantity == 6
                    ? answers.correct
                    : answers.error
                  : ""
              }
              hideContinue={clickQtt >= 2}
              imgComponent={
                <img
                  src="sagittarius/full.png"
                  alt="Fullscreen background image"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              }
            />
          )}
        </>
      )}
    </div>
  );
}
