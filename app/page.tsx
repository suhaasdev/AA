"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { ArrowUpRight, ArrowDown, Menu } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import FilmLoop from "./film-loop";
import { DURATION, clamp, range, windowFade, motionState, smooth } from "./motion";
import { films, spotlights, gallery } from "@/data/content";
import type { Film } from "@/data/content";
import Preloader from "@/components/preloader";
import Editorial from "@/components/editorial";
import { FilmDetailsDialog, GalleryViewer } from "@/components/cinematic-dialogs";
import { SuhaasScript } from "@/components/suhaas-signature";

const Sculpture = dynamic(() => import("./sculpture"), {
  ssr: false,
  loading: () => <div className="sculpture-fallback" aria-hidden="true" />,
});

const signature = "M63 257 145 49 156 254 42 164H323 M179 257 242 49 283 257";
function Signature({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="25 25 320 260" role="img" aria-label="Allu Arjun AA signature">
      <path d={signature} stroke="currentColor" strokeWidth="7" strokeLinejoin="miter" fill="none" />
    </svg>
  );
}

// Immersive chapters (preserved scroll engine)
const chapters = [
  { s: 0, label: "The beginning" },
  { s: 1.15, label: "Films" },
  { s: 4.45, label: "The icon" },
  { s: 7.7, label: "In focus" },
  { s: 12.8, label: "Signature" },
];

// Full site nav: immersive + editorial anchors
const siteNav = [
  { label: "HOME", target: { s: 0 } },
  { label: "ABOUT", target: { id: "about" } },
  { label: "JOURNEY", target: { id: "journey" } },
  { label: "FILMS", target: { id: "films" } },
  { label: "CHARACTERS", target: { id: "characters" } },
  { label: "GALLERY", target: { id: "gallery" } },
  { label: "LEGACY", target: { id: "legacy" } },
];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const lenis = useRef<Lenis | null>(null);
  const immersiveLimit = useRef(1);
  const [menu, setMenu] = useState(false);
  const [ready, setReady] = useState(false);
  const [finish, setFinish] = useState("iridescent");
  const [active, setActive] = useState(0);
  const [film, setFilm] = useState<Film | null>(null);
  const [photo, setPhoto] = useState<number | null>(null);
  const [videoScene, setVideoScene] = useState({
    orbit: -2,
    feature: 0,
    portrait: false,
    orbitLoad: 0,
    orbitPlay: 0,
  });

  useEffect(() => {
    const el = root.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    motionState.reduced = reduced;
    motionState.material = "iridescent";
    let scroller: Lenis | null = null;
    const touchLayout = matchMedia("(max-width: 900px), (pointer: coarse)");
    const configureScroll = () => {
      scroller?.destroy();
      scroller = touchLayout.matches
        ? null
        : new Lenis({ lerp: 0.12, smoothWheel: !reduced, autoRaf: false });
      lenis.current = scroller;
      if (touchLayout.matches) {
        motionState.pointerX = 0;
        motionState.pointerY = 0;
      }
    };
    configureScroll();
    touchLayout.addEventListener("change", configureScroll);

    let viewportWidth = innerWidth,
      viewportHeight = innerHeight;
    const scrollDist = document.querySelector(".scroll-distance") as HTMLElement;
    const measure = () => {
      viewportWidth = innerWidth;
      viewportHeight = el.clientHeight || innerHeight;
      // Preserve immersive pacing: base timeline on scroll-distance only,
      // so the editorial content below never stretches the 3D choreography.
      immersiveLimit.current = Math.max(
        1,
        scrollDist.clientHeight - viewportHeight
      );
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(scrollDist);

    const get = (s: string) => el.querySelector<HTMLElement>(s)!;
    const opening = get(".opening"),
      openingMark = get(".opening-mark"),
      workTitle = get(".work-title"),
      filmStage = get(".film-stage"),
      filmCards = [...el.querySelectorAll<HTMLElement>(".orbit-card")],
      filmCaptions = [...el.querySelectorAll<HTMLElement>(".film-caption")],
      mission = get(".mission"),
      vision = get(".vision"),
      light = get(".light-world"),
      cinema = get(".cinema"),
      cinemaType = get(".cinema-type"),
      feature = get(".feature-stage"),
      featureCards = [...el.querySelectorAll<HTMLElement>(".feature")],
      portrait = get(".portrait"),
      finale = get(".finale"),
      draft = get(".draft-grid"),
      finalMark = get(".final-mark"),
      finalName = get(".final-name"),
      progress = get(".reading-progress"),
      room = get(".room"),
      materialControl = get(".material-control"),
      counter = get(".scene-counter"),
      atmosphere = get(".atmosphere"),
      floor = get(".depth-floor");

    const visibility = (node: HTMLElement, alpha: number) => {
      node.style.opacity = String(alpha);
      node.style.visibility = alpha > 0.002 ? "visible" : "hidden";
      node.style.pointerEvents = alpha > 0.45 ? "auto" : "none";
      node.setAttribute("aria-hidden", alpha > 0.45 ? "false" : "true");
    };

    let frame = 0,
      lastChapter = -1,
      lastVideoScene = "",
      pointerX = 0,
      pointerY = 0,
      lastS = -1,
      lastWidth = 0,
      lastHeight = 0;

    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      if (document.hidden) return;
      scroller?.raf(time);
      const h = viewportHeight,
        w = viewportWidth,
        mobile = w <= 900,
        limit = immersiveLimit.current,
        s = clamp(scrollY / limit) * DURATION;
      motionState.s = s;

      // Once past the immersive scroll, hand over to the editorial flow.
      document.body.classList.toggle("past-experience", scrollY > limit + h * 0.15);

      if (
        Math.abs(s - lastS) < 0.00001 &&
        w === lastWidth &&
        h === lastHeight &&
        Math.abs(pointerX - motionState.pointerX) < 0.0005 &&
        Math.abs(pointerY - motionState.pointerY) < 0.0005
      )
        return;
      lastS = s;
      lastWidth = w;
      lastHeight = h;
      pointerX += (motionState.pointerX - pointerX) * 0.055;
      pointerY += (motionState.pointerY - pointerY) * 0.055;
      progress.style.transform = `scaleX(${s / DURATION})`;
      visibility(materialControl, 1 - range(s, mobile ? 0.45 : 3.7, mobile ? 0.8 : 4));
      counter.style.opacity = String(1 - range(s, 10.9, 11.3));
      visibility(opening, 1 - range(s, 0.22, 0.9));
      openingMark.style.transform = `translate(-50%,-50%) scale(${1 + range(s, 0, 1) * 0.12})`;
      visibility(workTitle, windowFade(s, 0.3, 3.95, 0.5));
      workTitle.style.transform = `translate(-50%,-50%) scale(${1 + range(s, 0.3, 4) * 0.13})`;
      visibility(filmStage, windowFade(s, 0.8, 4.05, 0.25));
      const cursor = range(s, 0.95, 3.55) * (films.length - 0.15) - 0.3;
      filmCards.forEach((card, i) => {
        const d = i - cursor,
          offset = d * (mobile ? w * 0.94 : w * 0.66),
          z = 55 - Math.abs(d) * 310,
          angle = -d * 32 + pointerX * 7,
          alpha = clamp(2.25 - Math.abs(d));
        card.style.transform = `translate(-50%,-50%) translate3d(${offset}px,${Math.sin(d * 0.8) * 38 - pointerY * 17}px,${z}px) rotateY(${angle}deg) rotateX(${-pointerY * 5}deg) rotateZ(${Math.sin(d * 0.7) * -4}deg)`;
        card.style.opacity = String(alpha);
        card.style.zIndex = String(20 - Math.round(Math.abs(d) * 3));
        visibility(filmCaptions[i], i === Math.round(cursor) ? 1 : 0);
      });
      let orbitLoad = 0,
        orbitPlay = 0;
      if (s > 0.3 && s < 4.1)
        films.forEach((_, i) => {
          const distance = Math.abs(i - cursor);
          if (distance < 2.4) orbitLoad |= 1 << i;
          if (distance < (mobile ? 1.25 : 1.7) && s > 0.8 && s < 4.05) orbitPlay |= 1 << i;
        });
      const nextVideoScene = {
        orbit: s > 0.3 && s < 4.1 ? Math.floor(cursor) : -2,
        orbitLoad,
        orbitPlay,
        feature: (s > 7 && s < 8.7 ? 1 : 0) | (s > 8 && s < 9.8 ? 2 : 0),
        portrait: s > 8.85 && s < 11.2,
      };
      const videoKey = `${orbitLoad}:${orbitPlay}:${nextVideoScene.feature}:${nextVideoScene.portrait}`;
      if (videoKey !== lastVideoScene) {
        lastVideoScene = videoKey;
        setVideoScene(nextVideoScene);
      }
      const white = range(s, 3.85, 4.15) * (1 - range(s, 6.35, 6.8));
      light.style.clipPath = `inset(${(1 - white) * 100}% 0 0 0)`;
      light.style.opacity = String(1 - range(s, 6.45, 6.85));
      visibility(mission, windowFade(s, 4.03, 4.85, 0.25));
      visibility(vision, windowFade(s, 4.62, 6.25, 0.35));
      vision.style.transform = `scale(${1 + range(s, 5.85, 6.4) * 0.2})`;
      visibility(cinema, windowFade(s, 6.5, 7.8, 0.4));
      cinemaType.style.transform = `translate(-50%,-50%) translateX(${(range(s, 6.5, 7.8) - 0.5) * -35}vw) scale(${1.45 - range(s, 6.5, 7.8) * 0.55})`;
      visibility(feature, windowFade(s, 7.25, 9.75, 0.35));
      featureCards.forEach((card, i) => {
        const p = range(s, 7.25 + i * 1.05, 8.35 + i * 1.05);
        visibility(card, windowFade(s, 7.25 + i * 1.05, 8.65 + i * 1.05, 0.3));
        card.style.transform = `perspective(1400px) translate3d(${(1 - smooth(clamp(p * 2))) * w * 0.55 - range(p, 0.7, 1) * w * 0.65}px,0,${-350 * (1 - smooth(clamp(p * 2)))}px) rotateY(${(1 - smooth(clamp(p * 2))) * -30 + range(p, 0.7, 1) * 22}deg)`;
      });
      const pp = range(s, 9.15, 10.15),
        exit = range(s, 10.4, 11.15);
      visibility(portrait, windowFade(s, 9.1, 11.2, 0.3));
      portrait.style.transform = `perspective(1200px) translate3d(${(1 - smooth(pp)) * w * 0.55}px,${-exit * h}px,0) scale(${0.35 + 0.65 * smooth(pp)}) rotateY(${(1 - smooth(pp)) * -28}deg)`;
      visibility(finale, range(s, 10.65, 11.45));
      draft.style.opacity = String(range(s, 11.2, 11.8) * (1 - range(s, 13.2, 13.8)));
      draft.style.transform = `scale(${1.3 - range(s, 11.2, 13.2) * 0.3})`;
      finalMark.style.opacity = String(range(s, 11.95, 12.8));
      finalMark.style.transform = `translateX(${(1 - range(s, 11.8, 12.9)) * w * 0.1}px)`;
      finalName.style.clipPath = `inset(0 ${(1 - range(s, 12, 13.4)) * 100}% 0 0)`;
      finalName.style.opacity = String(range(s, 12, 12.8));
      const depthAlpha = 1 - windowFade(s, 3.9, 6.8, 0.35);
      atmosphere.style.opacity = String(depthAlpha * 0.95);
      floor.style.opacity = String(
        (windowFade(s, 0, 4.1, 0.6) + windowFade(s, 6.7, 10, 0.6)) * 0.7
      );
      floor.style.transform = `perspective(800px) rotateX(67deg) rotateZ(${-pointerX * 5}deg) translateY(${Math.sin(s) * 35}px)`;
      el.style.setProperty("--scene-hue", `${Math.round(s * 22)}deg`);
      room.style.opacity = String(windowFade(s, 0.2, 4, 0.4) + windowFade(s, 6.8, 9.8, 0.6));
      room.style.transform = `perspective(1000px) rotateY(${Math.sin(s) * 12 + pointerX * 6}deg) rotateX(${-pointerY * 3}deg) scale(1.12)`;
      document.body.classList.toggle("is-light", s > 4.02 && s < 6.5);
      const chapter = s < 0.8 ? 0 : s < 4 ? 1 : s < 6.6 ? 2 : s < 11 ? 3 : 4;
      if (chapter !== lastChapter) {
        setActive(chapter);
        lastChapter = chapter;
      }
    };
    frame = requestAnimationFrame(animate);
    const timer = setTimeout(() => setReady(true), 900);
    const pointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || touchLayout.matches) return;
      motionState.pointerX = e.clientX / innerWidth - 0.5;
      motionState.pointerY = e.clientY / innerHeight - 0.5;
    };
    window.addEventListener("pointermove", pointer, { passive: true });
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      scroller?.destroy();
      touchLayout.removeEventListener("change", configureScroll);
      window.removeEventListener("resize", measure);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", pointer);
      document.body.classList.remove("is-light");
      document.body.classList.remove("past-experience");
    };
  }, []);

  useEffect(() => {
    if (menu || film !== null || photo !== null) lenis.current?.stop();
    else lenis.current?.start();
  }, [menu, film, photo]);

  function goScene(s: number) {
    setMenu(false);
    lenis.current?.start();
    const y = (s / DURATION) * immersiveLimit.current;
    if (lenis.current) lenis.current.scrollTo(y, { duration: 1.3 });
    else window.scrollTo({ top: y, behavior: motionState.reduced ? "auto" : "smooth" });
  }

  function goId(id: string) {
    setMenu(false);
    lenis.current?.start();
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis.current) lenis.current.scrollTo(target, { duration: 1.4 });
    else target.scrollIntoView({ behavior: motionState.reduced ? "auto" : "smooth" });
  }

  return (
    <>
      <Preloader done={ready} />

      <header>
        <a
          href="#home"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            goScene(0);
          }}
          aria-label="Allu Arjun home"
        >
          <Signature />
        </a>
        <nav aria-label="Main navigation">
          {siteNav.slice(1, 4).map((n) => (
            <button key={n.label} onClick={() => goId(n.target.id!)}>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="header-right">
          <button className="pill" onClick={() => goScene(1.12)}>
            Latest film <ArrowUpRight size={14} />
          </button>
          <button aria-label="Open navigation" className="menu" onClick={() => setMenu(true)}>
            <Menu size={20} />
          </button>
        </div>
      </header>

      <aside className="rail" aria-label="Scene navigation">
        {chapters.map((n, i) => (
          <button
            key={n.label}
            className={active === i ? "active" : ""}
            onClick={() => goScene(n.s)}
            aria-label={`Go to ${n.label}`}
          >
            <span>{n.label}</span>
            <i />
          </button>
        ))}
      </aside>

      {/* Architect signature — always visible while scrolling */}
      <div className="suhaas-side" aria-label="Designed and built by Suhaas">
        <SuhaasScript />
        <span className="suhaas-side-text">
          DESIGNED &amp; BUILT BY <b>SUHAAS</b>
          <em>DIGITAL EXPERIENCE</em>
        </span>
        <i className="suhaas-side-line" aria-hidden="true" />
      </div>
      <div className="suhaas-mobile" aria-label="By Suhaas">
        BY <b>SUHAAS</b>
      </div>
      <div className="suhaas-persistent" role="note" aria-label="Designed and built by Suhaas">
        <SuhaasScript />
        <span className="suhaas-persistent-text">
          DESIGNED &amp; BUILT BY <b>SUHAAS</b>
        </span>
      </div>

      <div className="scroll-distance" id="home" aria-hidden="true" />

      <main ref={root} className="experience" aria-label="Allu Arjun cinematic experience">
        <div className="reading-progress" />
        <div className="room" aria-hidden="true" />
        <div className="atmosphere" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="depth-floor" aria-hidden="true" />
        <div className="light-world" aria-hidden="true" />

        <section className="opening scene" aria-label="Opening">
          <div className="opening-mark">
            <Signature />
          </div>
          <p className="hero-credit">DESIGNED &amp; BUILT BY SUHAAS</p>
          <div className="opening-foot">
            <button onClick={() => goScene(1.1)}>
              <ArrowDown size={17} />
              SCROLL TO EXPLORE
            </button>
            <div>
              <h1>ALLU ARJUN</h1>
              <p>A world beyond the frame.</p>
            </div>
          </div>
        </section>

        <div className="work-title" aria-hidden="true">
          FILMS
        </div>
        <Sculpture />

        <section className="film-stage scene" aria-label="Selected films">
          <div className="orbit">
            {films.map((f, i) => (
              <article
                className={`orbit-card ${f.poster ? "poster-card" : ""}`}
                key={f.title}
                aria-label={f.title}
              >
                {f.poster && (
                  <span
                    className="poster-backdrop"
                    style={{ backgroundImage: `url(${f.image})` }}
                    aria-hidden="true"
                  />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.image}
                  alt={f.title === "RAAKA" ? "Allu Arjun — RAAKA first look" : `Allu Arjun — ${f.title}`}
                  style={{ objectPosition: f.position }}
                  loading={i > 1 ? "lazy" : "eager"}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0";
                  }}
                />
                <FilmLoop
                  src={f.loop}
                  title={f.title}
                  poster={f.image}
                  active={!menu && film === null && !!(videoScene.orbitPlay & (1 << i))}
                  preload={!!(videoScene.orbitLoad & (1 << i))}
                />
                <span className="film-edge" aria-hidden="true" />
                <button
                  className="card-open"
                  onClick={() => setFilm(f)}
                  aria-label={`Open ${f.title} details`}
                />
              </article>
            ))}
          </div>
          {films.map((f, i) => (
            <div className="film-caption" key={f.title}>
              <span>
                0{i + 1} / 06 <b>{f.tag}</b>
              </span>
              <h2 className={f.title.length > 20 ? "long-film-title" : ""}>{f.title}</h2>
              <p>{f.sub}</p>
              <button onClick={() => setFilm(f)}>
                View film <ArrowUpRight size={13} />
              </button>
            </div>
          ))}
        </section>

        <section className="mission scene" aria-label="Introduction">
          <span className="outline-label">THE ICON</span>
          <div className="mission-copy">
            <p>
              <span>Every character.</span>
              <br />
              <span>Every movement.</span>
              <br />
              <span>Unmistakably Allu Arjun.</span>
            </p>
            <small>From Indian cinema to hearts around the world.</small>
            <button className="scene-link" onClick={() => goId("about")}>
              Read the introduction <ArrowUpRight size={13} />
            </button>
          </div>
        </section>

        <section className="vision scene" aria-label="Vision">
          <span className="outline-label">VISION</span>
          <div className="vision-copy">
            <p>
              <span>Beyond the screen.</span>
              <br />
              <span>Beyond the expected.</span>
            </p>
            <small>One signature. Limitless worlds.</small>
            <br />
            <button className="scene-link dark" onClick={() => goId("journey")}>
              Follow the journey <ArrowUpRight size={13} />
            </button>
          </div>
          <div className="registration-crosses" aria-hidden="true">
            {Array.from({ length: 18 }, (_, i) => (
              <span key={i}>+</span>
            ))}
          </div>
        </section>

        <section className="cinema scene" aria-label="Cinema without limits">
          <div className="cinema-type" aria-hidden="true">
            CINEMA
            <br />
            CINEMA
            <br />
            CINEMA
          </div>
        </section>

        <section className="feature-stage scene" aria-label="Films in focus">
          {spotlights.map((f, i) => (
            <article className={`feature feature-${i}`} key={f.title}>
              <div className="feature-art" aria-label={f.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.image}
                  alt={`Allu Arjun in ${f.title}`}
                  style={{ objectPosition: f.position }}
                  loading="lazy"
                />
                <FilmLoop
                  src={f.loop}
                  title={f.title}
                  poster={f.image}
                  active={!menu && film === null && !!(videoScene.feature & (1 << i))}
                  preload={!!(videoScene.feature & (1 << i))}
                />
              </div>
              <div className="feature-copy">
                <span>{f.studio}</span>
                <h2>{f.title}</h2>
                <h3>{f.sub}</h3>
                <p>{f.description}</p>
                <button onClick={() => setFilm(f as Film)}>
                  Open film details <ArrowUpRight size={13} />
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="portrait scene" aria-label="Portrait">
          <div className="portrait-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/allu-qbik-1.jpg" alt="Allu Arjun in a black suit" loading="lazy" />
            <FilmLoop
              src="/videos/allu-portrait-loop.mp4"
              title="Allu Arjun"
              poster="/images/allu-qbik-1.jpg"
              active={!menu && film === null && videoScene.portrait}
              preload={videoScene.portrait}
            />
          </div>
          <div className="portrait-title">
            <Signature />
            <h2>ALLU ARJUN</h2>
            <p>The man. The moments. The signature.</p>
            <button className="scene-link light" onClick={() => goId("gallery")}>
              Open visual archive <ArrowUpRight size={13} />
            </button>
          </div>
          <div className="portrait-border" />
        </section>

        <footer className="finale scene" aria-label="Finale">
          <div className="draft-grid" aria-hidden="true">
            <svg viewBox="0 0 1440 900" preserveAspectRatio="none">
              {Array.from({ length: 24 }, (_, i) => (
                <path key={i} d={`M${i * 65} 0V900 M0 ${i * 45}H1440`} />
              ))}
              <path d="M85 720 355 140 390 720 80 450H1400 M600 720 785 140 925 720" />
            </svg>
          </div>
          <div className="final-brand">
            <Signature className="final-mark" />
            <div className="final-name">
              ALLU
              <br />
              ARJUN
            </div>
          </div>
          <div className="finale-suhaas">
            <SuhaasScript />
            <p>
              DESIGNED &amp; BUILT BY <b>SUHAAS</b>
            </p>
          </div>
          <div className="footer-bottom">
            <div>
              <button onClick={() => goScene(0)}>Top</button>
              <button onClick={() => goScene(1.1)}>Films</button>
              <button onClick={() => goId("legacy")}>Legacy</button>
            </div>
            <a
              href="https://www.instagram.com/alluarjunonline/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram <ArrowUpRight size={15} />
            </a>
            <p>
              Independent fan tribute.
              <br />
              Imagery and trademarks belong to their respective owners.
            </p>
          </div>
        </footer>

        <div className="scene-counter" aria-hidden="true">
          {String(active + 1).padStart(2, "0")} — 05
        </div>
        <div className="material-control">
          <div className="axis" aria-hidden="true">
            <i />
            <i />
            <i />
            <b>X</b>
            <b>Y</b>
            <b>Z</b>
          </div>
          <div className="swatches">
            {["chrome", "iridescent"].map((m) => (
              <button
                key={m}
                aria-label={`${m} material`}
                aria-pressed={finish === m}
                className={`${m} ${finish === m ? "selected" : ""}`}
                onClick={() => {
                  setFinish(m);
                  motionState.material = m;
                }}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Editorial flow: full accessible story below the immersive canvas */}
      <Editorial onFilm={setFilm} onPhoto={setPhoto} />

      <FilmDetailsDialog film={film} onClose={() => setFilm(null)} />
      <GalleryViewer
        items={gallery}
        index={photo}
        onClose={() => setPhoto(null)}
        onNav={setPhoto}
      />

      <Dialog open={menu} onOpenChange={setMenu}>
        <DialogContent className="nav-dialog">
          <DialogTitle className="sr-only">Explore Allu Arjun</DialogTitle>
          <DialogDescription className="sr-only">Jump to a scene</DialogDescription>
          <Signature />
          {chapters.map((n, i) => (
            <button onClick={() => goScene(n.s)} key={n.label}>
              <span>0{i + 1}</span>
              {n.label}
              <ArrowUpRight />
            </button>
          ))}
          <p className="nav-dialog-sub">FULL STORY</p>
          {siteNav.map((n) => (
            <button
              onClick={() =>
                n.target.s !== undefined ? goScene(n.target.s) : goId(n.target.id!)
              }
              key={`site-${n.label}`}
              className="nav-dialog-small"
            >
              <span>→</span>
              {n.label}
              <ArrowUpRight />
            </button>
          ))}
          <div className="nav-dialog-sign">
            <SuhaasScript />
            <p>
              DESIGNED &amp; BUILT BY <b>SUHAAS</b>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
