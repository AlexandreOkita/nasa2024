"use-client";

import { useEffect, useState } from "react";

import { Sprite, useTick } from "@pixi/react";

const fov = 20;
const cameraZ = 0;

export type StarParameters = {
  initialPosX: number;
  initialPosY: number;
  initialPosZ: number;
  baseSpeed: number;
  starBaseSize: number;
  starStretch: number;
  screenWidth: number;
  screenHeight: number;
  cameraZ: number;
  onRecycle: () => void;
};

export function Star(parameters: StarParameters) {  
  const [x, setX] = useState(parameters.initialPosX);
  const [y, setY] = useState(parameters.initialPosY);
  const [alpha, setAlpha] = useState(1);
  const [flickerPhase] = useState(Math.random() * Math.PI * 2);

  useTick((delta) => {
    const newZ = parameters.initialPosZ - parameters.cameraZ;

    if (newZ < 0) {
      parameters.onRecycle();  // Call the recycling callback
      return;  // Exit early to avoid further calculations
    }
    setX(
      parameters.initialPosX * (fov / newZ) * parameters.screenWidth +
        parameters.screenWidth / 2
    );
    setY(
      parameters.initialPosY * (fov / newZ) * parameters.screenWidth +
        parameters.screenHeight / 2
    );

    // const flickerSpeed = 0.001; // Controls how fast the flicker happens
    // setAlpha(0.5 + 0.5 * Math.sin(flickerSpeed * (Date.now() + flickerPhase)));
  });

  const dxCenter = x - parameters.screenWidth / 2;
  const dyCenter = y - parameters.screenHeight / 2;
  const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
  const distanceScale = Math.max(0, (2000 - (parameters.initialPosZ - parameters.cameraZ)) / 2000);

  return (
    <Sprite
      image={"https://pixijs.com/assets/star.png"}
      x={x}
      y={y}
      anchor={{ x: 0.5, y: 0.7 }}
      scale={{
        x: distanceScale * parameters.starBaseSize,
        y:
          distanceScale * parameters.starBaseSize + 
          (distanceScale * parameters.baseSpeed * parameters.starStretch * distanceCenter) /
            parameters.screenWidth,
      }}
      rotation={Math.atan2(dyCenter, dxCenter) + Math.PI / 2}
      alpha={alpha}
    />
  );
}
