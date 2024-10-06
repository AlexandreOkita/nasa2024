"use client";

import { Compare } from "@/components/ui/compare";

export default function Page() {
  return (
    <div className="">
      <Compare
        firstImage="cliff/cliff-jw.png"
        secondImage="https://assets.aceternity.com/code-solution.png"
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-left-top"
        className="h-screen w-screen"
        slideMode="hover"
      />
    </div>
  );
}
