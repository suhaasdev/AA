"use client";

import { ArrowUpRight } from "lucide-react";
import { SuhaasScript } from "./suhaas-signature";
import type { Film } from "@/data/content";
import { timeline, awards, characters, gallery, films } from "@/data/content";

function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="ed-heading">
      <span className="ed-index">{index}</span>
      <p className="ed-eyebrow">{eyebrow}</p>
      <h2 className="ed-title">{title}</h2>
    </div>
  );
}

export default function Editorial({
  onFilm,
  onPhoto,
}: {
  onFilm: (f: Film) => void;
  onPhoto: (i: number) => void;
}) {
  return (
    <div className="editorial" aria-label="Allu Arjun — full story">
      {/* 03 — INTRODUCTION */}
      <section id="about" className="ed-section ed-intro" aria-labelledby="about-title">
        <SectionHeading index="03" eyebrow="INTRODUCTION" title="The man beyond the frame" />
        <div className="ed-intro-grid">
          <div>
            <p className="ed-lead">
              Allu Arjun is one of Indian cinema&apos;s most complete performers —
              dancer, actor and cultural icon in a single frame.
            </p>
            <p className="ed-body">
              From the romantic rebellion of <i>Arya</i> to the global force of{" "}
              <i>Pushpa</i>, his career is built on transformation: dialect,
              posture, rhythm and silence. This site is an independent fan
              tribute to that craft — told through cinema, architecture and
              motion.
            </p>
            <p className="ed-meta">BORN 8 APRIL 1983 · HYDERABAD · TELUGU CINEMA</p>
          </div>
          <figure className="ed-portrait-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/allu-qbik-1.jpg"
              alt="Allu Arjun in a black suit"
              loading="lazy"
            />
            <figcaption>Portrait — precision and poise</figcaption>
          </figure>
        </div>
      </section>

      {/* 04 — CAREER JOURNEY */}
      <section id="journey" className="ed-section" aria-labelledby="journey-title">
        <SectionHeading index="04" eyebrow="CAREER JOURNEY" title="Two decades, one ascent" />
        <ol className="ed-timeline">
          {timeline.map((t) => (
            <li key={t.year + t.event}>
              <span className="ed-year">{t.year}</span>
              <div>
                <h3>{t.event}</h3>
                <p>{t.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 05 — FILMOGRAPHY */}
      <section id="films" className="ed-section" aria-labelledby="films-title">
        <SectionHeading index="05" eyebrow="FILMOGRAPHY" title="Selected films" />
        <div className="ed-film-grid">
          {films.map((f, i) => (
            <article key={f.title} className="ed-film-card">
              <button onClick={() => onFilm(f)} aria-label={`Open ${f.title} details`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.image} alt={`Allu Arjun — ${f.title}`} loading="lazy" />
                <span className="ed-film-top">
                  <em>0{i + 1}</em>
                  <b>{f.year}</b>
                </span>
              </button>
              <div className="ed-film-copy">
                <h3>{f.title}</h3>
                <p className="ed-film-sub">{f.sub}</p>
                <p className="ed-film-char">
                  as <b>{f.character}</b>
                </p>
                <button className="ed-link" onClick={() => onFilm(f)}>
                  View details <ArrowUpRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 06 — ICONIC CHARACTERS */}
      <section id="characters" className="ed-section" aria-labelledby="characters-title">
        <SectionHeading index="06" eyebrow="ICONIC CHARACTERS" title="Faces that stayed" />
        <div className="ed-char-grid">
          {characters.map((c) => (
            <article key={c.name} className="ed-char-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={`${c.name} — ${c.film}`} loading="lazy" />
              <div>
                <p className="ed-meta">
                  {c.film} · {c.year}
                </p>
                <h3>{c.name}</h3>
                <p>{c.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 07 — ACHIEVEMENTS */}
      <section id="achievements" className="ed-section" aria-labelledby="ach-title">
        <SectionHeading index="07" eyebrow="ACHIEVEMENTS" title="Recognition, earned" />
        <div className="ed-award-grid">
          {awards.map((a) => (
            <div key={a.label} className="ed-award">
              <p className="ed-award-value">{a.value}</p>
              <h3>{a.label}</h3>
              <p>{a.note}</p>
            </div>
          ))}
        </div>
        <p className="ed-disclaimer">
          Independent fan tribute. Counts and categories summarise widely
          reported public honours; official bodies hold definitive records.
        </p>
      </section>

      {/* 08 — VISUAL ARCHIVE */}
      <section id="gallery" className="ed-section" aria-labelledby="gallery-title">
        <SectionHeading index="08" eyebrow="VISUAL ARCHIVE" title="Frames in black and light" />
        <div className="ed-gallery">
          {gallery.map((g, i) => (
            <button
              key={g.src}
              className={`ed-thumb ${i % 5 === 0 ? "wide" : ""}`}
              onClick={() => onPhoto(i)}
              aria-label={`Open ${g.caption}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.src} alt={g.alt} loading="lazy" />
              <span>{g.caption}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 09 — VIDEO EXPERIENCE */}
      <section id="videos" className="ed-section" aria-labelledby="videos-title">
        <SectionHeading index="09" eyebrow="VIDEO EXPERIENCE" title="Motion, muted and looped" />
        <p className="ed-body" style={{ maxWidth: "62ch" }}>
          The immersive canvas above plays silent native loops — RAAKA, Pushpa
          2, DJ, Sarrainodu, Ala Vaikunthapurramuloo, Race Gurram and an
          Allu Arjun portrait. Each loop pauses offscreen and resumes on
          return. No autoplay with sound, no embeds, no wasted bandwidth.
        </p>
        <div className="ed-video-grid">
          {[
            { src: "/videos/raaka-loop.mp4", poster: "/images/raaka-firstlook.jpg", label: "RAAKA — loop" },
            { src: "/videos/pushpa-regal.mp4", poster: "/images/pushpa-poster-red.jpg", label: "Pushpa 2 — loop" },
            { src: "/videos/allu-portrait-loop.mp4", poster: "/images/allu-qbik-1.jpg", label: "Portrait — loop" },
          ].map((v) => (
            <figure key={v.src} className="ed-video-card">
              <video src={v.src} poster={v.poster} muted loop playsInline preload="none" controls />
              <figcaption>{v.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 10 — LEGACY */}
      <section id="legacy" className="ed-section ed-legacy" aria-labelledby="legacy-title">
        <SectionHeading index="10" eyebrow="LEGACY" title="Style as discipline" />
        <p className="ed-lead" style={{ maxWidth: "24ch" }}>
          Dance as language. Stardom as craft. Fandom as family.
        </p>
        <p className="ed-body" style={{ maxWidth: "62ch" }}>
          Allu Arjun&apos;s legacy is not a single blockbuster but a method:
          total commitment to the physicality of a role, respect for the
          theatrical experience, and a bridge between Telugu cinema and a
          national — now global — audience.
        </p>
      </section>

      {/* 11 — CINEMATIC CLOSING */}
      <section className="ed-section ed-closing" aria-label="Cinematic closing">
        <h2 className="ed-closing-title">
          ALLU
          <br />
          ARJUN
        </h2>
        <p className="ed-body">Someone intentionally designed this.</p>
        <div className="ed-closing-sign">
          <SuhaasScript />
          <p>
            DESIGNED &amp; BUILT BY <b>SUHAAS</b> — DIGITAL EXPERIENCE
          </p>
        </div>
      </section>

      {/* 12 — FOOTER */}
      <footer className="ed-footer" aria-label="Footer">
        <div>
          <p className="ed-footer-brand">ALLU ARJUN — CINEMATIC DIGITAL EXPERIENCE</p>
          <p className="ed-footer-credit">
            DESIGNED &amp; BUILT BY <b>SUHAAS</b>
          </p>
        </div>
        <nav aria-label="Footer">
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={13} />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={13} />
          </a>
          <a
            href="https://www.instagram.com/alluarjunonline/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram <ArrowUpRight size={13} />
          </a>
        </nav>
        <p className="ed-footer-small">
          Independent fan tribute. Imagery, footage and trademarks belong to
          their respective owners.
        </p>
      </footer>
    </div>
  );
}
