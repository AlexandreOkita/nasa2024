"use client";

import { useMemo, useState } from "react";
import { Star, StarParameters } from "./Star";

import { Container, useTick } from "@pixi/react";

const starAmount = 800;
const spread = 50;

export default function StarField() {
  const [cameraZ, setCameraZ] = useState(0);
  const [stars, setStars] = useState<StarParameters[]>([]);

  useTick((delta) => {
    setCameraZ(cameraZ + delta * 10 * 0.025);
  });

  useMemo(() => {
    console.log("initalizing")
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
        onRecycle: () => recycleStar(i)
      });
    }
    setStars(createdStars);
  }, []);

  const recycleStar = (index: number) => {
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * spread + 1;
    const newStar = {
        initialPosX: Math.cos(deg) * distance,
        initialPosY: Math.sin(deg) * distance,
        initialPosZ: cameraZ + 2000,
        baseSpeed: 0,
        starBaseSize: 0.05,
        starStretch: 5,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        cameraZ: 0,
        onRecycle: () => recycleStar(index)
      };
    setStars((prevStars) => {
        const starsCopy = [...prevStars]; // Create a shallow copy of the array
        starsCopy[index] = newStar; // Replace the star at the specified index
        return starsCopy; // Return the updated array
    });
  };

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
          onRecycle={() => recycleStar(index)}
        />
      ))}
    </Container>
  );
}
