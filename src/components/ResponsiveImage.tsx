import { forwardRef, type ImgHTMLAttributes } from "react";
import imageManifest from "../data/responsive-images.json";

type Source = { width: number; src: string };
type OptimizedImage = { width: number; height: number; formats: { avif: Source[]; webp: Source[] } };
const images = imageManifest as Record<string, OptimizedImage>;

type Props = ImgHTMLAttributes<HTMLImageElement> & { sizes?: string };

function srcSet(sources: Source[]) {
  return sources.map(({ src, width }) => `${src} ${width}w`).join(", ");
}

export const ResponsiveImage = forwardRef<HTMLImageElement, Props>(
  function ResponsiveImage({ src = "", alt = "", sizes = "100vw", ...imageProps }, ref) {
  const optimized = images[src];
  if (!optimized) return <img src={src} alt={alt} {...imageProps} ref={ref} />;

  return <picture className="responsive-picture" style={{ display: "contents" }}>
    <source type="image/avif" srcSet={srcSet(optimized.formats.avif)} sizes={sizes} />
    <source type="image/webp" srcSet={srcSet(optimized.formats.webp)} sizes={sizes} />
    <img src={src} alt={alt} width={optimized.width} height={optimized.height} sizes={sizes} {...imageProps} ref={ref} />
  </picture>;
  },
);
