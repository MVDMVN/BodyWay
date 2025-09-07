// app/quiz/intro/male/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IntroMale() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem("gender", "female");
      } catch {}
      document.cookie = `gender=male; Path=/; Max-Age=31536000; SameSite=Lax`;
      router.replace("/quiz/step-age-range");
    }, 80); // микро-пауза даёт шанс диску записать куку/LS даже во фрейме
    return () => clearTimeout(t);
  }, [router]);

  return null;
}
