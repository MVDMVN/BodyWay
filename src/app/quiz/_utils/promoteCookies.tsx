// app/quiz/_utils/promoteCookies.tsx
"use client";
import { useEffect } from "react";

function readCookie(name: string) {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

export default function PromoteCookiesToLocalStorage() {
  useEffect(() => {
    try {
      if (!localStorage.getItem("utm_v1")) {
        const v = readCookie("utm_v1");
        if (v) localStorage.setItem("utm_v1", v);
      }
      if (!localStorage.getItem("gender")) {
        const g = readCookie("gender");
        if (g) localStorage.setItem("gender", g);
      }
    } catch {}
  }, []);
  return null;
}
