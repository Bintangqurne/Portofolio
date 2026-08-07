import Image from "next/image";

export default function ManifestoSection() {
  const cities = [
    { name: "New York", year: "2025" },
    { name: "Paris", year: "2023" },
    { name: "Singapore", year: "2014" },
    { name: "Osaka", year: "2019" },
    { name: "Brighton", year: "2018" },
    { name: "Sydney", year: "2021" },
  ];

  const modules = [
    {
      code: "MODULE — A.1",
      text: "A section of studies in raw structure. Textures tested under pressure. Forms pushed until they reveal intention.",
    },
    {
      code: "MODULE — A.2",
      text: "Experiments with physical materials and controlled distortion. Where touch, weight, and failure shape the outcome.",
    },
    {
      code: "MODULE — A.3",
      text: "Objects examined through repetition. Small shifts creating new patterns. A record of how matter responds to motion.",
    },
    {
      code: "MODULE — A.4",
      text: "Fragments from ongoing investigations. Part prototypes, part unresolved ideas. Work that stays honest by not pretending to be finished.",
    },
  ];

  return (
    <section className="w-full bg-[#0d0d0d] py-16 text-white font-figtree">
      <div className="mx-auto max-w-[1400px] px-6 space-y-20">
        {/* Section 1: ART IS A CONTROLLED INTERRUPTION */}
        <div className="space-y-8 border-b border-editorial pb-16">
          <div className="font-fragment text-xs text-neutral-500 uppercase tracking-widest">
            VERTICAL // STATEMENT
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-tight tracking-tight max-w-5xl">
            ART IS A CONTROLLED INTERRUPTION A PRACTICE OF CATCHING THE MOMENT BEFORE IT DISAPPEARS.
          </h2>

          <p className="text-xl sm:text-3xl font-medium text-neutral-300 uppercase leading-snug max-w-4xl">
            I WORK ACROSS IMAGE, OBJECT, MOTION, AND SOUND TO TRACE THE SHAPE OF WHAT DOESN’T SIT STILL.
          </p>

          <div className="border-l border-white/30 pl-6 py-2 font-fragment text-sm text-neutral-400 space-y-1 max-w-2xl">
            <p className="text-white font-bold uppercase">It isn’t a portfolio.</p>
            <p className="text-neutral-400">
              It’s the place where the work stays honest. AN ongoing record of what I make when thought moves faster than structure.
            </p>
          </div>

          {/* Cities Listing */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 border-t border-editorial font-fragment text-xs">
            {cities.map((item) => (
              <div key={item.name} className="border border-editorial p-3">
                <span className="text-white font-bold block">{item.name}</span>
                <span className="text-neutral-500 text-[11px]">({item.year})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: INDX // CONCEPTUAL REVISION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-editorial pb-16 font-fragment text-xs">
          <div className="md:col-span-4 space-y-2 uppercase border-r border-editorial pr-6">
            <div className="text-white font-bold tracking-widest text-sm">INDX</div>
            <div className="text-neutral-500">{"// CONCEPTUAL"}</div>
            <div className="text-neutral-400 font-semibold">REVISION — NEUE 7.6</div>
            <div className="text-neutral-500">NOTHING STAYS UNTOUCHED</div>
          </div>

          <div className="md:col-span-8 space-y-6 pl-0 md:pl-4">
            <p className="font-figtree text-xl sm:text-2xl font-bold uppercase text-white leading-snug">
              Pages become places worth lingering in, and issues become experiences people anticipate, keep, and share.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-editorial">
              <div className="space-y-1">
                <div className="text-neutral-500 font-bold uppercase text-[10px]">PERSPECTIVE NOT THE TRUTH</div>
                <div className="text-white font-bold uppercase">CAT — 1.07</div>
                <p className="text-neutral-400 text-xs">
                  I work between order and interruption. Where clean lines argue with impulse. Where rhythm breaks before it resolves.
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-neutral-500 font-bold uppercase text-[10px]">PERSPECTIVE NOT THE TRUTH</div>
                <div className="text-white font-bold uppercase">CAT — 1.08</div>
                <p className="text-neutral-400 text-xs">
                  Vertical is the state I build in— a place for unfinished thoughts, sharpened ideas, and the things that refuse silence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: EXPLORATION PHASE & MODULES */}
        <div className="space-y-10 border-b border-editorial pb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center font-fragment text-xs uppercase tracking-widest text-neutral-500 gap-2">
            <span className="text-white font-bold">EXPLORATION PHASE</span>
            <span>SOURCE — FIELD NOTES</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl sm:text-4xl font-extrabold uppercase">
              # Some pieces settle. Some don’t.
            </h3>
            <p className="font-fragment text-sm text-neutral-400">
              Both reveal something the finished version can’t.
            </p>
          </div>

          {/* Modules A.1 to A.4 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-fragment text-xs">
            {modules.map((m) => (
              <div key={m.code} className="border border-editorial p-5 space-y-2 hover:border-white/40 transition-colors">
                <div className="text-white font-bold tracking-wider">{m.code}</div>
                <p className="text-neutral-400 text-xs leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>

          {/* Featured Visual Image Showcase (Right Below Modules) */}
          <div className="mt-12 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center font-fragment text-xs uppercase text-neutral-400 border-b border-editorial pb-3 gap-2">
              <div className="flex items-center gap-4">
                <span className="text-white font-bold">STUDY — 04.13</span>
                <span>SELECTED WORK</span>
              </div>
              <span className="text-neutral-500">LINES BECOME SIGNALS. SURFACES BECOME STORIES.</span>
            </div>

            <div className="relative aspect-[16/9] w-full border border-editorial overflow-hidden bg-neutral-900">
              <Image
                src="/images/vertical_hero_abstract_1785872413428.png"
                alt="Exploration Phase Featured Artwork"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 font-fragment text-xs text-neutral-300 border border-editorial">
                <p className="text-white font-bold uppercase mb-1">
                  STRUCTURE ARGUES WITH IMPULSE UNTIL BOTH LEARN TO STAND STILL. GRIDS SET THE PACE. MARGINS HOLD THE QUIET.
                </p>
                <div className="flex gap-4 text-neutral-500 text-[10px] uppercase mt-2">
                  <span>ARTIFACT — I</span>
                  <span>ARTIFACT — II</span>
                  <span>ARTIFACT — III</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
