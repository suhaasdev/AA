"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="ed-error" aria-labelledby="err-title">
      <p className="ed-eyebrow">INTERMISSION</p>
      <h1 id="err-title">Something broke the reel.</h1>
      <button onClick={reset} className="ed-link">
        ↻ Try this scene again
      </button>
    </main>
  );
}
