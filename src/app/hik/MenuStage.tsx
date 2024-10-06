"use client";

import { useState } from "react";
import StarField from "./StarField";
import { Interaction } from "./Interaction";

import { Stage } from "@pixi/react";

export default function MenuStage() {
  const [speed, setSpeed] = useState(0.025)

  const transition = () => {
    setSpeed(1);
  }

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <StarField speed={speed} />
      <Interaction
        x={window.innerWidth / 2}
        y={window.innerHeight / 2}
        songName="first"
        songPath="crab/crab_harp_trim.wav"
        // onClick={transition}
      ></Interaction>
    </Stage>
  );
}
