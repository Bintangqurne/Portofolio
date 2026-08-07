"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

type ImageItem = {
  src: string;
  title: string;
  tag: string;
  location: string;
  link: string;
  heightClass: string;
  selfClass: string;
  offsetClass: string;
};

// Card individual dipisah jadi komponen sendiri supaya tiap card bisa punya
// useTransform/useSpring-nya sendiri (hooks per-item) tanpa melanggar rules of hooks.
function GalleryCard({
  img,
  trackX,
  sectionEntranceProgress,
  cardLeft,
  cardWidth,
  viewportWidth,
  isFirst,
  isLast,
  innerRef,
}: {
  img: ImageItem;
  trackX: MotionValue<number>;
  sectionEntranceProgress: MotionValue<number>;
  cardLeft: number;
  cardWidth: number;
  viewportWidth: number;
  isFirst: boolean;
  isLast: boolean;
  innerRef: (el: HTMLAnchorElement | null) => void;
}) {
  // Progress masuknya card ke layar (0 = baru nongol dari kanan, 1 = udah ter-reveal penuh),
  // dihitung dari cardLeft (posisi asli di track, gak kepengaruh transform) + posisi track saat ini (trackX).
  const rawEntrance = useTransform(trackX, (xv) => {
    if (!viewportWidth || !cardWidth) return 0;

    const screenCenter = cardLeft + cardWidth / 2 + xv;
    const startPos = viewportWidth * 1.02; // card baru nongol dari kanan -> progress 0
    // Untuk card terakhir/semua card, pastikan selesai ter-reveal penuh (1) saat baru masuk layar
    const endPos = isLast
      ? Math.min(viewportWidth * 0.82, viewportWidth - cardWidth / 2 + 60)
      : viewportWidth * 0.70; // card nyampe area kanan/tengah layar -> progress 1
    const raw = (startPos - screenCenter) / (startPos - endPos);
    return Math.min(Math.max(raw, 0), 1);
  });

  // Untuk card pertama (CreditGuard): animasi ter-reveal dari 0 ke 1 saat section bergeser naik dari bawah viewport
  // sampai terkunci pas di posisi sticky (top-0). Pas section terkunci sticky, gambar pertama SUDAH TER-RENDER FULL 100%.
  const firstCardEntrance = useTransform(sectionEntranceProgress, [0.3, 0.95], [0, 1]);

  const entrance = useSpring(isFirst ? firstCardEntrance : rawEntrance, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.001,
  });

  // ── Smooth Leftward Shift Per-Komponen ──
  // Saat scroll horizontal berlanjut, seluruh komponen kartu bergeser halus ke kiri (+28px -> -28px)
  const cardShiftRaw = useTransform(trackX, (xv) => {
    if (!viewportWidth || !cardWidth) return 0;
    const screenCenter = cardLeft + cardWidth / 2 + xv;
    const norm = (viewportWidth - screenCenter) / viewportWidth;
    const clamped = Math.min(Math.max(norm, 0), 1);
    return (0.5 - clamped) * 56;
  });

  const cardShiftX = useSpring(cardShiftRaw, { stiffness: 50, damping: 20, restDelta: 0.001 });

  // ── Horizontal Split-mask reveal ──
  // Layer ATAS (setengah atas gambar): reveal dari KIRI ke KANAN.
  // bottom dikunci 49% (bukan 50%) biar overlap dikit di tengah, mencegah seam tipis.
  const topClipPath = useTransform(
    entrance,
    [0, 1],
    ["inset(0% 100% 49% 0%)", "inset(0% 0% 49% 0%)"]
  );
  // Layer BAWAH (setengah bawah gambar): reveal dari KANAN ke KIRI.
  // top dikunci 49% (bukan 50%) biar overlap dikit di tengah, mencegah seam yang sama.
  const bottomClipPath = useTransform(
    entrance,
    [0, 1],
    ["inset(49% 0% 0% 100%)", "inset(49% 0% 0% 0%)"]
  );

  return (
    <motion.a
      ref={innerRef}
      href={img.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: cardShiftX }}
      className={`shrink-0 space-y-3 cursor-pointer group block ${img.selfClass} ${img.offsetClass}`}
    >
      <div
        className={`relative ${img.heightClass} aspect-[1920/893] overflow-hidden bg-[#050609] border border-white/10`}
      >
        {/* Layer ATAS — setengah atas gambar, reveal dari KIRI ke KANAN */}
        <motion.div
          className="absolute inset-0"
          style={{ clipPath: topClipPath, WebkitClipPath: topClipPath }}
        >
          <Image
            src={img.src}
            alt={img.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
          />
        </motion.div>

        {/* Layer BAWAH — setengah bawah gambar, reveal dari KANAN ke KIRI */}
        <motion.div
          className="absolute inset-0"
          style={{ clipPath: bottomClipPath, WebkitClipPath: bottomClipPath }}
        >
          <Image
            src={img.src}
            alt=""
            fill
            aria-hidden="true"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
          />
        </motion.div>
      </div>
      <div className="font-fragment text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors uppercase tracking-wider whitespace-nowrap flex items-center justify-between">
        <span>{img.location}</span>
        <span className="text-[#81ff28] opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">VISIT ↗</span>
      </div>
    </motion.a>
  );
}

export default function ImageGallerySection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardElRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Ukuran track (total lebar row gambar) & viewport, dipakai buat ngitung jarak geser horizontal
  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  // Posisi & lebar asli tiap card (offsetLeft/offsetWidth -> gak kepengaruh transform),
  // dipakai buat ngitung kapan tiap card "masuk" ke layar pas discroll.
  const [cardMetrics, setCardMetrics] = useState<{ left: number; width: number }[]>([]);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setTrackWidth(trackRef.current.scrollWidth);
      setViewportWidth(window.innerWidth);
      setCardMetrics(
        cardElRefs.current.map((el) => ({
          left: el?.offsetLeft ?? 0,
          width: el?.offsetWidth ?? 0,
        }))
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Progress saat ImageGallerySection bergeser naik dari bawah viewport hingga pas mengunci di sticky top-0
  const { scrollYProgress: sectionEntranceProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start start"],
  });

  // Jarak yang perlu digeser: total lebar track dikurangi lebar layar (sisa yang "nongol" di kanan)
  const scrollDistance = Math.max(trackWidth - viewportWidth, 0);

  const x = useTransform(scrollYProgress, (v) => -v * scrollDistance);

  // Tinggi wrapper section disesuaikan proporsional sama panjang track
  const wrapperHeightVh = viewportWidth
    ? Math.max(200, (scrollDistance / viewportWidth) * 100 + 100)
    : 250;

  // Data gambar — semua source image punya rasio ASLI yang sama (1920x893), dipakai fixed
  // lewat aspect-[1920/893] di container biar gak distorsi. Variasi besar-kecil dikontrol
  // lewat `heightClass` (width ikut proporsional otomatis karena aspect fixed).
  // Posisi vertikal tiap card dikontrol lewat `translate-y-[...]` (bukan cuma self-start/center/end),
  // jadi bisa naik/turun bebas dari titik tengah, gak kebatas cuma 3 posisi.
  // Nilai dibikin variatif & gak berpola (naik-turun gantian, beda jarak tiap kali) biar kerasa organik.
  const images: ImageItem[] = [
    {
      src: "/images/projects/creditGuard.png",
      title: "CreditGuard",
      tag: "Next.js • Feature Models • AI",
      location: "credit.qurne.com",
      link: "https://credit.qurne.com",
      heightClass: "h-[42vh] sm:h-[60vh]", // besar
      selfClass: "self-center",
      // aman: max sm ~10vh (60vh tinggi + py 10vh), mobile max ~21vh (42vh tinggi + py 8vh)
      offsetClass: "-translate-y-[12vh] sm:-translate-y-[8vh]", // naik, tapi masih dalam batas aman
    },
    {
      src: "/images/projects/hive.png",
      title: "Hive",
      tag: "AWS Full Stack • Collaboration",
      location: "hive.qurne.com",
      link: "https://hive.qurne.com",
      heightClass: "h-[26vh] sm:h-[38vh]", // kecil
      selfClass: "self-center",
      // aman: max sm ~21vh (38vh tinggi + py 10vh), mobile max ~29vh
      offsetClass: "translate-y-[16vh] sm:translate-y-[18vh]", // turun jauh, masih aman
    },
    {
      src: "/images/projects/holybin.png",
      title: "HolyBin",
      tag: "IoT Integration • Firebase",
      location: "holybin.qurne.com",
      link: "https://holybin.qurne.com",
      heightClass: "h-[36vh] sm:h-[52vh]", // sedang-besar
      selfClass: "self-center",
      // aman: max sm ~14vh (52vh tinggi + py 10vh), mobile max ~24vh
      offsetClass: "-translate-y-[8vh] sm:-translate-y-[10vh]", // dikit naik, aman
    },
    {
      src: "/images/projects/tox21.png",
      title: "Tox21",
      tag: "Toxicity AI • Predictive Analysis",
      location: "tox21.qurne.com",
      link: "https://tox21.qurne.com",
      heightClass: "h-[30vh] sm:h-[44vh]", // sedang-kecil
      selfClass: "self-center",
      // aman: max sm ~18vh (44vh tinggi + py 10vh), mobile max ~27vh
      offsetClass: "translate-y-[10vh] sm:translate-y-[14vh]", // turun sedang, aman
    },
    {
      src: "/images/projects/technoscape.png",
      title: "TechnoScape",
      tag: "PM & Architect • FE/BE & Rate Limit",
      location: "technoscape.id",
      link: "https://technoscape.id",
      heightClass: "h-[34vh] sm:h-[48vh]", // sedang
      selfClass: "self-center",
      // aman: max sm ~16vh (48vh tinggi + py 10vh), mobile max ~25vh
      offsetClass: "-translate-y-[14vh] sm:-translate-y-[13vh]", // naik, aman
    },
  ];

  return (
    <section
      ref={targetRef}
      style={{ height: `${wrapperHeightVh}vh` }}
      className="relative w-full bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center py-[8vh] sm:py-[10vh]">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max shrink-0 items-center gap-16 sm:gap-28 md:gap-36 pl-6 sm:pl-12 lg:pl-[calc(max(3rem,(100vw-1280px)/2+48px))] pr-12 sm:pr-24"
        >
          {images.map((img, i) => (
            <GalleryCard
              key={img.location + i}
              img={img}
              trackX={x}
              sectionEntranceProgress={sectionEntranceProgress}
              cardLeft={cardMetrics[i]?.left ?? 0}
              cardWidth={cardMetrics[i]?.width ?? 0}
              viewportWidth={viewportWidth}
              isFirst={i === 0}
              isLast={i === images.length - 1}
              innerRef={(el) => {
                cardElRefs.current[i] = el;
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}