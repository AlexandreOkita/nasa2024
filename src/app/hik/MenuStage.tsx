"use client";

import { useMemo, useState } from "react";
import StarField from "./StarField";
import { Interaction } from "./Interaction";
import { Stage } from "@pixi/react";
import { BlurFilter } from "pixi.js";

const gridSetting = {
  rows: 6,
  cols: 10,
}

const mapCoordinateX = (x: number) => x * (window.innerWidth/gridSetting.cols)
const mapCoordinateY = (y: number) => y * (window.innerHeight/gridSetting.rows)

const buildInteractions = (currentLevel: number) => {
  const settings = [
    { 
      x: 3, 
      y: 2,
      songName: "first",
      songPath: "cliff/cliff_harp_trim.wav",
      miniGamePage: "/cliff",
     },
    { 
      x: 4.8, 
      y: 4.1,
      songName: "second",
      songPath: "sagittarius/sagittarius_grave_nasa_trim.wav",
      miniGamePage: "/sagittarius",
    },
    { 
      x: 6.5, 
      y: 2.5,
      songName: "third",
      songPath: "crab/crab_twilight_nasa_trim.wav",
      miniGamePage: "/crab",
    },
  ];

  const buttons = settings.map((set, index) => (
    <Interaction
      key={index}
      x={mapCoordinateX(set.x)}
      y={mapCoordinateY(set.y)}
      songName={set.songName}
      songPath={set.songPath}
      isEnabled={index <= currentLevel} // enable if currentLevel is greater or equal
      miniGamePage={set.miniGamePage}
    />
  ));

  return buttons;
}

export default function MenuStage() {
  const currentLevel = Number(localStorage.getItem("stage"))
  
  const [speed, setSpeed] = useState(0.025)
  const blurFilter = useMemo(() => new BlurFilter(2), []);

  const transition = () => {
    setSpeed(1);
  }

  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <StarField speed={speed} />
        {buildInteractions(currentLevel)}
      </Stage>
    </>
  );
}
