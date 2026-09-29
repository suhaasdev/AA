import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Allu Arjun — Beyond the Frame",
    short_name: "Allu Arjun",
    description: "Cinematic digital experience. Designed & built by Suhaas.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#070709",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
