"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="">
      Home
      <div onClick={() => router.push("/firstGame")}>go!</div>
    </div>
  );
}
