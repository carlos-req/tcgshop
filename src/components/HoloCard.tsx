"use client";

import Image from "next/image";
import { useRef } from "react";

interface HoloCardProps {
  image: string;
  alt: string;
}

const MAX_TILT_DEG = 10;

export function HoloCard({ image, alt }: HoloCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    card.style.setProperty("--tilt-x", `${(px - 0.5) * MAX_TILT_DEG * 2}deg`);
    card.style.setProperty("--tilt-y", `${(0.5 - py) * MAX_TILT_DEG * 2}deg`);
    card.style.setProperty("--sheen-x", `${px * 100}%`);
    card.style.setProperty("--sheen-y", `${py * 100}%`);
  }

  function handlePointerLeave() {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--sheen-x", "50%");
    card.style.setProperty("--sheen-y", "50%");
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="foil-tilt relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-xl border border-outline-variant shadow-2xl"
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 80vw, 384px"
      />
      <div className="holo-sheen pointer-events-none absolute inset-0" />
    </div>
  );
}
