import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Props = {
  chapterNumber: string;
  chapterTitle: string;
  img: string;
};

export default function StartChapter({
  chapterNumber,
  chapterTitle,
  img,
}: Props) {
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src={img}
        alt="Fullscreen background image"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.4)" }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-[#ECECEC] space-y-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <div className="text-center">
            <h1 className="text-7xl tracking-widest">{chapterNumber}</h1>
            <br></br>
            <h1 className="text-6xl tracking-widest">{chapterTitle}</h1>
          </div>
        </motion.div>
        {showContinue && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
          >
            <div className="text-center">
              <h1 className="text-2xl tracking-widest">CLICK TO CONTINUE</h1>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
