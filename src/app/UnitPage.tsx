"use client";

import React, { useState } from "react";

export default function UnitPage() {
  const [test, setTest] = useState(0);
  return (
    <div className="">
      {test}
      <button type="button" onClick={() => setTest(test + 1)}>
        Increment
      </button>
    </div>
  );
}
