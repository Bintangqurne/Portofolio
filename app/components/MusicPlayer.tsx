"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

const TRACK = {
  source: "/audio/TULUS%20-%20Teh%20Hijau%20(Official%20Lyric%20Video).mp3",
  title: "Teh Hijau",
  artist: "TULUS · Bintang Qurne's Personal Rotation",
  duration: 211.09551,
};

const waveBars = Array.from({ length: 48 }, (_, index) => ({
  height: 24 + ((index * 37) % 76),
  delay: -((index * 83) % 900),
}));

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return "00:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getAudioDuration(audio: HTMLAudioElement) {
  if (Number.isFinite(audio.duration) && audio.duration > 0) return audio.duration;
  if (audio.seekable.length > 0) {
    const seekableEnd = audio.seekable.end(audio.seekable.length - 1);
    if (Number.isFinite(seekableEnd) && seekableEnd > 0) return seekableEnd;
  }
  return TRACK.duration;
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveBarRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frequencyDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const smoothedBarsRef = useRef(new Float32Array(waveBars.length));
  const visualizerFrameRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(TRACK.duration);
  const [volume, setVolume] = useState(0.65);
  const progress = duration ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    return () => {
      if (visualizerFrameRef.current !== null) {
        cancelAnimationFrame(visualizerFrameRef.current);
      }
      audioSourceRef.current?.disconnect();
      analyserRef.current?.disconnect();
      void audioContextRef.current?.close();
    };
  }, []);

  function setWaveIdle() {
    if (visualizerFrameRef.current !== null) {
      cancelAnimationFrame(visualizerFrameRef.current);
      visualizerFrameRef.current = null;
    }

    waveBarRefs.current.forEach((bar, index) => {
      if (!bar) return;
      const idleHeight = 8 + (waveBars[index].height % 9);
      bar.style.height = `${idleHeight}%`;
      smoothedBarsRef.current[index] = idleHeight / 100;
    });
  }

  async function ensureAudioAnalyser() {
    const audio = audioRef.current;
    if (!audio || typeof window === "undefined") return null;

    if (!audioContextRef.current) {
      const context = new AudioContext();
      const source = context.createMediaElementSource(audio);
      const analyser = context.createAnalyser();

      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.78;
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      audioSourceRef.current = source;
      analyserRef.current = analyser;
      frequencyDataRef.current = new Uint8Array(analyser.frequencyBinCount);
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    return analyserRef.current;
  }

  async function startVisualizer() {
    if (reduceMotion) return;

    const analyser = await ensureAudioAnalyser();
    const frequencyData = frequencyDataRef.current;
    if (!analyser || !frequencyData) return;

    if (visualizerFrameRef.current !== null) {
      cancelAnimationFrame(visualizerFrameRef.current);
    }

    const renderFrequency = () => {
      const audio = audioRef.current;
      if (!audio || audio.paused || audio.ended) {
        setWaveIdle();
        return;
      }

      analyser.getByteFrequencyData(frequencyData);
      const maxBin = Math.min(frequencyData.length - 1, 84);

      waveBarRefs.current.forEach((bar, index) => {
        if (!bar) return;

        const position = index / Math.max(1, waveBars.length - 1);
        const bin = Math.min(
          maxBin,
          Math.max(1, Math.round(Math.pow(position, 1.65) * maxBin))
        );
        const neighbor = Math.min(maxBin, bin + 1);
        const rawLevel = (frequencyData[bin] * 0.72 + frequencyData[neighbor] * 0.28) / 255;
        const level = Math.pow(rawLevel, 0.72);
        const previous = smoothedBarsRef.current[index];
        const smoothing = level > previous ? 0.48 : 0.18;
        const smoothed = previous + (level - previous) * smoothing;

        smoothedBarsRef.current[index] = smoothed;
        bar.style.height = `${Math.max(7, Math.min(100, 7 + smoothed * 93))}%`;
      });

      visualizerFrameRef.current = requestAnimationFrame(renderFrequency);
    };

    visualizerFrameRef.current = requestAnimationFrame(renderFrequency);
  }

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      if (!reduceMotion) await ensureAudioAnalyser();
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  }

  function seek(value: number) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = value;
    setCurrentTime(value);
  }

  return (
    <section
      aria-label="Music player"
      className="music-interlude relative isolate overflow-hidden border-y-2 border-black bg-[#ff2a2a] text-black"
    >
      <audio
        ref={audioRef}
        src={TRACK.source}
        preload="metadata"
        onLoadedMetadata={(event) => {
          setDuration(getAudioDuration(event.currentTarget));
        }}
        onDurationChange={(event) => {
          setDuration(getAudioDuration(event.currentTarget));
        }}
        onCanPlay={(event) => {
          setDuration(getAudioDuration(event.currentTarget));
        }}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime);
          if (!Number.isFinite(event.currentTarget.duration)) {
            setDuration(getAudioDuration(event.currentTarget));
          }
        }}
        onPlay={() => {
          setIsPlaying(true);
          void startVisualizer();
        }}
        onPause={() => {
          setIsPlaying(false);
          setWaveIdle();
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
          setWaveIdle();
        }}
        onError={() => {
          setIsPlaying(false);
          setWaveIdle();
        }}
      />

      <div aria-hidden="true" className="music-grid absolute inset-0 opacity-25" />
      <div
        aria-hidden="true"
        className="absolute -right-[8vw] top-[8%] font-fragment text-[38vw] font-black leading-none tracking-[-0.12em] text-black/[0.045]"
      >
        01
      </div>

      <div className="relative z-10 px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
        <header className="flex items-center justify-between gap-6 border-b-2 border-black pb-4 font-ibm-mono text-[9px] font-semibold uppercase tracking-[0.1em] sm:text-[10px]">
          <div className="flex items-center gap-3">
            <span
              className={`h-3 w-3 border border-black ${isPlaying ? "animate-pulse bg-black" : "bg-transparent"}`}
            />
            Favorite song
          </div>
          <span className="hidden sm:block">Headphones recommended</span>
        </header>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 46 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-12 py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(400px,.85fr)] lg:items-center lg:gap-14 lg:py-12"
        >
          <div className="min-w-0">
            <p className="font-ibm-mono text-[9px] font-semibold uppercase tracking-[0.11em] sm:text-[10px]">
              One favorite sound for the scroll
            </p>
            <h2 className="mt-5 font-fragment text-[clamp(68px,9.8vw,186px)] font-black uppercase leading-[0.69] tracking-[-0.095em]">
              Press
              <br />
              play<span className="text-[#f1f1ef]">.</span>
            </h2>

            <div
              className={`music-wave mt-10 ${isPlaying && !reduceMotion ? "is-playing" : ""}`}
              aria-hidden="true"
            >
              {waveBars.map((bar, index) => (
                <span
                  key={index}
                  ref={(element) => {
                    waveBarRefs.current[index] = element;
                  }}
                  className="music-wave-bar"
                  style={
                    {
                      "--bar-height": `${bar.height}%`,
                      "--bar-delay": `${bar.delay}ms`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>

            <div className="mt-4 flex justify-between border-t border-black/35 pt-3 font-ibm-mono text-[8px] uppercase tracking-[0.09em] sm:text-[9px]">
              <span>Frequency / movement / memory</span>
              <span>{isPlaying ? "Signal active" : "Signal idle"}</span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[620px] min-w-0">
            <div className="relative mx-auto aspect-square w-[min(88vw,520px)] lg:w-[min(40vw,520px)]">
              <motion.div
                initial={reduceMotion ? false : { scale: 0.82, rotate: -14, opacity: 0 }}
                whileInView={reduceMotion ? undefined : { scale: 1, rotate: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div
                  className={`music-vinyl relative h-full w-full ${isPlaying && !reduceMotion ? "is-playing" : ""}`}
                >
                  <div
                    className="vinyl-label"
                    role="img"
                    aria-label="Teh Hijau by TULUS artwork"
                  />
                </div>
              </motion.div>

              <button
                type="button"
                onClick={togglePlayback}
                className="absolute inset-0 z-10 cursor-pointer rounded-full focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#f1f1ef]"
                aria-label={isPlaying ? "Pause music" : "Play music"}
              />
            </div>

            <div className="relative z-20 -mt-4 border-2 border-black bg-[#f1f1ef] p-4 shadow-[7px_7px_0_#000] sm:p-5">
              <div className="flex items-end justify-between gap-5">
                <div className="min-w-0">
                  <p className="truncate text-xl font-black uppercase leading-none tracking-[-0.045em] sm:text-3xl">
                    {TRACK.title}
                  </p>
                  <p className="mt-2 truncate font-ibm-mono text-[8px] uppercase tracking-[0.07em] text-black/55 sm:text-[9px]">
                    {`${isPlaying ? "Now playing" : "Local audio · Ready"} · ${TRACK.artist}`}
                  </p>
                </div>
                <span className="shrink-0 font-ibm-mono text-[9px] tabular-nums text-black/60 sm:text-[10px]">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <label className="mt-5 block">
                <span className="sr-only">Track position</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.01}
                  value={Math.min(currentTime, duration || 0)}
                  onChange={(event) => seek(Number(event.target.value))}
                  disabled={!duration}
                  className="music-range music-timeline w-full"
                  style={{ "--music-progress": `${progress}%` } as CSSProperties}
                  aria-label="Track position"
                />
              </label>

              <div className="mt-4 flex items-center justify-between gap-5 border-t border-black/20 pt-3">
                <span className="font-ibm-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-black/55 sm:text-[9px]">
                  Vol. {String(Math.round(volume * 100)).padStart(2, "0")}
                </span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                  className="music-range music-volume w-28 sm:w-40"
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <footer className="flex items-center justify-between gap-5 border-t-2 border-black pt-4 font-ibm-mono text-[8px] uppercase tracking-[0.1em] sm:text-[9px]">
          <span>One song · One personal rotation</span>
          <span>Local playback / Full track</span>
        </footer>
      </div>

      <style jsx global>{`
        .music-grid {
          background-image: linear-gradient(rgba(0,0,0,.16) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,0,0,.16) 1px,transparent 1px);
          background-size: 42px 42px;
        }
        .music-wave {
          height: 94px;
          display: flex;
          align-items: center;
          gap: clamp(2px,.35vw,6px);
          overflow: hidden;
        }
        .music-wave-bar {
          width: 100%;
          height: var(--bar-height);
          min-width: 2px;
          background: #000;
          transform-origin: center;
          transition: height 240ms cubic-bezier(.22,1,.36,1);
          will-change: height;
        }
        .music-wave.is-playing .music-wave-bar {
          transition-duration: 55ms;
          transition-timing-function: linear;
        }
        .music-vinyl {
          overflow: hidden;
          border: 2px solid rgba(255,255,255,.09);
          border-radius: 50%;
          background:
            radial-gradient(circle at center,transparent 0 18%,rgba(255,255,255,.055) 18.2% 18.5%,transparent 18.8% 27%),
            repeating-radial-gradient(circle at center,#070707 0 1px,#1d1d1d 2px,#080808 3px,#151515 4px);
          box-shadow:
            0 28px 55px rgba(0,0,0,.36),
            inset 0 0 45px rgba(255,255,255,.04);
          will-change: transform;
        }
        .music-vinyl::before {
          content: "";
          position: absolute;
          inset: 2.5%;
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 50%;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,.035),
            0 0 0 12px rgba(0,0,0,.08),
            0 0 0 13px rgba(255,255,255,.025),
            0 0 0 26px rgba(0,0,0,.08),
            0 0 0 27px rgba(255,255,255,.025),
            0 0 0 40px rgba(0,0,0,.08),
            0 0 0 41px rgba(255,255,255,.025);
          pointer-events: none;
        }
        .music-vinyl::after {
          content: "";
          position: absolute;
          inset: -12%;
          border-radius: 50%;
          background: conic-gradient(
            from 208deg,
            transparent 0 9%,
            rgba(255,255,255,.16) 12%,
            rgba(255,255,255,.035) 18%,
            transparent 25% 53%,
            rgba(255,255,255,.1) 60%,
            transparent 69% 100%
          );
          mix-blend-mode: screen;
          pointer-events: none;
        }
        .vinyl-label {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 2;
          display: flex;
          width: 35%;
          aspect-ratio: 1;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 2px solid #000;
          border-radius: 50%;
          background-image:
            linear-gradient(120deg,rgba(255,255,255,.18),transparent 38%),
            url("/audio/tehHijau.webp");
          background-position: center;
          background-size: cover;
          color: #000;
          text-align: center;
          transform: translate(-50%,-50%);
          box-shadow: inset 0 0 0 3px rgba(255,255,255,.18),0 0 0 2px rgba(255,42,42,.3);
        }
        .music-vinyl.is-playing {
          animation: music-vinyl-spin 6.6s linear infinite;
        }
        @keyframes music-vinyl-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .music-range {
          height: 16px;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        .music-range::-webkit-slider-runnable-track { height: 4px; background: #000; }
        .music-timeline::-webkit-slider-runnable-track {
          background: linear-gradient(to right,#ff2a2a 0 var(--music-progress),rgba(0,0,0,.22) var(--music-progress) 100%);
        }
        .music-range::-webkit-slider-thumb {
          width: 16px;
          height: 16px;
          margin-top: -6px;
          appearance: none;
          border: 2px solid #000;
          border-radius: 0;
          background: #ff2a2a;
        }
        .music-range::-moz-range-track { height: 4px; background: rgba(0,0,0,.24); }
        .music-range::-moz-range-progress { height: 4px; background: #ff2a2a; }
        .music-range::-moz-range-thumb { width: 14px; height: 14px; border: 2px solid #000; border-radius: 0; background: #ff2a2a; }
        .music-volume::-webkit-slider-thumb { background: #000; }
        .music-volume::-moz-range-thumb { background: #000; }
        .music-range:disabled { cursor: not-allowed; opacity: .42; }
        @media (prefers-reduced-motion: reduce) {
          .music-wave-bar,.music-vinyl { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
