import Link from "next/link";

export default function NotFound() {
  return (
    <main className="ed-error" aria-labelledby="nf-title">
      <p className="ed-eyebrow">404 — LOST FRAME</p>
      <h1 id="nf-title">This scene didn&apos;t make the cut.</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="ed-link">
        ← Back to the experience
      </Link>
    </main>
  );
}
