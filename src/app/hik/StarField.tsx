"use client";

import { useMemo, useState } from "react";
import { Star, StarParameters } from "./Star";

import { Container, useTick } from "@pixi/react";

const starAmount = 800;
const spread = 50;

interface StarFieldProps {
    speed: number;  // Ensure speed is defined as a number
}

export default function StarField({ speed }: StarFieldProps) {
  const [cameraZ, setCameraZ] = useState(0);
  const [stars, setStars] = useState<StarParameters[]>([]);

  useTick((delta) => {
    setCameraZ(cameraZ + delta * 10 * speed);
  });

  useMemo(() => {
    let createdStars: StarParameters[] = [];
    for (let i = 0; i < starAmount; i++) {
      const deg = Math.random() * Math.PI * 2;
      const distance = Math.random() * spread + 1;
      createdStars.push({
        initialPosX: Math.cos(deg) * distance,
        initialPosY: Math.sin(deg) * distance,
        initialPosZ: Math.random() * 2000,
        baseSpeed: speed,
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
        initialPosZ: cameraZ + Math.random() * 1000 + 2000,
        baseSpeed: speed,
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
          baseSpeed={speed}
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
