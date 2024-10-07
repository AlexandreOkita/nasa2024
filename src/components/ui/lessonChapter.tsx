import { ReactNode } from "react";
import { TextGenerateEffect } from "./text-generate-effect";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function LessonChapter({
  currentClickQtt,
  clickable,
  lessons,
  imgComponent,
  hideContinue = false,
  text,
}: {
  currentClickQtt: number;
  clickable: boolean;
  lessons: string[];
  text?: string;
  imgComponent?: ReactNode;
  hideContinue?: boolean;
}) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {imgComponent}
      <div className="absolute inset-0 flex items-end justify-center text-[#ECECEC]">
        <div className="z-20 w-full h-[40vh] bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.8)] to-transparent flex items-end justify-center px-16 pb-12">
          <div className="text-center font-alata pb-4">
            <TextGenerateEffect words={text || lessons[currentClickQtt - 1]} />
          </div>
        </div>
      </div>
      {clickable && !hideContinue && (
        <motion.div
          className="absolute bottom-4 right-4 text-[#ECECEC] z-30"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <ChevronDown size={32} />
        </motion.div>
      )}
    </div>
  );
}
