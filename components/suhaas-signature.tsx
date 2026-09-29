"use client";

import { useState } from "react";

/**
 * SUHAAS creator signature.
 * Primary artwork: /images/suhaas-signature.png (silver script, transparent).
 * Inline SVG fallback renders only if the PNG fails to load.
 */
export function SuhaasScript({ className = "" }: { className?: string }) {
  const [pngOk, setPngOk] = useState(true);
  return (
    <span className={`suhaas-script ${className}`} role="img" aria-label="Suhaas signature">
      {pngOk ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/images/suhaas-signature.png"
          alt="Suhaas"
          className="suhaas-script-img"
          onError={() => setPngOk(false)}
        />
      ) : (
        <svg viewBox="0 0 640 220" aria-hidden="true" className="suhaas-script-svg">
          <defs>
            <linearGradient id="suhaas-silver" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fdfdfd" />
              <stop offset="35%" stopColor="#c9c9d4" />
              <stop offset="55%" stopColor="#f5f0e6" />
              <stop offset="75%" stopColor="#9a9aa8" />
              <stop offset="100%" stopColor="#f2f2f5" />
            </linearGradient>
            <filter id="suhaas-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.7" />
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#fff" floodOpacity="0.25" />
            </filter>
          </defs>
          <g
            fill="none"
            stroke="url(#suhaas-silver)"
            strokeLinecap="round"
            filter="url(#suhaas-glow)"
          >
            <path
              strokeWidth="5"
              d="M 55 175 C 110 160, 190 140, 235 118 C 275 100, 268 82, 238 86 C 205 90, 175 110, 205 128 C 235 146, 320 150, 360 128 C 380 117, 372 100, 355 108"
            />
            <path
              strokeWidth="3.2"
              d="M 330 140 C 345 118, 355 100, 362 82 M 362 82 C 368 100, 372 120, 378 138 M 385 138 C 395 120, 405 108, 418 108 C 428 108, 428 125, 420 138 M 420 138 C 432 118, 445 106, 458 106 C 470 106, 468 126, 456 140 M 462 140 C 475 120, 490 108, 502 110 C 512 112, 508 128, 498 140 M 505 138 C 520 118, 535 108, 548 112 C 558 115, 552 130, 542 140 M 350 158 C 430 152, 520 142, 590 128"
            />
            <circle cx="596" cy="142" r="2.4" fill="url(#suhaas-silver)" stroke="none" />
          </g>
        </svg>
      )}
    </span>
  );
}

export function SuhaasArchitectMark() {
  return (
    <div className="suhaas-architect" aria-label="Designed and built by Suhaas">
      <span className="suhaas-architect-line" aria-hidden="true" />
      <span className="suhaas-architect-text">
        <SuhaasScript className="suhaas-architect-script" />
        <small>
          DESIGNED &amp; BUILT BY <b>SUHAAS</b>
        </small>
        <em>DIGITAL EXPERIENCE</em>
      </span>
    </div>
  );
}
