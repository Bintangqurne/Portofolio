import type { Metadata } from "next";
import { FreeformGallery } from "./components/FreeformGallery";
import type { GalleryItem } from "./components/gallery-types";

export const metadata: Metadata = {
  title: "Gallery — Bintang Qurne",
  description: "A tactile archive of people, places, and moments worth remembering.",
};

const galleryItems: GalleryItem[] = [
  {
    image: "/images/gallery/fatma.jpeg",
    code: "FATM",
    title: "Fatma",
    description:
      "Some people arrive quietly and make everyday life feel lighter. I am grateful I met Fatma—her warm smile, generous heart, and steady encouragement mean more to me than she probably knows. I hope she remains part of the chapters ahead.",
    category: "Personal",
    year: "",
    aspectRatio: 960 / 1280,
  },
  {
    image: "/images/gallery/coreTraining.jpeg",
    code: "CORE4",
    title: "Core Training",
    description:
      "A memory from Core Training in my fourth semester—a genuinely fun chapter, even if I eventually chose to step away. Some experiences are still worth keeping for the people, laughter, and lessons they leave behind.",
    category: "Training",
    year: "",
    aspectRatio: 1200 / 1600,
  },
  {
    image: "/images/gallery/jatimPark.jpeg",
    code: "JTPK",
    title: "Jatim Park",
    description:
      "A holiday at Jatim Park, right before convincing myself to try one of the more intimidating rides. Equal parts curiosity, nerves, and the kind of fun that makes a trip memorable.",
    category: "Travel",
    year: "",
    aspectRatio: 864 / 1296,
  },
  {
    image: "/images/gallery/kemenangan.jpeg",
    code: "UNO1",
    title: "The UNO Victory",
    description:
      "If I remember correctly, this was after a ruthless UNO session. I kept winning, everyone else lost, and somehow my face was the only one that escaped without a single mark—a completely fair and unbiased victory.",
    category: "Games",
    year: "",
    aspectRatio: 2340 / 4160,
  },
  {
    image: "/images/gallery/makanLomba.jpeg",
    code: "BDNG",
    title: "Bandung Team Dinner",
    description:
      "During a competition trip to Bandung, my older brother treated the whole team to a meal. We did not bring home the win, but the food, laughter, and shared experience made the trip worthwhile.",
    category: "Competition",
    year: "",
    aspectRatio: 3024 / 4032,
  },
  {
    image: "/images/gallery/myAktivis%20.jpeg",
    code: "RND1",
    title: "My R&D Activists",
    description:
      "As part of the R&D management team, this was the beginning of having my own group of activists. We met for a meal before I left for a mobility program in Jakarta—a small send-off for a new team and a new chapter.",
    category: "Community",
    year: "",
    aspectRatio: 899 / 1599,
  },
  {
    image: "/images/gallery/ndaki.jpeg",
    code: "HIKE",
    title: "First Hike",
    description:
      "My first time hiking, shared with friends and powered by equal parts excitement and exhaustion. Someone threw up, everyone got tired, and somehow that made the whole chaotic experience even more unforgettable.",
    category: "Adventure",
    year: "",
    aspectRatio: 960 / 1280,
  },
  {
    image: "/images/gallery/sirkelAwal.jpeg",
    code: "CIRC",
    title: "The Beginning of Our Circle",
    description:
      "One of the earliest memories of our circle: we simply decided to meet at a café and spend time together. Nothing elaborate—just the beginning of a friendship that would grow through many more moments.",
    category: "Friendship",
    year: "",
    aspectRatio: 864 / 1152,
  },
  {
    image: "/images/gallery/softeng.jpeg",
    code: "IOT1",
    title: "Software Engineering Project",
    description:
      "A software engineering project built by Bintang, Jojo, Rayner, Adi, Andreas, and Eldwin. We created an IoT waste system that automatically distinguishes plastic from other materials, along with an attendance and tracking system for the people responsible for collecting the waste.",
    category: "Engineering",
    year: "",
    aspectRatio: 1040 / 585,
  },
  {
    image: "/images/gallery/waktuLomba.jpeg",
    code: "BOOTH",
    title: "Bandung Photobooth",
    description:
      "A photobooth moment after our competition in Bandung. We may not have won, but the trip gave us a fun story, a shared challenge, and a memory worth keeping.",
    category: "Competition",
    year: "",
    aspectRatio: 1066 / 1600,
  },
  {
    image: "/images/gallery/welcomingAktivis.jpeg",
    code: "BNCC",
    title: "Welcoming Activists",
    description:
      "Taken when I had just been accepted as a BNCC activist—the beginning of a chapter filled with new people, responsibilities, and experiences I had yet to imagine.",
    category: "Community",
    year: "",
    aspectRatio: 4160 / 2340,
  },
];

export default function GalleryPage() {
  return (
    <main style={{ width: "100%", height: "100dvh", minHeight: 520 }}>
      <FreeformGallery images={galleryItems} />
    </main>
  );
}
