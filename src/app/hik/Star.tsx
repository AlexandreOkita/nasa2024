import { useState } from 'react';

import { Sprite, useTick } from '@pixi/react';

const fov = 20;
const cameraZ = 0;

export type StarParameters = {
  initialPosX: number;
  initialPosY: number;
  initialPosZ: number;
  baseSpeed?: number;
  starBaseSize: number;
  starStretch: number;
  screenWidth: number;
  screenHeight: number,
  cameraZ: number
};

export function Star(parameters: StarParameters) {
  const [x, setX] = useState(parameters.initialPosX)
  const [y, setY] = useState(parameters.initialPosY)
  const [z, setZ] = useState(parameters.initialPosZ)
  const [speed, setSpeed] = useState(parameters.baseSpeed || 0)
  const [alpha, setAlpha] = useState(1);
  const [flickerPhase] = useState(Math.random() * Math.PI * 2);

  useTick(delta =>{
    setZ(z - parameters.cameraZ);
    // console.log(x * (fov / z) * parameters.screenWidth + parameters.screenWidth / 2);
    setX(parameters.initialPosX * (fov / z) * parameters.screenWidth + parameters.screenWidth / 2);
    setY(parameters.initialPosY * (fov / z) * parameters.screenWidth + parameters.screenHeight / 2);

    // const flickerSpeed = 0.001; // Controls how fast the flicker happens
    // setAlpha(0.5 + 0.5 * Math.sin(flickerSpeed * (Date.now() + flickerPhase)));
  });

  const dxCenter = x - parameters.screenWidth / 2;
  const dyCenter = y - parameters.screenHeight / 2;
  const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
  const distanceScale = Math.max(0, (2000 - z) / 2000);

  return(
    <Sprite
      image={'https://pixijs.com/assets/star.png'}
      x={x}
      y={y}
      anchor={{x: 0.5, y: 0.7}}
      scale={{
        x: distanceScale * parameters.starBaseSize, 
        y: distanceScale * parameters.starBaseSize + (distanceScale * speed * parameters.starStretch * distanceCenter) / parameters.screenWidth
      }}
      rotation = {Math.atan2(dyCenter, dxCenter) + Math.PI / 2}
      alpha={alpha}
    />
  )
}