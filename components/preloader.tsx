"use client";

import { useEffect, useState } from "react";
import { SuhaasScript } from "./suhaas-signature";

export default function Preloader({ done }: { done: boolean }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 650);
    const t2 = setTimeout(() => setPhase(2), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className={`cinematic-preloader ${done ? "done" : ""} phase-${phase}`}
      aria-hidden={done}
    >
      <div className="cinematic-preloader-inner">
        <p className="pre-eyebrow">A CINEMATIC DIGITAL EXPERIENCE</p>
        <h1 className="pre-title">
          <span>ALLU</span>
          <span>ARJUN</span>
        </h1>
        <div className="pre-bar" aria-hidden="true">
          <i />
        </div>
        <div className="pre-suhaas">
          <SuhaasScript />
          <p>
            DESIGNED &amp; BUILT BY <b>SUHAAS</b>
          </p>
        </div>
      </div>
    </div>
  );
}
