"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MarsIWAPIPlayer() {
  const pathname = usePathname();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function toggleAudio() {
    const audio = audioRef.current;

    if (!audio || isLoading) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      setIsLoading(true);
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Mars IWAPI gagal diputar:", error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }

  // Tampilkan hanya di landing page utama.
  // Tidak tampil di admin, registrasi, atau explore.
  if (pathname !== "/") return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/Mars%20IWAPI.mp3"
        loop
        preload="none"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onEnded={() => setIsPlaying(false)}
      />

      <button
        type="button"
        className={`mars-floating-button ${
          isPlaying ? "is-playing" : "is-muted"
        }`}
        onClick={toggleAudio}
        aria-label={
          isPlaying ? "Matikan Mars IWAPI" : "Putar Mars IWAPI"
        }
        aria-pressed={isPlaying}
        title={isPlaying ? "Matikan Mars IWAPI" : "Putar Mars IWAPI"}
        disabled={isLoading}
      >
        <span className="mars-floating-icon">
          {isPlaying ? (
            <Volume2 size={23} strokeWidth={2.5} />
          ) : (
            <VolumeX size={23} strokeWidth={2.5} />
          )}
        </span>
      </button>
    </>
  );
}