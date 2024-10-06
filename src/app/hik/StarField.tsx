"use client";

import { useMemo, useState } from "react";
import { Star, StarParameters } from "./Star";

import { Container, useTick } from "@pixi/react";

const starAmount = 800;
const spread = 50;

export default function StarField() {
  const [cameraZ, setCameraZ] = useState(0);

  useTick((delta) => {
    setCameraZ(delta * 10 * 0.025);
  });

  const stars = useMemo(() => {
    let createdStars: StarParameters[] = [];
    for (let i = 0; i < starAmount; i++) {
      const deg = Math.random() * Math.PI * 2;
      const distance = Math.random() * spread + 1;
      createdStars.push({
        initialPosX: Math.cos(deg) * distance,
        initialPosY: Math.sin(deg) * distance,
        initialPosZ: Math.random() * 2000,
        baseSpeed: 0,
        starBaseSize: 0.05,
        starStretch: 5,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        cameraZ: 0,
      });
    }
    return createdStars;
  }, []);

  return (
    <Container>
      {stars.map((star, index) => (
        <Star
          key={index}
          initialPosX={star.initialPosX}
          initialPosY={star.initialPosY}
          initialPosZ={star.initialPosZ}
          baseSpeed={star.baseSpeed}
          starBaseSize={star.starBaseSize}
          starStretch={star.starStretch}
          screenWidth={star.screenWidth}
          screenHeight={star.screenHeight}
          cameraZ={cameraZ}
        />
      ))}
    </Container>
  );
}
