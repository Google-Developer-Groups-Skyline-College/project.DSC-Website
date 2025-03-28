import React, { useRef, useEffect } from "react";
import { lerp } from "@/app/utils/scrollUtils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  scrollY: number;
}

export interface ParallaxImageRef {
  update: (scroll: number) => void;
  updateBounds: () => void;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ src, alt, scrollY }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const boundsRef = useRef<{ top: number; bottom: number } | null>(null);
  const currentTranslateYRef = useRef(0);
  const targetTranslateYRef = useRef(0);

  const updateBounds = () => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      boundsRef.current = {
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
      };
    }
  };

  const update = (scroll: number) => {
    if (!boundsRef.current || !imgRef.current) return;

    const relativeScroll = -scroll - boundsRef.current.top;
    targetTranslateYRef.current = relativeScroll * 0.2;
    currentTranslateYRef.current = lerp(
      currentTranslateYRef.current,
      targetTranslateYRef.current,
      0.1
    );

    if (
      Math.abs(currentTranslateYRef.current - targetTranslateYRef.current) >
      0.01
    ) {
      imgRef.current.style.transform = `translateY(${currentTranslateYRef.current}px) scale(1.5)`;
    }
  };

  useEffect(() => {
    updateBounds();
    update(scrollY);
  }, [scrollY]);

  useEffect(() => {
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  return <img ref={imgRef} src={src} alt={alt} className="parallax-img" />;
};

export default ParallaxImage;
