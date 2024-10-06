type Props = {
  chapterNumber: string;
  chapterTitle: string;
};

export default function StartChapter({ chapterNumber, chapterTitle }: Props) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src="/crab/Full.jpg"
        alt="Fullscreen background image"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.4)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-[#ECECEC]">
        <div className="text-center">
          <h1 className="text-7xl tracking-widest">{chapterNumber}</h1>
          <br></br>
          <h1 className="text-6xl tracking-widest">{chapterTitle}</h1>
        </div>
      </div>
    </div>
  );
}
