import { fallback, MEDIA, srcSet } from "../media.js";

export function Picture({ name, alt, sizes = "100vw", className, priority = false }) {
  const { width, height } = MEDIA[name];
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(name, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(name, "webp")} sizes={sizes} />
      <img
        className={className}
        src={fallback(name)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
}
