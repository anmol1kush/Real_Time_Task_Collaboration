import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

const CarouselContext = React.createContext(null);

export function Carousel({ children, className, opts }) {
  const [carouselRef, api] = useEmblaCarousel(opts);

  return (
    <CarouselContext.Provider value={{ carouselRef, api }}>
      <div ref={carouselRef} className={cn("overflow-hidden", className)}>
        <div className="flex">{children}</div>
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselItem({ className, ...props }) {
  return (
    <div className={cn("min-w-0 shrink-0 grow-0 basis-full", className)} {...props} />
  );
}