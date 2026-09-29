"use client";

import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Film } from "@/data/content";

export function FilmDetailsDialog({
  film,
  onClose,
}: {
  film: Film | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!film} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="film-dialog cinematic-dialog">
        {film && (
          <>
            <DialogTitle>{film.title}</DialogTitle>
            <DialogDescription>
              {film.year} · {film.character} · Dir. {film.director}
            </DialogDescription>
            <div className="film-dialog-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={film.image} alt={`Allu Arjun — ${film.title}`} loading="lazy" />
            </div>
            <dl className="film-dialog-meta">
              <div>
                <dt>Character</dt>
                <dd>{film.character}</dd>
              </div>
              <div>
                <dt>Director</dt>
                <dd>{film.director}</dd>
              </div>
              <div>
                <dt>Studio</dt>
                <dd>{film.studio}</dd>
              </div>
            </dl>
            <p className="film-dialog-desc">{film.description}</p>
            <a
              href={`https://www.youtube.com/results?search_query=Allu+Arjun+${encodeURIComponent(
                film.title
              )}+trailer`}
              target="_blank"
              rel="noreferrer"
            >
              Watch trailer <ArrowUpRight size={15} />
            </a>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function GalleryViewer({
  items,
  index,
  onClose,
  onNav,
}: {
  items: { src: string; alt: string; caption: string }[];
  index: number | null;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  const current = index === null ? null : items[index];
  return (
    <Dialog open={index !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="gallery-dialog cinematic-dialog">
        <DialogTitle className="sr-only">Visual archive viewer</DialogTitle>
        <DialogDescription className="sr-only">
          Fullscreen gallery image
        </DialogDescription>
        {current && (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.src} alt={current.alt} />
            <figcaption>
              <span>{current.caption}</span>
              <span>
                {index! + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        )}
        <div className="gallery-dialog-controls">
          <button
            onClick={() =>
              onNav((index! - 1 + items.length) % items.length)
            }
            aria-label="Previous image"
          >
            ← Prev
          </button>
          <button onClick={onClose} aria-label="Close viewer">
            <X size={16} /> Close
          </button>
          <button
            onClick={() => onNav((index! + 1) % items.length)}
            aria-label="Next image"
          >
            Next →
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function useCinematicDialogs() {
  const [film, setFilm] = useState<Film | null>(null);
  const [photo, setPhoto] = useState<number | null>(null);
  return { film, setFilm, photo, setPhoto };
}
