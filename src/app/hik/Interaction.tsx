"use client";

import { useState, useEffect, useRef } from "react";

import { Sprite, useTick } from "@pixi/react";
import { sound } from "@pixi/sound";
import { param } from "framer-motion/client";

const initialScale = 0.6;

export type PoIParameters = {
  x: number;
  y: number;
  finalAnimationTime: number;
  songName: string;
  songPath: string;
  isCompleted: boolean;
  isEnabled: boolean;
  miniGamePage: string;
  isGameFinished: boolean;
  onClick: (target: string) => void;
};

export function Interaction(parameters: PoIParameters) {
  const [scaleMultiplier, setScaleMultiplier] = useState(initialScale);
  const [startAnimation, setStartAnimation] = useState(false);
  const [alpha, setAlpha] = useState(1.0);

  // const fadeInterval = 500; // Duration for fade (in ms)
  // const fadeInProgress = useRef(false); // To track if fade-in is in progress
  // const fadeOutProgress = useRef(false);

  useEffect(() => {
    sound.add(parameters.songName, {
      url: parameters.songPath, // Add your sound file here
      loop: true, // Set sound to loop
      preload: true,
    });
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStartAnimation(true);
    }, parameters.finalAnimationTime);

    return () => {
      clearTimeout(timer1);
    };
  });

  const fadeSound = (targetVolume: number, duration: number) => {
    const initialVolume = sound.volume(parameters.songName);
    const startTime = performance.now();

    function updateVolume() {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newVolume =
        initialVolume + (targetVolume - initialVolume) * progress;

      sound.volume(parameters.songName, newVolume);

      if (progress < 1) {
        requestAnimationFrame(updateVolume);
      } else if (targetVolume === 0) {
        sound.stop(parameters.songName); // Stop sound after fading out
      }
    }

    requestAnimationFrame(updateVolume);
  };

  const handleMouseEnter = () => {
    if (parameters.isEnabled || parameters.isCompleted) {
      // if (parameters.isEnabled) {
      setScaleMultiplier(initialScale * 1.5); // Scale up on hover
      // }
      sound.play(parameters.songName);
    }

    // if (fadeOutProgress.current) {
    //   fadeOutProgress.current = false; // Stop any ongoing fade-out
    // }

    // fadeInProgress.current = true;
    // sound.play(parameters.songName); // Start the sound if it isn't playing yet
    // fadeSound(1, fadeInterval);
  };

  const handleMouseLeave = () => {
    if (parameters.isEnabled || parameters.isCompleted) {
      // if (parameters.isEnabled) {
      setScaleMultiplier(initialScale); // Reset scale when not hovering
      // }
      sound.stop(parameters.songName);
    }

    // if (fadeInProgress.current) {
    //   fadeInProgress.current = false; // Stop any ongoing fade-in
    // }

    // fadeOutProgress.current = true;
    // fadeSound(0, fadeInterval);
  };

  const handleClick = () => {
    if (parameters.isEnabled || parameters.isCompleted) {
      parameters.onClick(parameters.miniGamePage);
      // window.location.replace(parameters.miniGamePage);
    }
  };

  useTick((delta) => {
    if (startAnimation) {
      const alpha = 0.5 + 0.5 * Math.sin(performance.now() / 500);
      setAlpha(alpha);
    }
  });

  return (
    <Sprite
      image={
        parameters.isEnabled
          ? "ToInteractStar.png"
          : parameters.isCompleted
          ? "AlreadyInteractedStar.png"
          : "BlockedStar.png"
      }
      alpha={startAnimation ? alpha : 1.0}
      x={parameters.x}
      y={parameters.y}
      anchor={{
        x: 0.5,
        y: 0.5,
      }}
      scale={scaleMultiplier}
      interactive={
        (parameters.isEnabled || parameters.isCompleted) &&
        !parameters.isGameFinished
      }
      pointerover={handleMouseEnter}
      pointerout={handleMouseLeave}
      pointertap={handleClick} // Handle click event for redirection
    />
  );
}
