export const forKeitaro = false;

// BASE_PATH активен только если forKeitaro === true
export const BASE_PATH_IMAGES = forKeitaro ? "/lander/bodyway/app" : "";

// Хелпер для картинок/ассетов
export function withBase(src: string) {
  if (!src) return src;

  // если это абсолютный URL или уже _next — не трогаем
  if (/^(https?:)?\/\//.test(src) || src.startsWith("/_next")) return src;

  // если путь начинается с "/" — префиксуем
  if (src.startsWith("/")) return `${BASE_PATH_IMAGES}${src}`;

  return src;
}
