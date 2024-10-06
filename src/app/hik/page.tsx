"use client";

import { useMemo } from "react";
import StarField from "./StarField";
import { Interaction } from "./Interaction";

import { BlurFilter } from "pixi.js";
import { Stage } from "@pixi/react";

export default function Hik() {
  const blurFilter = useMemo(() => new BlurFilter(2), []);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <StarField />
      <Interaction
        x={window.innerWidth / 2}
        y={window.innerHeight / 2}
        songName="first"
        songPath="crab/crab_harp_trim.wav"
      ></Interaction>
    </Stage>
  );
}
