// Кадры кампании: файлы /images/hc-{name}-{width}.{avif,webp}.
// Чтобы подключить исходники 2560/3840, достаточно положить файлы и дописать ширину.
export const MEDIA = {
  hero: { widths: [800, 1280], width: 1280, height: 720 },
  life: { widths: [800, 1280], width: 1280, height: 720 },
  expert: { widths: [800, 864], width: 864, height: 1152 },
};

export function srcSet(name, format) {
  return MEDIA[name].widths.map((w) => `/images/hc-${name}-${w}.${format} ${w}w`).join(", ");
}

export function fallback(name) {
  const { widths } = MEDIA[name];
  return `/images/hc-${name}-${widths[widths.length - 1]}.webp`;
}
