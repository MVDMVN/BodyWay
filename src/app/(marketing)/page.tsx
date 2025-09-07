"use client";

import Link from "next/link";
import s from "./marketing.module.css";

function setCookie(name: string, value: string, days = 365) {
  try {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
  } catch {}
}

function setGenderAndGo(gender: "male" | "female", to: string) {
  try {
    localStorage.setItem("gender", gender);
  } catch {}
  setCookie("gender", gender);

  // Навигацию делаем сами, чтобы onClick точно отработал до перехода
  // Небольшая задержка — чтобы успел записаться cookie в «сложных» окружениях
  setTimeout(() => {
    window.location.assign(to);
  }, 0);
}

export default function Page() {
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
          <div className={s.boyElement}></div>
          <div className={s.girlElement}></div>

          <div className={s.contentBlock}>
            <div className={s.contentWrapper}>
              <h1>
                A new scientific weight loss method developed by experts at the Institute of Health - 100% guaranteed
                results! Based on the principles of a healthy lifestyle and behavior change.
              </h1>
              <p className={s.contentDescription}>
                Take our Quiz to get a personal meal plan and workout program to achieve your weight goals!
              </p>
              <p className={s.contentGender}>Select your gender</p>

              <div className={s.quizButtonsWrapper}>
                <Link
                  href={{ pathname: "/quiz/step-age-range", hash: "g=male" }}
                  prefetch={false}
                  className={s.contentMaleButton}>
                  Male
                </Link>

                <Link
                  href={{ pathname: "/quiz/step-age-range", hash: "g=female" }}
                  prefetch={false}
                  className={s.contentFemaleButton}>
                  Female
                </Link>
              </div>
            </div>

            <div className={s.mobileGuysBlock}>
              <img loading='lazy' src='/images/mobile-guys.svg' alt='' />
            </div>
            <div className={s.tabletGuysBlock}>
              <img loading='lazy' width='308' height='340' src='/images/tablet-guys.svg' alt='' />
            </div>
          </div>
        </section>

        <footer className={s.footer}>
          <p className={s.footerText}>
            *Cleveland Clinic Bariatric & Metabolic Institute Evidence-Based: Clinical Research DiRECT (Lancet, 2025) -
            Total Diet Replacement (TDR)
          </p>
        </footer>
      </main>
    </>
  );
}
