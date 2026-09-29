import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./cinematic.css";

export const viewport: Viewport = {width:"device-width",initialScale:1,viewportFit:"cover",themeColor:"#070709"};

export const metadata: Metadata = {
  metadataBase: new URL("https://allu-arjun-cinematic.example.com"),
  title: {
    default: "Allu Arjun — Beyond the Frame | Cinematic Digital Experience",
    template: "%s | Allu Arjun — Beyond the Frame",
  },
  description:
    "A premium cinematic digital experience for Allu Arjun — films, iconic characters, journey, achievements, visual archive and video loops. Designed & built by Suhaas. An independent fan tribute.",
  keywords: [
    "Allu Arjun",
    "Pushpa",
    "Pushpa 2",
    "RAAKA",
    "Ala Vaikunthapurramuloo",
    "Sarrainodu",
    "Telugu cinema",
    "cinematic website",
    "Suhaas",
  ],
  authors: [{ name: "Suhaas" }],
  creator: "Suhaas",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Allu Arjun — Beyond the Frame",
    title: "Allu Arjun — Beyond the Frame",
    description:
      "Cinema, architecture, 3D and editorial design — a premium tribute to Allu Arjun. Designed & built by Suhaas.",
    images: [
      {
        url: "/images/raaka-firstlook.jpg",
        width: 1200,
        height: 630,
        alt: "Allu Arjun — RAAKA first look",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Allu Arjun — Beyond the Frame",
    description:
      "A cinematic digital museum for Allu Arjun. Designed & built by Suhaas.",
    images: ["/images/raaka-firstlook.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Allu Arjun — Beyond the Frame",
    description:
      "A premium cinematic digital experience for Allu Arjun, designed & built by Suhaas.",
    author: { "@type": "Person", name: "Suhaas" },
    about: {
      "@type": "Person",
      name: "Allu Arjun",
      jobTitle: "Actor",
      nationality: "Indian",
    },
  };
  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#about" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
