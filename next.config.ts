import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ВАЖНО: статический экспорт вместо SSR
  images: { unoptimized: true }, // Если встречается <Image>, отключаем оптимизацию (на статике её нет)
  // assetPrefix: "./", // главная строка: делаем относительные пути к /_next/*
  trailingSlash: true, // Удобнее для статического хостинга (создаёт .../index.html для каждого роута)
  eslint: { ignoreDuringBuilds: true }, // (опц.) отключить падение по ESLint на билд:
};

export default nextConfig;
