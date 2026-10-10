import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Parallax } from "./motion/Parallax";

const widthClasses = {
  wide: "max-w-6xl",
  cta: "max-w-4xl",
} as const;

type EventBackdropSectionProps = {
  id: string;
  imageSrc: string;
  children: ReactNode;
  width?: keyof typeof widthClasses;
  className?: string;
};

/** Narrative section with an actual event photo that shifts only through transforms on scroll. */
export function EventBackdropSection({
  id,
  imageSrc,
  children,
  width = "wide",
  className = "",
}: EventBackdropSectionProps) {
  return (
    <section id={id} className="relative isolate overflow-hidden">
      <Parallax className="absolute inset-0 -z-10">
        <div
          className="depth-zoom absolute -inset-8"
          style={{ "--dz": "0.1" } as CSSProperties}
        >
          <Image
            src={imageSrc}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Parallax>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-crema/95 via-crema/84 to-crema/58"
      />
      <div
        className={`mx-auto ${widthClasses[width]} px-5 py-14 md:py-20 ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
