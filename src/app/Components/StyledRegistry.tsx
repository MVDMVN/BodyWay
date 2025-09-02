"use client";
import React from "react";
export default function StyledRegistry({ children }: { children: React.ReactNode }) {
  // При включённом `compiler.styledComponents` отдельный ServerStyleSheet не обязателен.
  // Этот обёрткой мы даём единое место под будущие провайдеры.
  return <>{children}</>;
}
