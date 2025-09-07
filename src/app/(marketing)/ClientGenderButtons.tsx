"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  href: string;
  maleText: string;
  femaleText: string;
  classMale?: string;
  classFemale?: string;
  styleMale?: React.CSSProperties;
  styleFemale?: React.CSSProperties;
  onClickMale?: () => void;
  onClickFemale?: () => void;
};

export default function ClientGenderButtons({
  href,
  maleText,
  femaleText,
  classMale,
  classFemale,
  styleMale,
  styleFemale,
  onClickMale,
  onClickFemale,
}: Props) {
  const router = useRouter();

  function persistGender(gender: "male" | "female") {
    try {
      localStorage.setItem("gender", gender);
    } catch {}
    try {
      sessionStorage.setItem("gender", gender);
    } catch {}
    try {
      document.cookie = `gender=${gender}; path=/; max-age=31536000; samesite=lax`;
    } catch {}
  }

  function buildNextUrl(gender: "male" | "female") {
    // добавим ?g=... как запасной канал
    const url = new URL(href, typeof window !== "undefined" ? window.location.href : "http://localhost");
    if (!url.searchParams.has("g")) url.searchParams.set("g", gender);
    return url.pathname + url.search + url.hash;
  }

  const handleMaleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    onClickMale?.();
    persistGender("male");
    // дать браузеру тик, чтобы всё точно записалось
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    router.push(buildNextUrl("male"));
  };

  const handleFemaleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    onClickFemale?.();
    persistGender("female");
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    router.push(buildNextUrl("female"));
  };

  return (
    <>
      <a href={href} className={classMale} style={styleMale} onClick={handleMaleClick}>
        {maleText}
      </a>
      <a href={href} className={classFemale} style={styleFemale} onClick={handleFemaleClick}>
        {femaleText}
      </a>
    </>
  );
}
