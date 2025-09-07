"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import s from "./intro.module.css";

/* ---------- UTM utils ---------- */

// какие ключи сохраняем
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_creative",
  "utm_placement",
  "campaign_id",
  "adset_id",
  "ad_id",
  "adset_name",
  "buyer",
  "target",
  "creo",
  "idpxl",
  "source",
  "account_id",
  "token",
] as const;

type UTMKey = (typeof UTM_KEYS)[number];
type UTMMap = Partial<Record<UTMKey, string>>;

// запасной парсер на случай странных строк
function parseQueryFallback(raw: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!raw) return out;
  const q = raw.startsWith("?") ? raw.slice(1) : raw;
  for (const pair of q.split("&")) {
    if (!pair) continue;
    const [k, v = ""] = pair.split("=");
    const key = decodeURIComponent(k || "").trim();
    const val = decodeURIComponent(v || "").trim();
    if (key) out[key] = val;
  }
  return out;
}

function readUTM(): UTMMap {
  try {
    const sp = new URLSearchParams(window.location.search);
    const got: Record<string, string> = {};
    // Пробуем нормальный путь
    sp.forEach((v, k) => {
      got[k] = v;
    });
    // Если пусто или внезапно что-то не прочлось — fallback
    if (Object.keys(got).length === 0 && window.location.search) {
      Object.assign(got, parseQueryFallback(window.location.search));
    }

    const picked: UTMMap = {};
    for (const k of UTM_KEYS) {
      const v = got[k];
      if (typeof v === "string" && v.length) picked[k] = v;
    }
    return picked;
  } catch {
    // крайний случай
    return parseQueryFallback(window.location.search) as UTMMap;
  }
}

function setCookie(name: string, value: string, days = 365) {
  try {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    // делаем cookie видимой для всего домена/подпапок
    const domain = location.hostname.includes(".") ? `; domain=.${location.hostname}` : "";
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${d.toUTCString()}; path=/${domain}; SameSite=Lax`;
  } catch {}
}

function persistUTMOnce() {
  try {
    const key = "utm:v1";
    const existing = localStorage.getItem(key);
    if (existing) return; // уже сохранено — не перетираем

    const utm = readUTM();
    if (Object.keys(utm).length === 0) return;

    // сохраняем JSON-ом
    localStorage.setItem(key, JSON.stringify(utm));

    // и дублируем в cookie (коротким строковым видом)
    setCookie("utm", JSON.stringify(utm));
  } catch {
    /* ignore */
  }
}

/* ---------- Page ---------- */

export default function IntroPage() {
  // сохраняем UTM при первом показе страницы
  useEffect(() => {
    persistUTMOnce();
  }, []);

  return (
    <>
      <header className={s.header}>
        <div className={s.headerRow}>
          <div className={s.logo}>
            <img src='/images/logo.png' alt='BodyWay' />
          </div>
        </div>
      </header>

      <main>
        <section className={s.sectionHeader}>
          <div className={s.boyElement} />
          <div className={s.girlElement} />

          <div className={s.contentBlock}>
            <div className={s.contentWrapper}>
              <h1>
                A new scientific weight loss method developed by experts at the Institute of Health — 100% guaranteed
                results! Based on the principles of a healthy lifestyle and behavior change.
              </h1>

              <p className={s.contentDescription}>
                Take our Quiz to get a personal meal plan and workout program to achieve your weight goals!
              </p>

              <p className={s.contentGender}>Select your gender</p>

              <div className={s.quizButtonsWrapper}>
                {/* дальше у вас свои страницы /quiz/intro/male и /quiz/intro/female,
                    они сохраняют gender и делают router.push на первый шаг */}
                <Link href='/quiz/intro/male' className={s.contentMaleButton} prefetch={false}>
                  Male
                </Link>
                <Link href='/quiz/intro/female' className={s.contentFemaleButton} prefetch={false}>
                  Female
                </Link>
              </div>
            </div>

            <div className={s.mobileGuysBlock}>
              <img loading='lazy' src='/images/mobile-guys.svg' alt='' />
            </div>

            <div className={s.tabletGuysBlock}>
              <img loading='lazy' width={308} height={340} src='/images/tablet-guys.svg' alt='' />
            </div>
          </div>
        </section>

        <footer className={s.footer}>
          <p className={s.footerText}>
            *Cleveland Clinic Bariatric & Metabolic Institute Evidence-Based: Clinical Research DiRECT (Lancet, 2025) —
            Total Diet Replacement (TDR)
          </p>
        </footer>
      </main>
    </>
  );
}
