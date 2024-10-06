"use client";

import { Compare } from "@/components/ui/compare";
import LessonChapter from "@/components/ui/lessonChapter";
import StartChapter from "@/components/ui/startChapter";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "framer-motion";
import { ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";

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

function RenderCompare() {
  return (
    <div className="absolute inset-0 w-full h-full object-cover">
      <Compare
        firstImage="cliff/cliff-hubble-site.webp"
        secondImage="cliff/cliff-jw-site.webp"
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
  const [text, setText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setClickable(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const setClickState = () => {
      if (clickQtt < 3) {
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

  console.log("clickQtt:", clickQtt);

  return (
    <div onClick={() => setClickQtt(clickQtt)}>
      {clickQtt == 0 ? (
        <div>
          <StartChapter
            chapterNumber="II"
            chapterTitle="SAGITTARIUS C"
            img="cliff/cliff-hubble-site.webp"
          />
        </div>
      ) : (
        <>
          {clickQtt >= 3 && (
            <div className="w-full absolute flex z-50 justify-end font-alata text-2xl text-[#ECECEC] mt-4 pr-6">
              <button
                onClick={() => {
                  console.log("NEXT ADVENTURE clicked");
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
                    src="cliff/cliff-hubble-site.webp"
                    alt="Fullscreen background image"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                }
              </div>
              <div className="absolute inset-0 flex items-end justify-center text-[#ECECEC]">
                <div className="z-20 w-full h-auto flex items-end justify-center px-16 py-8 bg-[linear-gradient(185deg,_#292929_4%,_#000000_30.58%)]">
                  <div className="text-center text-2xl">{question}</div>
                </div>
              </div>
            </>
          ) : (
            <LessonChapter
              currentClickQtt={clickQtt > 1 ? 1 : clickQtt}
              clickable={clickable}
              lessons={lessons}
              text={text}
              hideContinue={clickQtt >= 2}
              imgComponent={
                <img
                  src="cliff/cliff-hubble-site.webp"
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
