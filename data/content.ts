export type Film = {
  title: string;
  sub: string;
  tag: string;
  year: string;
  character: string;
  director: string;
  studio: string;
  image: string;
  loop: string;
  position: string;
  poster: boolean;
  description: string;
};

export const films: Film[] = [
  {
    title: "RAAKA",
    sub: "ALLU ARJUN × ATLEE",
    tag: "UPCOMING / SUN PICTURES",
    year: "Upcoming",
    character: "To be revealed",
    director: "Atlee",
    studio: "SUN PICTURES",
    image: "/images/raaka-firstlook.jpg",
    loop: "/videos/raaka-loop.mp4",
    position: "50% 29%",
    poster: false,
    description:
      "The next chapter. Allu Arjun joins Atlee for RAAKA — a large-scale collaboration currently in production. First-look imagery signals a mythic, larger-than-life transformation.",
  },
  {
    title: "PUSHPA 2",
    sub: "THE RULE",
    tag: "2024 / A SUKUMAR FILM",
    year: "2024",
    character: "Pushpa Raj",
    director: "Sukumar",
    studio: "MYTHRI MOVIE MAKERS",
    image: "/images/pushpa-poster-red.jpg",
    loop: "/videos/pushpa-regal.mp4",
    position: "50% 50%",
    poster: false,
    description:
      "Pushpa Raj returns. Sukumar's sequel expands the red-sanders saga into a nationwide phenomenon — attitude, dialect and screen presence pushed to full scale.",
  },
  {
    title: "DJ",
    sub: "DUVVADA JAGANNADHAM",
    tag: "2017 / A HARISH SHANKAR FILM",
    year: "2017",
    character: "Duvvada Jagannadham / DJ",
    director: "Harish Shankar",
    studio: "SRI VENKATESWARA CREATIONS",
    image: "/images/dj-alternate.jpg",
    loop: "/videos/dj-hd-loop.mp4",
    position: "50% 50%",
    poster: false,
    description:
      "Two sides of one man. A traditional Brahmin cook by day, a vigilante by instinct — Allu Arjun balances comedy, action and dance in Harish Shankar's entertainer.",
  },
  {
    title: "SARRAINODU",
    sub: "ALLU ARJUN AS GANA",
    tag: "2016 / A BOYAPATI SREENU FILM",
    year: "2016",
    character: "Gana",
    director: "Boyapati Sreenu",
    studio: "GEETHA ARTS",
    image: "/images/sarrainodu-poster.jpg",
    loop: "/videos/sarrainodu-hd-loop.mp4",
    position: "50% 50%",
    poster: false,
    description:
      "Allu Arjun as Gana. Boyapati Sreenu's action drama pairs raw intensity with Thaman S's score — one of the defining mass-action performances of the decade.",
  },
  {
    title: "ALA VAIKUNTHAPURRAMULOO",
    sub: "ALLU ARJUN × TRIVIKRAM",
    tag: "2020 / GEETHA ARTS · HAARIKA & HASSINE",
    year: "2020",
    character: "Bantu",
    director: "Trivikram Srinivas",
    studio: "GEETHA ARTS · HAARIKA & HASSINE",
    image: "/images/ala-vaikunthapurramuloo-poster.jpg",
    loop: "/videos/ala-vaikunthapurramuloo-hd-loop.mp4",
    position: "50% 50%",
    poster: true,
    description:
      "A modern family classic. Trivikram's elegant drama pairs Allu Arjun's charm and timing with chartbuster music — a career-defining blockbuster.",
  },
  {
    title: "RACE GURRAM",
    sub: "ALLU ARJUN AS LUCKY",
    tag: "2014 / A SURENDER REDDY FILM",
    year: "2014",
    character: "Lucky",
    director: "Surender Reddy",
    studio: "SRI LAKSHMI NARASIMHA PRODUCTIONS",
    image: "/images/race-gurram-poster.jpg",
    loop: "/videos/race-gurram-hd-loop.mp4",
    position: "50% 50%",
    poster: true,
    description:
      "Allu Arjun as Lucky — a carefree charmer drawn into his brother's world of duty and conflict. A perfect blend of comedy, action and star energy.",
  },
];

export type TimelineItem = {
  year: string;
  event: string;
  description: string;
};

export const timeline: TimelineItem[] = [
  {
    year: "2003",
    event: "Debut — Gangotri",
    description: "Lead debut under K. Raghavendra Rao. A classical launch that introduced a new-generation star.",
  },
  {
    year: "2004",
    event: "Breakthrough — Arya",
    description: "Sukumar's Arya redefined the romantic hero. Style, attitude and music became his signature.",
  },
  {
    year: "2008–2010",
    event: "Parugu · Vedam",
    description: "Critical acclaim for emotional depth — Filmfare Best Actor Telugu wins that proved range beyond stardom.",
  },
  {
    year: "2014–2016",
    event: "Race Gurram · Sarrainodu",
    description: "Back-to-back mass blockbusters. Lucky and Gana cemented his command over action-entertainers.",
  },
  {
    year: "2020–2021",
    event: "Ala Vaikunthapurramuloo · Pushpa",
    description: "An industry-shaking run — a family classic followed by the pan-Indian phenomenon Pushpa: The Rise.",
  },
  {
    year: "2023",
    event: "National Honour",
    description: "National Film Award for Best Actor for Pushpa: The Rise — a historic first for Telugu cinema in this category.",
  },
  {
    year: "2024 →",
    event: "Pushpa 2 · RAAKA",
    description: "The Rule conquers the box office. Next: RAAKA with Atlee — the scale only grows.",
  },
];

export type Award = {
  value: string;
  label: string;
  note: string;
};

export const awards: Award[] = [
  {
    value: "National",
    label: "Film Award — Best Actor",
    note: "Pushpa: The Rise · 69th National Film Awards",
  },
  {
    value: "Filmfare",
    label: "Awards South — Best Actor Telugu",
    note: "Parugu · Vedam · Race Gurram · Ala Vaikunthapurramuloo",
  },
  {
    value: "Nandi",
    label: "Special Jury · Best Actor",
    note: "State honours for Arya, Parugu and Vedam eras",
  },
  {
    value: "SIIMA",
    label: "Best Actor recognitions",
    note: "Multiple South Indian International Movie Awards",
  },
];

export type Character = {
  name: string;
  film: string;
  year: string;
  image: string;
  description: string;
};

export const characters: Character[] = [
  {
    name: "Pushpa Raj",
    film: "Pushpa",
    year: "2021",
    image: "/images/pushpa-poster-red.jpg",
    description: "The coolie who became a syndicate. Slanted shoulder, raw dialect — an icon recognised across India.",
  },
  {
    name: "Bantu",
    film: "Ala Vaikunthapurramuloo",
    year: "2020",
    image: "/images/ala-vaikunthapurramuloo-poster.jpg",
    description: "Charm with precision. Comedy timing, dance and emotion in perfect balance.",
  },
  {
    name: "Gana",
    film: "Sarrainodu",
    year: "2016",
    image: "/images/sarrainodu-poster.jpg",
    description: "Short temper, large heart. Pure mass energy distilled into a single role.",
  },
  {
    name: "DJ",
    film: "Duvvada Jagannadham",
    year: "2017",
    image: "/images/dj-alternate.jpg",
    description: "Tradition outside, rebellion inside. Dual shades played with effortless switch.",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export const gallery: GalleryItem[] = [
  { src: "/images/raaka-firstlook.jpg", alt: "Allu Arjun — RAAKA first look", caption: "RAAKA — First look" },
  { src: "/images/pushpa-poster-red.jpg", alt: "Allu Arjun — Pushpa", caption: "Pushpa — The Rule" },
  { src: "/images/pushpa-cinemaexpress.jpg", alt: "Allu Arjun — Pushpa still", caption: "Pushpa — Cinema still" },
  { src: "/images/pushpa-festival.jpg", alt: "Allu Arjun — Pushpa festival look", caption: "Pushpa — Festival frame" },
  { src: "/images/pushpa-street.jpg", alt: "Allu Arjun — Pushpa street frame", caption: "Pushpa — Street frame" },
  { src: "/images/dj-alternate.jpg", alt: "Allu Arjun in DJ", caption: "DJ — Alternate look" },
  { src: "/images/sarrainodu-poster.jpg", alt: "Allu Arjun in Sarrainodu", caption: "Sarrainodu — Poster" },
  { src: "/images/ala-vaikunthapurramuloo-poster.jpg", alt: "Allu Arjun in Ala Vaikunthapurramuloo", caption: "Ala Vaikunthapurramuloo" },
  { src: "/images/race-gurram-poster.jpg", alt: "Allu Arjun in Race Gurram", caption: "Race Gurram" },
  { src: "/images/allu-qbik-1.jpg", alt: "Allu Arjun in a black suit", caption: "Portrait — Black suit" },
  { src: "/images/allu-qbik-2.jpg", alt: "Allu Arjun portrait", caption: "Portrait — Studio" },
];

export const spotlights = [
  {
    ...films[2],
    studio: "SRI VENKATESWARA CREATIONS",
    description:
      "Allu Arjun brings two sides of Duvvada Jagannadham to life in Harish Shankar's action entertainer.",
  },
  {
    ...films[3],
    studio: "GEETHA ARTS",
    description:
      "Allu Arjun as Gana. Boyapati Sreenu's Sarrainodu brings together action, attitude and the music of Thaman S.",
  },
];
