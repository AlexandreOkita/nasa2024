"use client";

export default function Page() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src="/crab/Full.jpg"
        alt="Fullscreen background image"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
