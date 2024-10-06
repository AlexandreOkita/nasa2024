"use client";

import { useState, useEffect, ReactNode, useRef } from "react";
import StartChapter from "@/components/ui/startChapter";
import { motion } from "framer-motion";
import { ChevronDown, ChevronsRight } from "lucide-react";
import LessonChapter from "@/components/ui/lessonChapter";

const lessons = [
  "A very strange light was visible on the earthling sky. What was mistaken by a “guest star” it was indeed the supernova that originated this remarkable nebula",
  "In order to help understand the supernova remnant’s origins James Webb newly captured channels helped us to better identify the elements that compose the fragments of the past blast",
  "The Red components represent dust emissions not visible before. In Green is possible to identify the regions of doubly ionized sulfur that, when overlapped with dust, create yellow-white regions",
  "Lastly, in Blue, it’s possible to identify the  ghostly synchrotron emission generated by the neutron rotating star at the center of the nebula",
];
type Props = {
  setRenderNext: () => void;
};

function CrabInteractiveChapter({ setRenderNext }: Props) {
  const [dustButtonClicked, setDustButtonClicked] = useState(false);
  const [sulfurButtonClicked, setSulfurButtonClicked] = useState(false);
  const [synchrotronButtonClicked, setSynchrotronButtonClicked] =
    useState(false);
  const [allButtonsClicked, setAllButtonsClicked] = useState([
    false,
    false,
    false,
  ]);

  const updateButtonClicked = (index: number) => {
    setAllButtonsClicked((prev) => {
      const newButtonsClicked = [...prev];
      newButtonsClicked[index] = true;
      return newButtonsClicked;
    });

    const newButtonsClicked = [...allButtonsClicked];
    newButtonsClicked[index] = true;
    if (newButtonsClicked[0] && newButtonsClicked[1] && newButtonsClicked[2])
      setRenderNext();
  };

  const handleButtonClick = (text: string) => {
    if (text === "DUST") {
      updateButtonClicked(0);
    } else if (text === "IONIZED SULFUR") {
      updateButtonClicked(1);
    } else if (text === "SYNCHROTRON") {
      updateButtonClicked(2);
    }
    setDustButtonClicked(false);
    setSulfurButtonClicked(false);
    setSynchrotronButtonClicked(false);
  };
  function ElementButton({
    text,
    color,
    clicked,
    setClicked,
  }: {
    text: string;
    color: string;
    clicked: boolean;
    setClicked: (value: boolean) => void;
  }) {
    return (
      <button
        onClick={() => {
          handleButtonClick(text);
          setClicked(!clicked);
        }}
        className={`hover:underline flex-1 text-center ${
          clicked
            ? `text-[${color}] border-2 border-[${color}] rounded-full`
            : ""
        }`}
        style={clicked ? { color, borderColor: color } : {}}
      >
        {text}
      </button>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src={
          dustButtonClicked
            ? "/crab/Dust.jpg"
            : sulfurButtonClicked
            ? "/crab/Sulfur.jpg"
            : synchrotronButtonClicked
            ? "/crab/Synchrotron.jpg"
            : "/crab/Full.jpg"
        }
        alt="Fullscreen background image"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* {allButtonsClicked.every((button) => button) && (
        <div className="absolute inset-0 flex items-start justify-end text-[#ECECEC]">
          <div className="w-full h-1/3 bg-gradient-to-b from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.5)] to-transparent flex items-start justify-center px-16 py-8">
            <div className="w-full flex justify-end font-alata text-2xl">
              <button
                onClick={() => {
                  localStorage.setItem("stage", "3");
                  window.location.replace("/hik");
                }}
                className="hover:underline"
              >
                NEXT ADVENTURE
              </button>
            </div>
          </div>
        </div>
      )} */}
      <div className="absolute inset-0 flex items-end justify-center text-[#ECECEC]">
        <div className="w-full h-1/3 bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.5)] to-transparent flex items-end justify-center px-16 py-8">
          <div className="text-center</div> w-full">
            <div className="flex justify-between w-full text-2xl font-alata">
              <ElementButton
                text="DUST"
                color="#CA5A8D"
                clicked={dustButtonClicked}
                setClicked={setDustButtonClicked}
              ></ElementButton>
              <ElementButton
                text="IONIZED SULFUR"
                color="#C5E97F"
                clicked={sulfurButtonClicked}
                setClicked={setSulfurButtonClicked}
              ></ElementButton>
              <ElementButton
                text="SYNCHROTRON"
                color="#45A5FE"
                clicked={synchrotronButtonClicked}
                setClicked={setSynchrotronButtonClicked}
              ></ElementButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [clickQtt, setClickQtt] = useState(0);
  const [clickable, setClickable] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [renderNext, setRenderNext] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClickable(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClick = () => {
      if (clickable) {
        if (audioRef.current && clickQtt === 0) {
          audioRef.current.play().catch((error) => {
            console.error("Failed to play audio:", error);
          });
        }
        setClickQtt((prev) => prev + 1);
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
    <div onClick={() => setClickQtt(clickQtt)}>
      <audio ref={audioRef} src="/crab/crab_twilight_nasa_trim.wav" />
      {clickQtt === 0 ? (
        <StartChapter
          chapterNumber="III"
          chapterTitle="CRAB NEBULA"
          img="/crab/Full.jpg"
        />
      ) : clickQtt <= lessons.length ? (
        <LessonChapter
          currentClickQtt={clickQtt}
          clickable={clickable}
          lessons={lessons}
          imgComponent={
            <img
              src="/crab/Full.jpg"
              alt="Fullscreen background image"
              className="absolute inset-0 w-full h-full object-cover"
            />
          }
        />
      ) : (
        <>
          {renderNext && (
            <div className="w-full absolute flex z-50 justify-end font-alata text-2xl text-[#ECECEC] mt-4 pr-6">
              <button
                onClick={() => {
                  localStorage.setItem("stage", "3");
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
          <CrabInteractiveChapter setRenderNext={() => setRenderNext(true)} />
        </>
      )}
    </div>
  );
}
