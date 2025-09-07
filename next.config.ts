import type { NextConfig } from "next";

const forKeitaro = false;
const prefix = forKeitaro ? "/lander/bodyway/app" : "";

const nextConfig: NextConfig = {
  output: "export", // ВАЖНО: статический экспорт вместо SSR
  images: { unoptimized: true }, // Если встречается <Image>, отключаем оптимизацию (на статике её нет)
  trailingSlash: true, // Удобнее для статического хостинга (создаёт .../index.html для каждого роута)
  eslint: { ignoreDuringBuilds: true }, // (опц.) отключить падение по ESLint на билд:
  basePath: prefix || undefined,
};

export default nextConfig;
